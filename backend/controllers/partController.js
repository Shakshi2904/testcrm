// controllers/partController.js
const partService = require("../services/partService");

exports.getCities = async (req, res) => {
    try {
        const cities = await partService.fetchCities();
        
        // Check if cities are returned as an array
        if (!Array.isArray(cities)) {
            return res.status(400).json({ error: "Cities data is not in an array format." });
        }
        
        res.json(cities);
    } catch (err) {
        console.error("Error fetching cities:", err);
        res.status(500).json({ error: "Server error" });
    }
};

exports.getAddresses = async (req, res) => {
    const { city } = req.params;
    try {
        const addresses = await partService.fetchAddresses(city);
        res.json(addresses);
    } catch (err) {
        console.error("Error fetching addresses:", err);
        res.status(500).json({ error: "Server error" });
    }
};

exports.getMachinesWithParts = async (req, res) => {
    const { addressId } = req.params;
    try {
        const machines = await partService.fetchMachinesWithParts(addressId);
        res.json(machines);
    } catch (err) {
        console.error("Error fetching machines with parts:", err);
        res.status(500).json({ error: "Server error" });
    }
};
