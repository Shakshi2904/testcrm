// controllers/complaintController.js
const service = require("../services/admincomplaintService");

exports.getIssues = async (req, res) => {
  try {
    const result = await service.fetchIssues();
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch issues" });
  }
};

exports.getLocations = async (req, res) => {
  try {
    const result = await service.fetchLocations();
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch locations" });
  }
};

exports.getAddressByLocationId = async (req, res) => {
  try {
    const result = await service.fetchAddressesByLocation(req.params.location_id);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch address" });
  }
};

exports.getMachinesByAddress = async (req, res) => {
  try {
    const result = await service.fetchMachinesByAddress(req.params.address_id);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch machines" });
  }
};

exports.submitComplaint = async (req, res) => {
  const { client_id, machine_id, issue_id } = req.body;

  if (!client_id || !machine_id || !issue_id) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const client = await service.checkValidClient(client_id);
    if (client.rows.length === 0) return res.status(403).json({ error: "Unauthorized client ID" });

    const issue = await service.getRoleByIssue(issue_id);
    if (issue.rows.length === 0) return res.status(404).json({ error: "Issue not found" });

    const role_id = issue.rows[0].role_id;

    const assigned = await service.findAssignedUser(machine_id, role_id);
    if (assigned.rows.length === 0 || !assigned.rows[0].assigned_to) {
      return res.status(404).json({ error: "No assigned technician/refiller" });
    }

    const assigned_date = new Date();
    const due_date = new Date();
    due_date.setHours(assigned_date.getHours() + 48);

    const insertResult = await service.createComplaint(
      client_id, machine_id, issue_id,
      assigned.rows[0].assigned_to,
      assigned_date, due_date
    );

    res.json({ message: "Complaint submitted", complaintId: insertResult.rows[0].id });
  } catch (err) {
    console.error("Submit Error:", err.stack);
    res.status(500).json({ error: "Failed to submit complaint" });
  }
};
