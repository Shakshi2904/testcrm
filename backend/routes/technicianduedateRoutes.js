const express = require("express");
const router = express.Router();
const controller = require("../controllers/technicianDueDateController");

router.get("/technician_tasks", controller.getTechnicianTasks);

module.exports = router;
