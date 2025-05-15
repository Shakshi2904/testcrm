const model = require("../models/clientComplaintModel");

exports.fetchComplaintIssues = () => model.getComplaintIssues();
exports.fetchClientAddresses = (location_id) => model.getClientAddresses(location_id);
exports.fetchClientLocations = () => model.getClientLocations();
exports.fetchClientMachines = (address_id) => model.getClientMachines(address_id);

exports.submitComplaint = async ({ client_id, machine_id, issue_id }) => {
  if (!client_id || !machine_id || !issue_id) {
    throw new Error("Missing required fields");
  }

  const assigned_date = new Date();
  const due_date = new Date(assigned_date);
  due_date.setHours(due_date.getHours() + 48);

  const isValidClient = await model.checkValidClient(client_id);
  if (!isValidClient) throw new Error("Unauthorized client ID");

  const issue = await model.getIssueRole(issue_id);
  if (!issue) throw new Error("Issue not found");

  const role_id = issue.role_id;
  const assignedColumn = role_id === 2 ? "technician_id" : "refiller_id";

  const assignedResult = await model.getAssignedUser(machine_id, assignedColumn);
  if (!assignedResult || !assignedResult.assigned_to) {
    throw new Error("No assigned person for this machine");
  }

  const complaintId = await model.insertComplaint({
    client_id,
    machine_id,
    issue_id,
    assigned_to: assignedResult.assigned_to,
    assigned_date,
    due_date
  });

  return { message: "Complaint submitted successfully!", complaintId };
};
