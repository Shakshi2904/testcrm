const refillerComplaintService = require("../services/refillerComplaintService");

exports.getTechnicianIssues = async (req, res) => {
  try {
    const issues = await refillerComplaintService.fetchTechnicianIssues();
    res.json(issues);
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ error: "Failed to fetch issues" });
  }
};

exports.submitComplaint = async (req, res) => {
  const { refiller_id, machine_id, issue_id } = req.body;
  if (!refiller_id || !machine_id || !issue_id) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const complaint = await refillerComplaintService.createComplaint(refiller_id, machine_id, issue_id);
    res.json({ message: "Complaint submitted successfully!", complaintId: complaint.id });
  } catch (err) {
    console.error("Error submitting complaint:", err.message);
    res.status(500).json({ error: "Server Error" });
  }
};
