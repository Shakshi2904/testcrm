const dashboardService = require("../services/dashboardService");

exports.getDashboardData = async (req, res) => {
    try {
        const { role, userId } = req.user; // Extracting user info from the JWT token
        const result = await dashboardService.getDashboardData(userId, role);
        res.json(result);
    } catch (err) {
        console.error("Error fetching dashboard data:", err.stack);
        res.status(500).json({ error: "Server Error" });
    }
};
