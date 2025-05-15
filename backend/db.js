const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "crmdb",
    password: "0183",  // Replace with your actual password
    port: 5432,
});

module.exports = pool;  // ✅ Correct export (not as an object)
