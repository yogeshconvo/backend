import User from "../models/User";
import Attendance from "../models/Attendance";
import Task from "../models/Task";

export const getMyProfile = async (req, res) => {
    try {
        const id = req.user.id;
        const user = await User.findById(id).select("-password");
    } catch (error) {

    }
}