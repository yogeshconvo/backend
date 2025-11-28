import express from "express";
import { protect } from "../middleware/authMiddleware";
import { allowRoles } from "../middleware/roleMiddleware";
import { promoteToManager } from "../controllers/userController";

const router = express.Router();

router.put("/promote/:id", protect, allowRoles("ceo"), promoteToManager);
export default router;