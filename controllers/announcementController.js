import Announcement from "../models/Announcement.js"
export const createAnnouncement = async (req, res) => {
    try {
        const { title, message } = req.body;
        const data = await Announcement.create({
            title,
            message,
            createdBy: req.user.id
        });

        res.status(201).json({
            message: "Announcement created successfully",
            announcement: data
        })
    } catch (error) {

    }
}

export const getAnnouncements = async (req, res) => {
    try {
        const list = await Announcement.find().populate("createdBy", "name role").sort({ createdAt: -1 });

        res.status(200).json({
            message: "Announcements fetched",
            announcements: list
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteAnnouncement = async (req, res) => {
    try {
        await Announcement.findByIdAndDelete(req.params.id);
        res.json({
            message: "Announcement deleted"
        })
    } catch (error) {
        res.status(500).json({ message: error.message })

    }
};