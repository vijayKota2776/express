const { create } = require('../modules/Books');
const User=require('../modules/userSchema');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const authMiddleWare = require('../middleWare/authMiddleware');

register=async (request,response)=>{
    try {
        const {name,username,email,password}=request.body;

        const existingUser=await User.findOne({username:username});

        if(existingUser){
            return response.status(400).json({message:"User already exists"});
        }

        const existingEmail=await User.findOne({email:email});

        if(existingEmail){
            return response.status(400).json({message:"Email already exists"});
        }

        const hashedPassword=await bcrypt.hash(password,10);

        const newUser={
            name,
            username,
            email,
            password:hashedPassword,
            role:"STUDENT"
        };

        const user=new User(newUser);
        await user.save();

        response.status(201).json({message:"User registered successfully",data:user});

    } catch (error) {
        response.status(500).json({message:error.message});
    }
};

login=async (request,response)=>{
    try {
        const {username,password}=request.body;

        const user=await User.findOne({username:username});

        if(!user){
            return response.status(404).json({message:"User not found"});
        }

        const isMatch=await bcrypt.compare(password,user.password);

        if(!isMatch){
            return response.status(401).json({message:"Invalid credentials"});
        }

        const token=jwt.sign(
            {userId:user._id,name:user.name,username:user.username,email:user.email,role:user.role},
            'itm',
            {expiresIn:'1h'}
        );

        response.status(200).json({message:"User logged in successfully",data:{token}});
    } catch (error) {
        response.status(500).json({message:error.message});
    }
};

profile=(request,response)=>{
    try {
        const user=request.user;
        response.status(200).json({message:"User profile",data:user});
    } catch (error) {
        response.status(500).json({message:error.message});
    }
};

module.exports={register,login,profile};