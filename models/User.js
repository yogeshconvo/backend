import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },

        role: {
            type: String,
            enum: ["ceo", "manager", "employee"],
            default: "employee"
        },

        // PROFILE FIELDS
        phone: { type: String, default: "" },
        address: { type: String, default: "" },
        profileImage: { type: String, default: "" },
        designation: { type: String, default: "" },
        salary: { type: Number, default: 0 },

        // DOCUMENTS (Salary Slip, PDFs)
        salarySlip: { type: String },

        // ATTENDANCE
        attendance: [
            {
                date: String,
                status: String
            }
        ],

        // WORK related information
        workload: { type: Number, default: 0 },
        performanceNotes: { type: String },

        // Manager -> employees team
        team: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
    },
    { timestamps: true }
);

export default mongoose.model("User", userSchema);
