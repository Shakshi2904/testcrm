const refillerTaskModel = require("../models/refillerTaskModel");

const getPendingComplaints = async (refillerId) => {
    try {
        const complaints = await refillerTaskModel.getPendingComplaintsByRefillerId(refillerId);
        return complaints;
    } catch (err) {
        throw new Error("Error fetching pending complaints: " + err.message);
    }
};

const assignDueDate = async (complaintId, due_date) => {
    try {
        const updatedDueDate = await refillerTaskModel.assignDueDateToComplaint(complaintId, due_date);
        return updatedDueDate;
    } catch (err) {
        throw new Error("Error assigning due date: " + err.message);
    }
};

module.exports = {
    getPendingComplaints,
    assignDueDate
};
