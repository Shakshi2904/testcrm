const { fetchAllComplaints } = require("../services/admincomplaintService");

const getAllComplaints = async (req, res) => {
    try {
        const complaints = await fetchAllComplaints();
        res.json(complaints);
    } catch (err) {
        console.error("Error fetching complaints:", err.message);
        res.status(500).json({ error: "Server Error" });
    }
};

module.exports = { getAllComplaints };
