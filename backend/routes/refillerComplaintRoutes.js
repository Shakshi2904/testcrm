const express = require("express");
const router = express.Router();
const refillerComplaintController = require("../controllers/refillerComplaintController");

router.get("/refiller_complaint_issues", refillerComplaintController.getTechnicianIssues);
router.post("/refiller_submit_complaint", refillerComplaintController.submitComplaint);

module.exports = router;
