import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";
import { addEmployee, getallEmployees } from "../controllers/employeeController.js";

const router = express.Router();

router.get("/dashboard", protect, allowRoles("employee"), (req, res) => {
    res.json({ message: "CEO Dashboard Data" });

});

router.post("/add", protect, allowRoles("ceo"), addEmployee);
router.post("/all", protect, allowRoles("ceo", "manager"), getallEmployees);

export default router;