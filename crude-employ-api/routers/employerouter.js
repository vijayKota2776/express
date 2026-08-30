const express = require('express');
const router = express.Router();
const Employee = require('../modules/employes');


router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    console.error(' Failed to fetch employees:', error);
    res.status(500).json({ error: 'Failed to fetch employees' });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json(employee);
  } catch (error) {
    console.error(' Error fetching employee:', error);
    res.status(500).json({ error: 'Failed to fetch employee' });
  }
});


router.post('/', async (req, res) => {
  try {
    const { name, email, role, department, salary } = req.body;
    const newEmployee = new Employee({
      name,
      email,
      role,
      department,
      salary,
    });
    const savedEmployee = await newEmployee.save();
    res.status(201).json(savedEmployee);
  } catch (error) {
    console.error(' Error creating employee:', error);
    res.status(500).json({ message: error.message });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee Not Found' });
    }

    res.status(200).json({
      message: 'Employee Updated Successfully',
      updatedEmployee,
    });
  } catch (error) {
    console.error(' Error updating employee:', error);
    res.status(500).json({ message: error.message });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
    if (!deletedEmployee) {
      return res.status(404).json({ message: 'Employee Not Found' });
    }
    res.status(200).json({ message: 'Employee Deleted Successfully' });
  } catch (error) {
    console.error('Error deleting employee:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;