const model = require("../models/technicianComplaintModel");

exports.fetchCities = async () => {
    const result = await model.getCities();
    return result.rows;
};

exports.fetchAddresses = async (city) => {
    const result = await model.getAddressesByCity(city);
    return result.rows;
};

exports.fetchMachines = async (addressId) => {
    const result = await model.getMachinesByAddress(addressId);
    return result.rows;
};

exports.fetchTechnicianIssues = async () => {
    const result = await model.getTechnicianIssues();
    return result.rows;
};

exports.submitComplaint = async (technicianId, machineId, issueId) => {
    const techCheck = await model.validateTechnician(technicianId);
    if (techCheck.rowCount === 0) throw new Error("Unauthorized technician ID");

    const machine = await model.getRefillerForMachine(machineId);
    if (machine.rowCount === 0 || !machine.rows[0].refiller_id) {
        throw new Error("No assigned Refiller for this machine");
    }

    const assignedTo = machine.rows[0].refiller_id;
    const assignedDate = new Date();
    const dueDate = new Date(assignedDate);
    dueDate.setHours(dueDate.getHours() + 48);

    const result = await model.submitComplaint({
        technicianId,
        machineId,
        issueId,
        assignedTo,
        assignedDate,
        dueDate,
    });

    return result.rows[0];
};
