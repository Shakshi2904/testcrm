const express = require("express");
const refillerTaskController = require("../controllers/refillerTaskController");

const router = express.Router();

router.get("/refiller_new_tasks/:id", refillerTaskController.getPendingComplaints);
router.put("/refiller_new_tasks/:id/duedateassign", refillerTaskController.assignDueDate);

module.exports = router;
