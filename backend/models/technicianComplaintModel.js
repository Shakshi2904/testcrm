const pool = require("../db");

exports.getCities = async () => {
    const query = "SELECT DISTINCT city FROM locations ORDER BY city ASC";
    return await pool.query(query);
};

exports.getAddressesByCity = async (city) => {
    const query = "SELECT DISTINCT address FROM locations WHERE city = $1 ORDER BY address ASC";
    return await pool.query(query, [city]);
};

exports.getMachinesByAddress = async (addressId) => {
    const query = "SELECT id FROM machines WHERE location_id = $1";
    return await pool.query(query, [addressId]);
};

exports.getTechnicianIssues = async () => {
    const query = "SELECT id, issue_description FROM issues WHERE role_id = 3";
    return await pool.query(query);
};

exports.validateTechnician = async (technicianId) => {
    const query = "SELECT id FROM users WHERE id = $1 AND role_id = 2";
    return await pool.query(query, [technicianId]);
};

exports.getRefillerForMachine = async (machineId) => {
    const query = "SELECT refiller_id FROM machines WHERE id = $1";
    return await pool.query(query, [machineId]);
};

exports.submitComplaint = async ({ technicianId, machineId, issueId, assignedTo, assignedDate, dueDate }) => {
    const query = `
        INSERT INTO complaints (reported_by, machine_id, issue_id, assigned_to, assigned_date, due_date, status)
        VALUES ($1, $2, $3, $4, $5, $6, 'pending') RETURNING id
    `;
    return await pool.query(query, [technicianId, machineId, issueId, assignedTo, assignedDate, dueDate]);
};
