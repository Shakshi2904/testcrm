const refillerDueDateModel = require("../models/refillerDueDateModel");

exports.fetchPendingRefillerComplaints = async () => {
    const result = await refillerDueDateModel.getPendingComplaints();
    return result.rows;
};
