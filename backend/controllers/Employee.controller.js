const employeeService = require('../services/Employee.service');

const createEmployee = async (req, res) => {
  /*
    #swagger.tags = ['Employees']
    #swagger.summary = 'Create a new employee'
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Employee data',
      required: true,
      schema: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        contact: '555-123-4567',
        role: 'Developer',
        password: 'password123',
        isAdmin: false,
        photo: 'https://example.com/photo.jpg'
      }
    }
    #swagger.responses[201] = { description: 'Employee created successfully' }
    #swagger.responses[400] = { description: 'Bad request' }
  */
  try {
    const employee = await employeeService.createEmployee(req.body);
    res.status(201).json(employee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllEmployees = async (req, res) => {
  /*
    #swagger.tags = ['Employees']
    #swagger.summary = 'Get all employees'
    #swagger.responses[200] = { description: 'List of employees' }
    #swagger.responses[500] = { description: 'Server error' }
  */
  try {
    const employees = await employeeService.getAllEmployees();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getEmployeeById = async (req, res) => {
  /*
    #swagger.tags = ['Employees']
    #swagger.summary = 'Get employee by ID'
    #swagger.parameters['id'] = { description: 'Employee ID', required: true }
    #swagger.responses[200] = { description: 'Employee data' }
    #swagger.responses[404] = { description: 'Employee not found' }
    #swagger.responses[500] = { description: 'Server error' }
  */
  try {
    const employee = await employeeService.getEmployeeById(req.params.id);
    if (!employee) return res.status(404).json({ error: 'Employee not found' });
    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateEmployee = async (req, res) => {
  /*
    #swagger.tags = ['Employees']
    #swagger.summary = 'Update employee'
    #swagger.parameters['id'] = { description: 'Employee ID', required: true }
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Updated employee data',
      schema: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        contact: '555-123-4567',
        role: 'Manager',
        isAdmin: true,
        photo: 'https://example.com/photo.jpg'
      }
    }
    #swagger.responses[200] = { description: 'Employee updated successfully' }
    #swagger.responses[404] = { description: 'Employee not found' }
    #swagger.responses[400] = { description: 'Bad request' }
  */
  try {
    const employee = await employeeService.updateEmployee(req.params.id, req.body);
    if (!employee) return res.status(404).json({ error: 'Employee not found' });
    res.json(employee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteEmployee = async (req, res) => {
  /*
    #swagger.tags = ['Employees']
    #swagger.summary = 'Delete employee'
    #swagger.parameters['id'] = { description: 'Employee ID', required: true }
    #swagger.responses[200] = { description: 'Employee deleted successfully' }
    #swagger.responses[404] = { description: 'Employee not found' }
    #swagger.responses[500] = { description: 'Server error' }
  */
  try {
    const employee = await employeeService.deleteEmployee(req.params.id);
    if (!employee) return res.status(404).json({ error: 'Employee not found' });
    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee
};