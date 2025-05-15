const model = require("../models/technicianDueDateModel");

exports.fetchPendingTasks = async () => {
    const result = await model.getPendingTechnicianTasks();
    return result.rows;
};
