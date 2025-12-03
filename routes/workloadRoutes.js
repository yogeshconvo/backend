import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";

import {
    updateWorkload,
    updatePerformanceNotes,
    getWorkloadAndPerformance
} from "../controllers/workloadController.js";

const router = express.Router();

router.put("/update-workload/:id", protect, allowRoles("manager"), updateWorkload);
router.put("/update-notes/:id", protect, allowRoles("manager"), updatePerformanceNotes);
router.get("/:id", protect, allowRoles("ceo", "manager", "employee"), getWorkloadAndPerformance);

export default router;
