// models/complaintModel.js
const pool = require("../db");

exports.getAllIssues = () => pool.query("SELECT id, issue_description, role_id FROM issues");

exports.getAllLocations = () => pool.query("SELECT id, location_name FROM locations");

exports.getAddressByLocationId = (id) =>
  pool.query("SELECT id, address FROM locations WHERE id = $1", [id]);

exports.getMachinesByAddressId = (id) =>
  pool.query("SELECT id FROM machines WHERE location_id = $1", [id]);

exports.validateClient = (id) =>
  pool.query("SELECT id FROM users WHERE id = $1 AND role_id = 1", [id]);

exports.getIssueRole = (id) =>
  pool.query("SELECT role_id FROM issues WHERE id = $1", [id]);

exports.getAssignedUser = (machineId, roleId) => {
  const column = roleId === 2 ? "technician_id" : "refiller_id";
  return pool.query(`SELECT ${column} as assigned_to FROM machines WHERE id = $1`, [machineId]);
};

exports.insertComplaint = (clientId, machineId, issueId, assignedTo, assignedDate, dueDate) => {
  return pool.query(
    `INSERT INTO complaints (reported_by, machine_id, issue_id, assigned_to, assigned_date, due_date, status) 
     VALUES ($1, $2, $3, $4, $5, $6, 'pending') RETURNING id`,
    [clientId, machineId, issueId, assignedTo, assignedDate, dueDate]
  );
};
