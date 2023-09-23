import express from "express";
import controller from "./controller.js";

const router = express.Router();

/**
 * Routes
 */
// const success = (message, userMessage) => (req, res) => {

//   res.status(200).json({
//     message,
//     userMessage: userMessage || message,
//     data: req.data,
//   });
// };

router.post("/", controller.addBook);
router.get("/all", controller.getAllBooks);
router.get("/search", controller.searchBooks);
router.delete("/:id", controller.deleteBook);
router.patch("/:id", controller.updateBookDetails);

export default router;
