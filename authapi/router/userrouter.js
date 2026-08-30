const express = require('express');
const User=require('../models/useer');
const bcrypt=require('bcryptjs');

const router=express.Router(); 


router.post('/register',async(request,response)=>{
    try{

        const{name,username,email,password}=request.body;

        const existingUsername=await User.findByUsername(username);
        if(existingUsername){
            return response.status(400).json({message:"username already exists"});
        }


        const existingEmail=await User.findByEmail(email);
        if(existingEmail){
            return response.status(400).json({message:"email already exists"});  
        }


        const hashPassword=await bcrypt.hash(password,10);
        const newUser={
            name, 
            username,
            email,
            password:hashPassword
        };
        const user=await User.create(newUser);
        return response.status(201).json({message:"user registered successfully",user});

    }catch(error){
        response.status(500).json({message:"internal server error"});
    }
});

module.exports=router;