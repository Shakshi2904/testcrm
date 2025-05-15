// models/locationModel.js
const { pool } = require("../db");

exports.fetchAllMachinesWithDetails = async () => {
    return await pool.query(`
        SELECT 
            m.id AS machine_id, 
            m.location_id, 
            m.status, 
            m.last_service_date, 
            m.next_service_due, 
            t.name AS technician_name, 
            r.name AS refiller_name,
            l.location_name
        FROM machines m
        LEFT JOIN users t ON m.technician_id = t.id
        LEFT JOIN users r ON m.refiller_id = r.id
        LEFT JOIN locations l ON m.location_id = l.id
    `);
};
