const Employee = require('../models/Employee.model');

const createEmployee = async (employeeData) => {
  const employee = new Employee(employeeData);
  return await employee.save();
};

const getAllEmployees = async () => {
  return await Employee.find().select('-password');
};

const getEmployeeById = async (id) => {
  return await Employee.findById(id).select('-password');
};

const updateEmployee = async (id, updateData) => {
  return await Employee.findByIdAndUpdate(id, updateData, { new: true }).select('-password');
};

const deleteEmployee = async (id) => {
  return await Employee.findByIdAndDelete(id);
};

module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee
};