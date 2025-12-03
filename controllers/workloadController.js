import User from "../models/User.js";


export const updateWorkload = async (req, res) => {
    try {
        const { id } = req.params;
        const { workload } = req.body;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.workload = workload;
        await user.save();
        res.status(200).json({ message: "Workload updated successfully", workload: user.workload });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
export const getWorkload = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ workload: user.workload });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const getWorkloadAndPerformance = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).select("name email role workload performanceNotes");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        } res.json({
            message: "Data fetched",
            user
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const addPerformanceNote = async (req, res) => {
    try {
        const { id } = req.params;
        const { note } = req.body;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.performanceNotes.push({ note, date: new Date() });
        await user.save();
        res.status(200).json({ message: "Performance note added", performanceNotes: user.performanceNotes });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
export const updatePerformanceNotes = async (req, res) => {
    try {
        const { id } = req.params;
        const { performanceNotes } = req.body;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.performanceNotes = performanceNotes;
        await user.save();
        res.status(200).json({ message: "Performance notes updated", performanceNotes: user.performanceNotes });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};