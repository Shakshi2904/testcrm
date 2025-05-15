const pool = require("../db");

const getAllComplaintsFromDB = async () => {
    const result = await pool.query("SELECT * FROM complaints");
    return result.rows;
};

module.exports = { getAllComplaintsFromDB };
