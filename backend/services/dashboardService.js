const dashboardModel = require("../models/dashboardModel");

exports.getDashboardData = async (userId, role) => {
    if (role === 1) {
        return await dashboardModel.getAllUsers(); // Admin sees all users
    } else {
        return await dashboardModel.getUserById(userId); // Regular user sees their own info
    }
};
