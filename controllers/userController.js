export const promoteToManager = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: "User Not Found" });

        if (user.role === "manager")
            return res.status(400).json({ message: "User is already a manager" });

        user.role = "manager";
        await user.save();

        res.json({
            message: "User promoted Successfully", user
        });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}