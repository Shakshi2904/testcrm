const  pool  = require("../db");

exports.getTechnicianIssues = async () => {
  const query = "SELECT id, issue_description FROM issues WHERE role_id = 2 ORDER BY issue_description ASC";
  const result = await pool.query(query);
  return result.rows;
};

exports.getMachineById = async (machine_id) => {
  const result = await pool.query("SELECT technician_id FROM machines WHERE id = $1", [machine_id]);
  return result.rows[0];
};

exports.insertComplaint = async (reported_by, machine_id, issue_id, assigned_to, assigned_date, due_date) => {
  const query = `
    INSERT INTO complaints (reported_by, machine_id, issue_id, assigned_to, assigned_date, due_date, status)
    VALUES ($1, $2, $3, $4, $5, $6, 'pending')
    RETURNING id
  `;
  const result = await pool.query(query, [reported_by, machine_id, issue_id, assigned_to, assigned_date, due_date]);
  return result.rows[0];
};
