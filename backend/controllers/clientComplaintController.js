const service = require("../services/clientComplaintService");

exports.getComplaintIssues = async (req, res) => {
  try {
    const issues = await service.fetchComplaintIssues();
    res.json(issues);
  } catch (err) {
    console.error("Error fetching issues:", err.stack);
    res.status(500).json({ error: "Server Error" });
  }
};

exports.getClientAddresses = async (req, res) => {
  try {
    const { location_id } = req.params;
    const addresses = await service.fetchClientAddresses(location_id);
    res.json(addresses);
  } catch (err) {
    console.error("Error fetching addresses:", err.stack);
    res.status(500).json({ error: "Server Error" });
  }
};

exports.getClientLocations = async (req, res) => {
  try {
    const locations = await service.fetchClientLocations();
    res.json(locations);
  } catch (err) {
    console.error("Error fetching locations:", err.stack);
    res.status(500).json({ error: "Server Error" });
  }
};

exports.getClientMachines = async (req, res) => {
  try {
    const { address_id } = req.params;
    const machines = await service.fetchClientMachines(address_id);
    res.json(machines);
  } catch (err) {
    console.error("Error fetching machines:", err.stack);
    res.status(500).json({ error: "Server Error" });
  }
};

exports.submitClientComplaint = async (req, res) => {
  try {
    const result = await service.submitComplaint(req.body);
    res.json(result);
  } catch (err) {
    console.error("Error submitting complaint:", err.stack);
    res.status(500).json({ error: "Server Error" });
  }
};
