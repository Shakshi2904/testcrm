// services/partService.js
const partModel = require("../models/partModel");

exports.fetchCities = async () => {
    const result = await partModel.getCities();
    // Ensure we return rows as an array
    return result.rows || [];  // If no rows are found, return an empty array
};

exports.fetchAddresses = async (city) => {
    const result = await partModel.getAddressesByCity(city);
    // Ensure we return rows as an array
    return result.rows || [];  // If no rows are found, return an empty array
};

exports.fetchMachinesWithParts = async (addressId) => {
    const machinesResult = await partModel.getMachinesByAddress(addressId);
    const machines = machinesResult.rows || [];  // Ensure machines are an array

    // Ensure parts are attached to each machine
    const machinesWithParts = await Promise.all(machines.map(async (machine) => {
        const partsResult = await partModel.getPartsByMachineAndUser(machine.machine_id, machine.refiller_id);
        machine.parts = partsResult.rows || [];  // Ensure parts are returned as an array
        return machine;
    }));

    return machinesWithParts;
};
