const refillerTaskService = require("../services/refillerTaskService");

exports.getPendingComplaints = async (req, res) => {
    const refillerId = parseInt(req.params.id);

    try {
        const complaints = await refillerTaskService.getPendingComplaints(refillerId);
        res.json(complaints);
    } catch (err) {
        console.error("Error fetching refiller complaints:", err.message);
        res.status(500).json({ error: "Server Error" });
    }
};

exports.assignDueDate = async (req, res) => {
    const complaintId = parseInt(req.params.id);
    const { due_date } = req.body;

    if (!due_date) {
        return res.status(400).json({ error: "Due date is required" });
    }

    try {
        const updatedDueDate = await refillerTaskService.assignDueDate(complaintId, due_date);
        res.json({ message: "Due date assigned successfully", due_date: updatedDueDate });
    } catch (err) {
        console.error("Error updating due date:", err.message);
        res.status(500).json({ error: "Server Error" });
    }
};
