const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();
router.get('/',(req,res)=>{
    res.send("User Router Working Fine")
});


router.post('/register', async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(409).json({ message: "Username already exists" });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      username,
      email,
      password: hashedPassword
    });

    await newUser.save();

    res.status(201).json({
      message: "User created successfully",
      user: newUser
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message 
    });
  }
});


router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid username" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        name: user.name,
        username: user.username,
        email: user.email
      },
      "timepasstoken",
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message
    });
  }
});

router.get('/UserProfile', async (req, res) => {
  try {
        const {token}=req.headers
        console.log("token received",token);
        if(!token){
            return res.status(401).json({message:"Unauthorized access, token missing"});
        }
        
        const decoded=jwt.verify(token,'timepasstoken');
        console.log("decoded token",decoded);
        const user= await User.findById(decoded.userId).select('-password');
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        res.status(200).json({message:"User profile fetched successfully", user});
    } catch (error) {
        res.status(500).json({message:"Internal Server Error", error:error.message});
    }


})

module.exports = router;