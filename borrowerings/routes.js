import express from "express";
import controller from "./controller.js";

const router = express.Router();

/**
 * Routes
 */

router.post("/check", controller.checkBook);
router.patch("/return-book/:borrowerId&:bookId", controller.returnBook);
router.get("/current-borrower-books", controller.getBorrowerCurrentBooks);
router.get("/due-books", controller.getOverDueBooks);

export default router;
