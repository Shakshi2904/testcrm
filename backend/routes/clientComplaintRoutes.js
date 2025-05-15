const express = require("express");
const router = express.Router();
const {
  getComplaintIssues,
  getClientAddresses,
  getClientLocations,
  getClientMachines,
  submitClientComplaint,
} = require("../controllers/clientComplaintController");

router.get("/client_complaint_issues", getComplaintIssues);
router.get("/client_addresses/:location_id", getClientAddresses);
router.get("/client_locations", getClientLocations);
router.get("/client_machines/:address_id", getClientMachines);
router.post("/client_submit_complaint", submitClientComplaint);

module.exports = router;
