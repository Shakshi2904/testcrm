const express = require("express");
const router = express.Router();
const controller = require("../controllers/technicianComplaintController");

router.get("/cities", controller.getCities);
router.get("/addresses/:city", controller.getAddresses);
router.get("/client_machines/:address_id", controller.getMachines);
router.get("/technician_complaint_issues", controller.getTechnicianIssues);
router.post("/technician_submit_complaint", controller.submitComplaint);

module.exports = router;
