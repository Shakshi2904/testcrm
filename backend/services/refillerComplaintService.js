const refillerComplaintModel = require("../models/refillerComplaintModel");

exports.fetchTechnicianIssues = () => {
  return refillerComplaintModel.getTechnicianIssues();
};

exports.createComplaint = async (refiller_id, machine_id, issue_id) => {
  const machine = await refillerComplaintModel.getMachineById(machine_id);
  if (!machine || !machine.technician_id) {
    throw new Error("No technician assigned to this machine");
  }

  const assigned_to = machine.technician_id;
  const assigned_date = new Date();
  const due_date = new Date(assigned_date);
  due_date.setHours(due_date.getHours() + 48);

  return refillerComplaintModel.insertComplaint(
    refiller_id, machine_id, issue_id, assigned_to, assigned_date, due_date
  );
};
