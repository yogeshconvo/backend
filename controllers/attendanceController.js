import Attendance from "../models/Attendance.js";


export const markAttendance = async (req, res) => {
    try {
        const userId = req.user.id;
        const { status } = req.body;

        const today = new Date().toISOString().split("T")[0];
        const exists = await Attendance.findOne({ user: userId, date: today });
        if (exists) {
            return res.status(400).json({ message: "Attendance already marked" })
        }
        const attendance = await Attendance.create({
            user: userId,
            date: today,
            status
        });
        res.status(201).json({
            message: "Attendance marked successfully", attendance
        })
    } catch (error) {
        res.status(500).json({ message: err.message });
    }
};

export const getAllAttendance = async (req, res) => {
    try {
        const attendance = await Attendance.find().populate("user", "name email role");
        res.status(200).json({
            message: "Attendance fetched successfully", attendance
        });

    } catch (error) {
        res.status(500).json({ message: err.message });
    }
};