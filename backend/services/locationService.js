// services/locationService.js
const locationModel = require("../models/locationModel");

exports.getMachinesWithDetails = async () => {
    const result = await locationModel.fetchAllMachinesWithDetails();
    return result.rows;
};
