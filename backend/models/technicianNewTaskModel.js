const pool = require("../db");

exports.getNewTasksForTechnician = async (technicianId) => {
    const query = `
        SELECT c.id AS complaint_id, 
               i.issue_description,
               c.machine_id,
               c.status,
               c.assigned_date,
               c.due_date,
               u.name AS technician_name, 
               u.email
        FROM complaints c
        JOIN users u ON c.assigned_to = u.id
        JOIN issues i ON c.issue_id = i.id
        WHERE c.assigned_to = $1 
          AND c.status = 'pending' 
          AND c.due_date IS NULL
    `;
    return await pool.query(query, [technicianId]);
};

exports.assignDueDate = async (complaintId, dueDate) => {
    const query = `
        UPDATE complaints 
        SET due_date = $1 
        WHERE id = $2 
        RETURNING due_date
    `;
    return await pool.query(query, [dueDate, complaintId]);
};
