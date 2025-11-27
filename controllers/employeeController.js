import User from "../models/User.js";

export const addEmployee = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        // check if exist
        const exists = await User.findOne({ email });
        if (exists) return res.status(400).json({ message: "already exists" });

        //hashed 
        const hashed = await bcrypt.hash(password, 10);

        // create Employee
        const user = await User.create({
            name,
            email,
            password: hashed,
            role,
            createdBy: req.user.id
        });
        res.status(201).json({
            message: "Employee Created SuccessFully", user
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getallEmployees = async (req, res) => {
    try {
        const user = await User.find({ role: "employee" }).select("-password");

        res.status(200).json({
            message: "Employee fetched successfully",
            employees: users
        });
    } catch (error) {
        res.status(500).json({ message: error.message })

    }
};