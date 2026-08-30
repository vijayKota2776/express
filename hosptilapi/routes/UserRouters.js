const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');

router.get('/user',async (req, res)=> {
    res.status(200).send("welcome to the hosptial of the best")
})


router.post('/user/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await  User.findOne({ username });
        if(existingUser){
            return res.status(400).json({ message: 'User already exists' });
        }
        
        const existingemail = await User.findOne({  email });
        if(existingemail){
            return res.status(400).json({ message: 'Email already exists' });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

router.post('/user/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        
        if (!user) {
            return res.status(401).json({ message: 'Invalid username ' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(401).json({message: 'Invalid password '});
        }


          res.status(200).json({
      message: "Login successful",

    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message
    });
  }
});
module.exports = router;