// routes/adminComplaintRoutes.js
const express = require("express");
const router = express.Router();
const controller = require("../controllers/admincomplaintController");

router.get("/client_complaint_issues", controller.getIssues);
router.get("/client_locations", controller.getLocations);
router.get("/client_addresses/:location_id", controller.getAddressByLocationId);
router.get("/client_machines/:address_id", controller.getMachinesByAddress);
router.post("/admin_submit_complaint", controller.submitComplaint);

module.exports = router;
