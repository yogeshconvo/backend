import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/dashboard", protect, allowRoles("ceo"), (req, res) => {
    res.json({ message: "CEO Dashboard Data" });

});
export default router;