import express from "express";
import controller from "./controller.js";

const router = express.Router();

/**
 * Routes
 */
router.post("/", controller.addBorrower);
router.get("/all", controller.getAllBorrowers);
router.delete("/:id", controller.deleteBorrower);
router.patch("/:id", controller.updateBororowerDetails);

export default router;
