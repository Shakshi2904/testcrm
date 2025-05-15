const service = require("../services/technicianNewTaskService");

exports.getTechnicianNewTasks = async (req, res) => {
    try {
        const technicianId = parseInt(req.params.id);
        const tasks = await service.fetchNewTasks(technicianId);
        res.json(tasks);
    } catch (err) {
        console.error("Error fetching technician complaints:", err.message);
        res.status(500).json({ error: "Server Error" });
    }
};

exports.assignDueDateToTask = async (req, res) => {
    try {
        const complaintId = parseInt(req.params.id);
        const { due_date } = req.body;

        if (!due_date) {
            return res.status(400).json({ error: "Due date is required" });
        }

        const result = await service.updateDueDate(complaintId, due_date);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Complaint not found" });
        }

        res.json({
            message: "Due date assigned successfully",
            due_date: result.rows[0].due_date,
        });
    } catch (err) {
        console.error("Error updating due date:", err.message);
        res.status(500).json({ error: "Server Error" });
    }
};
