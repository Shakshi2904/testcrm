const model = require("../models/refillerPendingTaskModel");

exports.fetchPendingTasks = async (refillerId) => {
    const result = await model.getPendingTasksByRefillerId(refillerId);
    return result.rows;
};

exports.completeTask = async (complaintId) => {
    const complaint = await model.findComplaintById(complaintId);
    if (complaint.rowCount === 0) {
        return null;
    }

    const updated = await model.updateTaskStatusToCompleted(complaintId);
    return updated.rows[0];
};
