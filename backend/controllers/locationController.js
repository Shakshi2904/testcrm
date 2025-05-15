// controllers/locationController.js
const locationService = require("../services/locationService");

exports.getMachines = async (req, res) => {
    try {
        const machines = await locationService.getMachinesWithDetails();
        res.json(machines);
    } catch (err) {
        console.error("Error fetching machines:", err.message);
        res.status(500).json({ error: "Server Error" });
    }
};
