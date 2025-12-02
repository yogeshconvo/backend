import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";
import { promoteToManager } from "../controllers/userController.js";

const router = express.Router();

router.put("/promote/:id", protect, allowRoles("ceo"), promoteToManager);
export default router;