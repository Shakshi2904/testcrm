const model = require("../models/technicianNewTaskModel");

exports.fetchNewTasks = async (technicianId) => {
    const result = await model.getNewTasksForTechnician(technicianId);
    return result.rows;
};

exports.updateDueDate = async (complaintId, dueDate) => {
    const result = await model.assignDueDate(complaintId, dueDate);
    return result;
};
