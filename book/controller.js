import { getSingleConnection } from "../index.js";

const addBook = async (req, res, next) => {
  try {
    const { title, author, isbn, quantity, shelf } = req.body;
    const sql = `INSERT INTO Book (Title, Author, ISBN, Quantity, Shelf)
    VALUES (? ,?, ?, ?,?)`;
    const connection = await getSingleConnection();
    connection.query(
      sql,
      [title, author, isbn, quantity, shelf],
      (err, results) => {
        if (err) {
          console.error("Error executing SQL query:", err);
          res.status(500).json({
            error: "Internal server error, Error while inserting a new book",
          });
        } else {
          console.log("ressss ", results);
          res.status(200).json({
            results,
          });
          next();
        }
      }
    );
  } catch (err) {
    next(err);
  }
};

const getAllBooks = async (req, res, next) => {
  try {
    const sql = `SELECT * FROM Book`;
    const connection = await getSingleConnection();
    connection.query(sql, (err, results) => {
      if (err) {
        console.error("Error executing SQL query:", err);
        res.status(500).json({
          error: "Internal server error, Error while getting all books",
        });
      } else {
        console.log("ressss ", results);
        res.json(results);
        // req.data = {...req.data, results};
        next(results);
      }
    });
  } catch (err) {
    next(err);
  }
};

const deleteBook = async (req, res, next) => {
  try {
    const regex = /^[0-9]+$/;
    const { id } = req.params;
    if (regex.test(id)) {
      const sql = `DELETE * FROM Book where BookId = ${req.params.id}`;
      const connection = await getSingleConnection();
      connection.query(sql, (err, results) => {
        if (err) {
          res.status(500).json({
            error: "Internal server error, Error while deleting a book",
          });
          next();
        } else {
          res.json(results);
          next();
        }
      });
    } else {
      res
        .status(400)
        .json({ error: "Bad Request, Error Validating the inputs" });
      next();
    }
  } catch (err) {
    next(err);
  }
};

const updateBookDetails = async (req, res, next) => {
  try {
    console.log("reddd ", req.params, req.body);
    const { id } = req.params;
    const book = req.body;
    const sql = `UPDATE Book SET ? WHERE BookId = ?`;
    const connection = await getSingleConnection();
    connection.query(sql, [book, id], (err, results) => {
      if (err) {
        console.error("Error executing SQL query:", err);
        res.status(500).json({
          error: "Internal server error, Error while updating the details",
        });
      } else {
        res.json(results);
        next();
      }
    });
  } catch (err) {
    next(err);
  }
};

const searchBooks = async (req, res, next) => {
  try {
    const connection = await getSingleConnection();
    const { query } = req.query;
    console.log("ddddddddd ", req.query);
    const sql = `
      SELECT * FROM Book
      WHERE Title LIKE ? OR Author LIKE ? OR ISBN LIKE ?
    `;
    const params = [`%${query}%`, `%${query}%`, `%${query}%`];

    connection.query(sql, params, (err, results) => {
      if (err) {
        console.error("Error executing SQL query:", err);
        res.status(500).json({ error: "Internal server error" });
      } else {
        res.json(results);
      }
    });
  } catch (err) {}
};
export default {
  addBook,
  getAllBooks,
  deleteBook,
  updateBookDetails,
  searchBooks,
};
