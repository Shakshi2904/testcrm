const express = require("express");
const router = express.Router();
const controller = require("../controllers/technicianPendingTaskController");

router.get("/technician_pending_tasks/:id", controller.getTechnicianPendingTasks);
router.patch("/technician_update_task_status/:complaintId", controller.updateTechnicianTaskStatus);

module.exports = router;
