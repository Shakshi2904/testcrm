const model = require("../models/technicianPendingTaskModel");

exports.getPendingTasks = async (technicianId) => {
    const result = await model.getPendingTasksForTechnician(technicianId);
    return result.rows;
};

exports.completeTask = async (complaintId) => {
    const checkResult = await model.checkIfComplaintExists(complaintId);

    if (checkResult.rowCount === 0) {
        return null;
    }

    const updateResult = await model.updateTaskStatusToCompleted(complaintId);
    return updateResult.rows[0];
};
