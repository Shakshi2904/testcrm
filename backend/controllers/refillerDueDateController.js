const refillerDueDateService = require("../services/refillerDueDateService");

exports.getRefillerPendingComplaints = async (req, res) => {
    try {
        const tasks = await refillerDueDateService.fetchPendingRefillerComplaints();
        res.json(tasks);
    } catch (err) {
        console.error("Controller Error:", err.message);
        res.status(500).send("Server Error");
    }
};
