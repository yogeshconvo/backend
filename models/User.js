import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
    {
        name: { type: String, require: true },
        email: { type: String, require: true, unique: true },
        password: { type: String, require: true },
        role: {
            type: String,
            enum: ["ceo", "manager", "employee"],
            default: "employee"
        },
        salarySlip: { type: String },
        attendance: [
            {
                date: String,
                status: String
            }

        ],
        workload: { type: Number, default: 0 },
        performanceNotes: { type: String },
        team: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
    },
    { timestamps: true }
);
export default mongoose.model("User", userSchema);