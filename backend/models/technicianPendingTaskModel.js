const pool = require("../db");

exports.getPendingTasksForTechnician = async (technicianId) => {
    const query = `
        SELECT c.id AS complaint_id, 
               c.machine_id,
               i.issue_description, 
               c.status, 
               TO_CHAR(c.assigned_date, 'YYYY-MM-DD') AS assigned_date, 
               TO_CHAR(c.due_date, 'YYYY-MM-DD') AS due_date, 
               u.name AS technician_name
        FROM complaints c
        JOIN users u ON c.assigned_to = u.id
        JOIN issues i ON c.issue_id = i.id
        WHERE c.assigned_to = $1 
          AND c.status = 'pending'
    `;
    return await pool.query(query, [technicianId]);
};

exports.updateTaskStatusToCompleted = async (complaintId) => {
    const updateQuery = `
        UPDATE complaints 
        SET status = 'completed', actual_completion_date = NOW() 
        WHERE id = $1 
        RETURNING *`;
    return await pool.query(updateQuery, [complaintId]);
};

exports.checkIfComplaintExists = async (complaintId) => {
    const query = `
        SELECT * FROM complaints 
        WHERE id = $1 AND assigned_to IS NOT NULL
    `;
    return await pool.query(query, [complaintId]);
};
