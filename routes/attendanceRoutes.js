import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";

import {
    markAttendance,
    getAllAttendance
} from "../controllers/attendanceController.js";
const router = express.Router();
router.post("/mark", protect, allowRoles("employee"), markAttendance); router.get("/all", protect, allowRoles("ceo", "manager"), getAllAttendance);
export default router;