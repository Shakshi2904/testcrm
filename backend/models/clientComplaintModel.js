const pool = require("../db");

exports.getComplaintIssues = async () => {
  const result = await pool.query("SELECT id, issue_description, role_id FROM issues");
  return result.rows;
};

exports.getClientAddresses = async (location_id) => {
  const result = await pool.query(
    "SELECT id, address FROM locations WHERE id = $1",
    [location_id]
  );
  return result.rows;
};

exports.getClientLocations = async () => {
  const result = await pool.query("SELECT id, location_name FROM locations");
  return result.rows;
};

exports.getClientMachines = async (address_id) => {
  const result = await pool.query(
    "SELECT id FROM machines WHERE location_id = $1",
    [address_id]
  );
  return result.rows;
};

exports.checkValidClient = async (client_id) => {
  const result = await pool.query(
    "SELECT id FROM users WHERE id = $1 AND role_id = 4",
    [client_id]
  );
  return result.rows.length > 0;
};

exports.getIssueRole = async (issue_id) => {
  const result = await pool.query(
    "SELECT role_id FROM issues WHERE id = $1",
    [issue_id]
  );
  return result.rows[0];
};

exports.getAssignedUser = async (machine_id, assignedColumn) => {
  const result = await pool.query(
    `SELECT ${assignedColumn} AS assigned_to FROM machines WHERE id = $1`,
    [machine_id]
  );
  return result.rows[0];
};

exports.insertComplaint = async ({ client_id, machine_id, issue_id, assigned_to, assigned_date, due_date }) => {
  const result = await pool.query(
    `INSERT INTO complaints (reported_by, machine_id, issue_id, assigned_to, assigned_date, due_date, status) 
     VALUES ($1, $2, $3, $4, $5, $6, 'pending') RETURNING id`,
    [client_id, machine_id, issue_id, assigned_to, assigned_date, due_date]
  );
  return result.rows[0].id;
};
