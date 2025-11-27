import mongoose from "mongoose";
const taskSchema = new mongoose.Schema(
    {
        title: { type: String, require: true },
        description: { type: String },
        assignedTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        assignBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            require: true
        },
        status: {
            type: String,
            enum: ["pending", "in-progress", "completed"],
            default: "pending"
        },
        deadline: { type: String }
    },

    { timestamps: true }
);
export default mongoose.model("Task", taskSchema);