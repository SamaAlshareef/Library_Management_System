import { getSingleConnection } from "../index.js";

const addBorrower = async (req, res, next) => {
  try {
    const { name, email, date } = req.body;
    const sql = `INSERT INTO Borrower (Name, Email, RegisteredDate)
    VALUES (? ,?, ?)`;
    const connection = await getSingleConnection();
    connection.query(sql, [name, email, date], (err, results) => {
      if (err) {
        console.error("Error executing SQL query:", err);
        res.status(500).json({
          error: "Internal server error, Error while inserting a new borrower",
        });
      } else {
        console.log("ressss ", results);
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

const getAllBorrowers = async (req, res, next) => {
  try {
    const sql = `SELECT * FROM Borrower`;
    const connection = await getSingleConnection();
    connection.query(sql, (err, results) => {
      if (err) {
        console.error("Error executing SQL query:", err);
        res.status(500).json({ error: "Internal server error" });
      } else {
        console.log("ressss ", results);
        res.json(results);
        next(results);
      }
    });
  } catch (err) {
    next(err);
  }
};

const deleteBorrower = async (req, res, next) => {
  try {
    const regex = /^[0-9]+$/;
    const { id } = req.params;
    if (regex.test(id)) {
      const sql = `DELETE * FROM Borrower where BorrowerId = ${req.params.id}`;
      const connection = await getSingleConnection();
      connection.query(sql, (err, results) => {
        if (err) {
          console.error("Error executing SQL query:", err);
          res.status(500).json({ error: "Internal server error" });
        } else {
          res.json(results);
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

const updateBororowerDetails = async (req, res, next) => {
  try {
    console.log("reddd ", req.params, req.body);
    const { id } = req.params;
    const { body } = req;
    const sql = `UPDATE Borrower SET ? WHERE BorrowerId = ?`;
    const connection = await getSingleConnection();
    connection.query(sql, [body, id], (err, results) => {
      if (err) {
        console.error("Error executing SQL query:", err);
        res.status(500).json({ error: "Internal server error" });
      } else {
        res.json(results);
        next();
      }
    });
  } catch (err) {
    next(err);
  }
};

export default {
  getAllBorrowers,
  addBorrower,
  deleteBorrower,
  updateBororowerDetails,
};
