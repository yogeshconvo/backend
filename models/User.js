import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        // BASIC INFO
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },

        // ROLE SYSTEM
        role: {
            type: String,
            enum: ["ceo", "manager", "employee"],
            default: "employee"
        },

        // PROFILE DETAILS
        phone: { type: String, default: "" },
        address: { type: String, default: "" },
        profileImage: { type: String, default: "" },

        // JOB DETAILS
        designation: { type: String, default: "" },
        salary: { type: Number, default: 0 },

        // DOCUMENTS (PDF, salary slip, etc.)
        salarySlip: { type: String, default: "" },

        // ATTENDANCE HISTORY
        attendance: [
            {
                date: { type: String },
                status: { type: String } // present / absent
            }
        ],

        // MANAGER FEATURES
        workload: { type: Number, default: 0 },
        performanceNotes: { type: String, default: "" },

        // Manager → employee relationship
        team: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
    },
    { timestamps: true }
);

export default mongoose.model("User", userSchema);
