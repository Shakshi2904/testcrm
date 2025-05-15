const service = require("../services/technicianComplaintService");

exports.getCities = async (req, res) => {
    try {
        const cities = await service.fetchCities();
        res.json(cities);
    } catch (err) {
        console.error("Error fetching cities:", err.message);
        res.status(500).json({ error: "Server Error" });
    }
};

exports.getAddresses = async (req, res) => {
    const { city } = req.params;
    if (!city) return res.status(400).json({ error: "City is required" });

    try {
        const addresses = await service.fetchAddresses(city);
        res.json(addresses);
    } catch (err) {
        console.error("Error fetching addresses:", err.message);
        res.status(500).json({ error: "Server Error" });
    }
};

exports.getMachines = async (req, res) => {
    try {
        const { address_id } = req.params;
        const machines = await service.fetchMachines(address_id);
        res.json(machines);
    } catch (err) {
        console.error("Error fetching machines:", err.message);
        res.status(500).json({ error: "Server Error" });
    }
};

exports.getTechnicianIssues = async (req, res) => {
    try {
        const issues = await service.fetchTechnicianIssues();
        res.json(issues);
    } catch (err) {
        console.error("Error fetching technician issues:", err.message);
        res.status(500).json({ error: "Server Error" });
    }
};

exports.submitComplaint = async (req, res) => {
    const { technician_id, machine_id, issue_id } = req.body;
    if (!technician_id || !machine_id || !issue_id) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        const result = await service.submitComplaint(technician_id, machine_id, issue_id);
        res.json({ message: "Complaint submitted successfully!", complaintId: result.id });
    } catch (err) {
        console.error("Error submitting complaint:", err.message);
        res.status(500).json({ error: err.message });
    }
};
