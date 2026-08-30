const express = require('express');
const router = express.Router();
const hosptial = require('../models/hosptial');
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const User = require('../models/user');

passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return done(null, false, { message: 'User Not Found !' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return done(null, false, { message: 'Incorrect Password' });
        }
        return done(null, user);
    } catch (error) {
        return done(error);
    }
}));

router.use(passport.initialize());

const isAuthenticated = passport.authenticate('local',{session:false});

router.post('/hosptial/login', isAuthenticated, (req, res) => {
    res.status(200).json({
        message: 'Login successful',
        user: req.user
    });
});

router.get('/hosptial',async (req, res)=> {
    res.status(200).send("welcome to the hosptial management system")
})

router.post('/hospitals',isAuthenticated,async(req,res)=>{
    try{
        const hospital=await hosptial.find();
        res.status(200).json({message:'The Hospital Data ',data:hospital})
    }
    catch(error){
        res.status(500).send('Inter Server Issue');
    }
    
});


router.get('/hosptial/list', async (req, res) => {
    try {
        const hosptials = await hosptial.find();
        res.status(200).json({ hosptials });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

router.get('/hosptial/:id', async (req, res) => {
    try {
        const hosptialId = req.params.id;
        const hosptialData = await hosptial.findById(hosptialId);
        if (!hosptialData) {
            return res.status(404).json({ message: 'Hosptial not found' });
        }
        res.status(200).json({ hosptial: hosptialData });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

router.put('/hosptial/:id', async (req, res) => {
    try {
        const hosptialId = req.params.id;
        const { name, city, totalbeds, availablebeds } = req.body;

        const hosptialData = await hosptial.findByIdAndUpdate(
            hosptialId,
            { name, city, totalbeds, availablebeds },
            { new: true }
        );

        if (!hosptialData) {
            return res.status(404).json({ message: 'Hosptial not found' });
        }

        res.status(200).json({ message: 'Hosptial updated successfully', hosptial: hosptialData });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

router.delete('/hosptial/:id', async (req, res) => {
    try {
        const hosptialId = req.params.id;

        const hosptialData = await hosptial.findByIdAndDelete(hosptialId);

        if (!hosptialData) {
            return res.status(404).json({ message: 'Hosptial not found' });
        }

        res.status(200).json({ message: 'Hosptial deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

router.post('/hosptial/add', async (req, res) => {
    try {
        const { name, city, totalbeds, availablebeds } = req.body;

        const existinghosptial = await  hosptial.findOne({ name });
        if(existinghosptial){
            return res.status(400).json({ message: 'Hosptial already exists' });
        }
        
        const newhosptial = new hosptial({
            name,
            city,
            totalbeds,
            availablebeds
        });

        await newhosptial.save();
        res.status(201).json({ message: 'Hosptial added successfully', hosptial: newhosptial });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;