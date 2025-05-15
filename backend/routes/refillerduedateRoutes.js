const express = require("express");
const router = express.Router();
const refillerDueDateController = require("../controllers/refillerDueDateController");

router.get("/refiller_tasks", refillerDueDateController.getRefillerPendingComplaints);

module.exports = router;
