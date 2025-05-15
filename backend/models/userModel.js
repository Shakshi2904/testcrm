const pool = require("../db");

exports.findUserByEmail = async (email) => {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    return result.rows[0];
};

exports.createUser = async (name, email, hashedPassword, role_id) => {
    const result = await pool.query(
        "INSERT INTO users (name, email, password, role_id) VALUES ($1, $2, $3, $4) RETURNING *",
        [name, email, hashedPassword, role_id]
    );
    return result.rows[0];
};

exports.updateUserPassword = async (userId, hashedPassword) => {
    const result = await pool.query(
        "UPDATE users SET password = $1 WHERE id = $2 RETURNING *",
        [hashedPassword, userId]
    );
    return result.rows[0];
};
