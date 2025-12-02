import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";
import {
    createConversation,
    getConversations,
    sendMessage,
    getMessages,
    markAsRead,
    deleteMessage
} from "../controllers/messageController.js";
const router = express.Router();

router.post("/conversation", protect, createConversation);
router.get("/conversations", protect, getConversations);
router.post("/message", protect, sendMessage);
router.get("/messages/:conversationId", protect, getMessages);
router.put("/message/read/:messageId", protect, markAsRead);
router.delete("/message/:messageId", protect, deleteMessage);
export default router;