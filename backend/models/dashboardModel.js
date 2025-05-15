const { pool } = require("../db");

exports.getAllUsers = async () => {
    const result = await pool.query("SELECT id, name, email FROM users");
    return result.rows;
};

exports.getUserById = async (userId) => {
    const result = await pool.query("SELECT id, name, email FROM users WHERE id = $1", [userId]);
    return result.rows;
};
