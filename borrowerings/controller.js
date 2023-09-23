import { getSingleConnection } from "../index.js";

const checkBook = async (req, res, next) => {
  try {
    const regex = /^[0-9]+$/;
    const { borrowerId, bookId } = req.body;
    if (regex.test(borrowerId) && regex.test(bookId)) {
      const sql = `INSERT INTO Borrowering (BorrowerId, BookId, Checked)
        VALUES (? ,?, ?)`;
      const connection = await getSingleConnection();
      connection.query(sql, [borrowerId, bookId, true], (err, results) => {
        if (err) {
          console.error("Error executing SQL query:", err);
          res.status(500).json({
            error: "Internal server error, Error while checking a book",
          });
        } else {
          res.status(200).json({
            results,
          });
          next();
        }
      });
    } else {
      res.status(400).json({ error: "Error while validating the inputs" });
    }
  } catch (err) {
    next(err);
  }
};

const getBorrowerCurrentBooks = async (req, res, next) => {
  try {
    const regex = /^[0-9]+$/;
    const { id } = req.query;
    if (regex.test(id)) {
      const sql = `SELECT * FROM Borrowering WHERE BorrowerId = ? AND ReturnDate IS NULL`;
      const connection = await getSingleConnection();
      connection.query(sql, [id], (err, results) => {
        if (err) {
          console.error("Error executing SQL query:", err);
          res.status(500).json({
            error:
              "Internal server error, Error while getting all user's books",
          });
        } else {
          res.status(200).json({
            results,
          });
          next();
        }
      });
    } else {
      res.status(400).json({ error: "Error while validating the inputs" });
    }
  } catch (err) {
    next(err);
  }
};

const getOverDueBooks = async (req, res, next) => {
  try {
    const sql = `SELECT * FROM Borrowering WHERE DueDate < CURDATE() AND ReturnData IS NULL`;
    const connection = await getSingleConnection();
    connection.query(sql, (err, results) => {
      if (err) {
        console.error("Error executing SQL query:", err);
        res.status(500).json({
          error: "Internal server error, Error while getting all overdue books",
        });
      } else {
        res.status(200).json({
          results,
        });
        next();
      }
    });
  } catch (err) {
    next(err);
  }
};

const returnBook = async (req, res, next) => {
  try {
    const regex = /^[0-9]+$/;
    const { borrowerId, bookId } = req.params;
    if (regex.test(borrowerId) && regex.test(bookId)) {
      const sql = `UPDATE Borrowering SET ReturnDate = CURRENT_DATE() WHERE BorrowerId = ? AND BookId = ?`;
      const connection = await getSingleConnection();
      connection.query(sql, [borrowerId, bookId], (err, results) => {
        if (err) {
          console.error("Error executing SQL query:", err);
          res.status(500).json({
            error: "Internal server error, Error while updating return data",
          });
        } else {
          res.status(200).json({
            results,
          });
          next();
        }
      });
    } else {
      res.status(400).json({ error: "Error while validating the inputs" });
    }
  } catch (err) {
    next(err);
  }
};

export default {
  checkBook,
  getBorrowerCurrentBooks,
  getOverDueBooks,
  returnBook,
};
