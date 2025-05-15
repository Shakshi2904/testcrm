const pool = require("../db");

exports.getPendingTasksByRefillerId = async (refillerId) => {
    const query = `
        SELECT 
            c.id AS complaint_id, 
            c.machine_id, 
            i.issue_description, 
            c.assigned_date, 
            c.due_date 
        FROM complaints c
        JOIN issues i ON c.issue_id = i.id
        WHERE c.assigned_to = $1 
          AND c.status = 'pending'
          AND i.role_id = 3
    `;
    return pool.query(query, [refillerId]);
};

exports.updateTaskStatusToCompleted = async (complaintId) => {
    const updateQuery = `
        UPDATE complaints 
        SET status = 'completed', actual_completion_date = NOW() 
        WHERE id = $1 RETURNING *
    `;
    return pool.query(updateQuery, [complaintId]);
};

exports.findComplaintById = async (complaintId) => {
    return pool.query(`SELECT * FROM complaints WHERE id = $1`, [complaintId]);
};
