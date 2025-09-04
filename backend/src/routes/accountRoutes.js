import express from "express";
import {
  addAccount,
  getAccounts,
  deleteAccount,
} from "../controllers/accountController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect); // protect all routes

router.post("/", addAccount);
router.get("/", getAccounts);
router.delete("/:id", deleteAccount);

export default router;
