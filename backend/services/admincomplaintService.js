// services/complaintService.js
const model = require("../models/admincomplaintsModel");

exports.fetchIssues = model.getAllIssues;
exports.fetchLocations = model.getAllLocations;
exports.fetchAddressesByLocation = model.getAddressByLocationId;
exports.fetchMachinesByAddress = model.getMachinesByAddressId;
exports.checkValidClient = model.validateClient;
exports.getRoleByIssue = model.getIssueRole;
exports.findAssignedUser = model.getAssignedUser;
exports.createComplaint = model.insertComplaint;
