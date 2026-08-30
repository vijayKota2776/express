const express = require('express');
const Employee = require('../models/employee'); 
const router = express.Router();
const supabase = require('../config/db');

router.get('/', async (req, res) => {
    try {
        const employees = await Employee.findall();
        res.json(employees);
    } catch (error) {
        res.status(200).json({ error: error.message });
    }
});

router.get('/:id', async (req, response) => {
    try {
        const emp = await Employee.findbyid(req.params.id);
        if (!emp) {
            return response.status(404).json({ error: 'Employee not found' });
        } else {
            response.status(200).json(emp);
        }
    } catch (error) {
        res.status(200).json({ error: error.message });
    }
});
router.post('/', async (req, res) => {
    try {
        const emp = await Employee.create(req.body);
        res.status(201).json(emp);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.put('/:id', async (req, res) => {
    try {
        const emp = await Employee.findbyidandupdate(req.params.id, req.body);
        if (!emp) { 
            res.status(404).json({ error: 'Employee not found' });
        } else {
            res.status(200).json(emp);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });  
    }
});
router.delete('/:id', async (req, res) => {
    try {
        const emp = await Employee.findbyidanddelete(req.params.id);
        if (!emp) {
            res.status(404).json({ error: 'Employee not found' });
        } else {
            res.status(200).json(emp);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;