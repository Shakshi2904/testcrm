const service = require("../services/refillerPendingTaskService");

exports.getPendingTasks = async (req, res) => {
    const { refiller_id } = req.params;

    if (!refiller_id) {
        return res.status(400).json({ error: "Refiller ID is required" });
    }

    try {
        const tasks = await service.fetchPendingTasks(refiller_id);
        res.json(tasks);
    } catch (err) {
        console.error("Error fetching tasks:", err.message);
        res.status(500).json({ error: "Server Error" });
    }
};

exports.updateTaskStatus = async (req, res) => {
    const { complaintId } = req.params;

    try {
        const updatedComplaint = await service.completeTask(complaintId);

        if (!updatedComplaint) {
            return res.status(404).json({ message: "Complaint not found" });
        }

        res.json({ message: "Task marked as completed", updatedComplaint });
    } catch (err) {
        console.error("Error updating task status:", err.message);
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};
