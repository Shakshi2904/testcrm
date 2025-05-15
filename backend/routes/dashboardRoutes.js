const express = require("express");
const { getDashboardData } = require("../controllers/dashboardController");
const authenticateUser = require("../middleware/authMiddleware");

const router = express.Router();

// Route to get dashboard data for admin or regular users
router.get("/", authenticateUser, getDashboardData);

module.exports = router;
