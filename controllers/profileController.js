import User from "../models/User.js";
import Attendance from "../models/Attendance.js";
import Task from "../models/Task.js";

export const getMyProfile = async (req, res) => {
    try {
        const id = req.user.id;
        const user = await User.findById(id).select("-password");
        const attendance = await Attendance.find({ user: id }).sort({ date: -1 });
        const tasks = await Task.find({ assignedTo: id }).sort({ createdAt: -1 });
        res.json({ user, attendance, tasks });
        res.json({
            user,
            attendance,
            tasks
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export const updateMyProfile = async (req, res) => {
    try {
        const id = req.user.id;
        const { name, email } = req.body;
        const user = await User.findByIdAndUpdate(
            userId,
            {
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                address: req.body.address,
                designation: req.body.designation,
                salary: req.body.salary
            },
            { new: true }
        ).select("-password");
        res.json({ message: "Profile updated", user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}
export const updateProfileImage = async (req, res) => {
    try {
        const userId = req.user.id;
        const updated = await User.findByIdAndUpdate(
            userId,
            { profileImage: req.body.profileImage },
            { new: true }
        ).select("-password");
        res.json({ message: "Profile image updated", user: updated });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export const adminUpdateUserProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await User.findByIdAndUpdate(
            id,
            {
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                address: req.body.address,
                designation: req.body.designation,
                salary: req.body.salary,
            },
            { new: true }
        ).select("-password");
        res.json({ message: "User profile updated", user: updated });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export const getUserProfile = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId).select("-password");
        const attendance = await Attendance.find({ user: userId }).sort({ date: -1 });
        const tasks = await Task.find({ assignedTo: userId }).sort({ createdAt: -1 });
        res.json({ user, attendance, tasks });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }   
}
