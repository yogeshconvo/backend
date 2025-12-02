import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";
import User from "../models/User.js";

export const createConversation = async (req, res) => {
    try {
        const { participants } = req.body;
        if (!participants || !Array.isArray(participants) || participants.length < 2) {
            return res.status(400).json({ message: "At least two participants are required to create a conversation." });
        }
        if (participants.length === 2) {
            const conv = await Conversation.findOne({
                participants: { $all: participants, $size: 2 }
            }).populate("participants", "name email profileImage");

            if (conv) return res.status(200).json({ conversation: conv });
        }

        const conversation = await Conversation.create({ participants });
        const populated = await Conversation.findById(conversation._id).populate("participants", "name email profileImage");
        res.status(201).json({ conversation: populated });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get conversations for logged-in user
export const getConversations = async (req, res) => {
    try {
        const userId = req.user.id;

        const convs = await Conversation.find({
            participants: userId
        })
            .sort({ updatedAt: -1 })
            .populate("participants", "name email profileImage")
            .populate({ path: "lastMessage", populate: { path: "sender", select: "name" } });

        res.json({ conversations: convs });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const sendMessage = async (req, res) => {
    try {
        const { conversationId, content } = req.body;
        const senderId = req.user.id;
        const conv = await Conversation.findById(conversationId);
        if (!conv || !conv.participants.includes(senderId)) {
            return res.status(403).json({ message: "You are not a participant of this conversation." });
        }
        const message = await Message.create({
            conversation: conversationId,
            sender: senderId,
            text: text || "",
            attachments: req.body.attachments || []
        });
        conv.lastMessage = message._id;
        await conv.save();
        const populatedMessage = await Message.findById(message._id).populate("sender", "name email profileImage");
        res.status(201).json({ message: populatedMessage });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getMessages = async (req, res) => {
    try {
        const { conversationId } = req.params;
        const userId = req.user.id;

        const conv = await Conversation.findById(conversationId);
        if (!conv) return res.status(404).json({ message: "Conversation not found" });

        // ensure access
        if (!conv.participants.map(String).includes(String(userId))) {
            return res.status(403).json({ message: "Not a participant" });
        }

        // optional pagination
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 50;
        const skip = (page - 1) * limit;

        const messages = await Message.find({ conversation: conversationId })
            .sort({ createdAt: 1 })
            .skip(skip)
            .limit(limit)
            .populate("sender", "name email profileImage");

        res.json({ messages });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const markAsRead = async (req, res) => {
    try {
        const userId = req.user.id;
        const { conversationId } = req.params;

        // add userId into readBy array for all messages of that conversation
        await Message.updateMany(
            { conversation: conversationId, readBy: { $ne: userId } },
            { $push: { readBy: userId } }
        );

        res.json({ message: "Marked as read" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const deleteMessage = async (req, res) => {
    try {
        const userId = req.user.id;
        const { messageId } = req.params;
        const message = await Message.findById(messageId);
        if (!message) return res.status(404).json({ message: "Message not found" });
        if (message.sender.toString() !== userId) {
            return res.status(403).json({ message: "You can only delete your own messages" });
        }
        await message.remove();
        res.json({ message: "Message deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};