const service = require("../services/technicianDueDateService");

exports.getTechnicianTasks = async (req, res) => {
    try {
        const tasks = await service.fetchPendingTasks();
        res.json(tasks);
    } catch (err) {
        console.error("Error fetching technician complaints:", err.message);
        res.status(500).json({ error: "Server Error" });
    }
};
