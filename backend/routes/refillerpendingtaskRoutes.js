const express = require("express");
const router = express.Router();
const controller = require("../controllers/refillerPendingTaskController");

// GET /refiller_pending_tasks/:refiller_id
router.get("/refiller_pending_tasks/:refiller_id", controller.getPendingTasks);

// PATCH /refiller_update_task_status/:complaintId
router.patch("/refiller_update_task_status/:complaintId", controller.updateTaskStatus);

module.exports = router;
