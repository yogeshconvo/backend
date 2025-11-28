import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";

import {
    createAnnouncement,
    getAnnouncements, deleteAnnouncement
} from "../controllers/announcementController.js";
const router = express.Router();

router.post("/create", protect, createAnnouncement);
router.get("/all", protect, getAnnouncements);
router.delete("/delete/:id", protect, allowRoles("ceo"), deleteAnnouncement);
export default router;