const pool = require("../db");

const getPendingComplaintsByRefillerId = async (refillerId) => {
    const result = await pool.query(
        `SELECT c.id AS complaint_id, 
                c.machine_id,
                i.issue_description, 
                c.status,
                c.assigned_date,
                c.due_date,
                u.name AS refiller_name, 
                u.email
         FROM complaints c
         JOIN users u ON c.assigned_to = u.id
         JOIN issues i ON c.issue_id = i.id
         WHERE c.assigned_to = $1 
           AND c.status = 'pending' 
           AND c.due_date IS NULL
           AND i.role_id = 3`,
        [refillerId]
    );
    return result.rows;
};

const assignDueDateToComplaint = async (complaintId, due_date) => {
    const result = await pool.query(
        `UPDATE complaints 
         SET due_date = $1 
         WHERE id = $2 
         RETURNING due_date`,
        [due_date, complaintId]
    );
    return result.rows[0].due_date;
};

module.exports = {
    getPendingComplaintsByRefillerId,
    assignDueDateToComplaint
};
