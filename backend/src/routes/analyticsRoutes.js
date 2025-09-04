import express from "express";
import { addAnalytics, getAnalytics } from "../controllers/analyticsController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.post("/", addAnalytics);   // add new analytics entry
router.get("/", getAnalytics);    // fetch analytics for logged-in user

export default router;
