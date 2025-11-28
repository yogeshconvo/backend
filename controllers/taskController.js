export const createTask = async (req, res) => {
    try {
        const { title, description, assignedTo, deadline } = req.body;

        const task = await Task.create({
            title,
            description,
            assignedTo,
            assignedBy: req.user.id,
            deadline
        });

        res.status(201).json({
            message: "Task created successfully", task
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getMyTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ assignedTo: req.user.id });
        res.status(200).json({ tasks });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}