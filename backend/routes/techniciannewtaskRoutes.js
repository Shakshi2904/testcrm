const express = require("express");
const router = express.Router();
const controller = require("../controllers/technicianNewTaskController");

router.get("/technician_new_tasks/:id", controller.getTechnicianNewTasks);
router.put("/technician_new_tasks/:id/duedateassign", controller.assignDueDateToTask);

module.exports = router;
