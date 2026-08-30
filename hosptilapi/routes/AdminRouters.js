const express = require('express');
const router = express.Router();
const Admin = require('../models/admin');
const bcrypt = require('bcryptjs');

router.get('/admin', async (req, res) => {
    res.status(200).send('welcome to hospital happy working');
});

router.post('/admin/register', async (req, res) => {
    try {
        const { adminName, email, password } = req.body;

        const existingAdmin = await Admin.findOne({ adminName });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdminUser = new Admin({
            adminName,
            email,
            password: hashedPassword,
        });

        await newAdminUser.save();
        res.status(201).json({ message: 'Admin registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

router.post('/admin/login', async (req, res) => {
    try {
        const { adminName, password } = req.body;
        const adminUser = await Admin.findOne({ adminName });

        if (!adminUser) {
            return res.status(401).json({ message: 'Invalid admin' });
        }

        const isMatch = await bcrypt.compare(password, adminUser.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

module.exports = router;