const service = require("../services/technicianPendingTaskService");

exports.getTechnicianPendingTasks = async (req, res) => {
    try {
        const technicianId = req.params.id;
        const tasks = await service.getPendingTasks(technicianId);
        res.json(tasks);
    } catch (err) {
        console.error("Error fetching technician complaints:", err.message);
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};

exports.updateTechnicianTaskStatus = async (req, res) => {
    try {
        const { complaintId } = req.params;

        const updatedComplaint = await service.completeTask(complaintId);

        if (!updatedComplaint) {
            return res.status(404).json({ message: "Complaint not found or not assigned" });
        }

        res.json({
            message: "Task marked as completed",
            updatedComplaint,
        });
    } catch (err) {
        console.error("Error updating task status:", err.message);
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};
