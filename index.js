import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js"
import managerRoutes from "./routes/managerRoutes.js";
import ceoRoutes from "./routes/ceoRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import employeeManageRoutes from "./routes/employeeRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import announcementRoute from "./routes/announcementRoutes.js";
import userRoutes from "./routes/userRoutes.js";
dotenv.config();

const app = express();
connectDB();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/employees", employeeManageRoutes);
app.use("/api/manager", managerRoutes);
app.use("/api/ceo", ceoRoutes)
app.use("/api/attendance", attendanceRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/announcement", announcementRoute);

// Test route
app.get("/", (req, res) => {
    res.send("Office Manager Backend Running...");
});

// Server Start
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
