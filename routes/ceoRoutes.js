import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/dashboard", protect, allowRoles("ceo"), (req, res) => {
    res.json({ message: "CEO Dashboard Data" });

});
router.get("/stats", protect, allowRoles("ceo"), async (req, res) => {
    try {
        const employees = await User.countDocuments({ role: "employee" });
        const managers = await User.countDocuments({ role: "manager" });
        const tasks = await Task.countDocuments();

        const today = new Date().toISOString().split("T")[0];
        const attendanceToday = await Attendance.countDocuments({ date: today });

        res.json({ employees, managers, tasks, attendanceToday });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;