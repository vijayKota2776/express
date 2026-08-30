const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Auth_API');

const db = mongoose.connection;


db.on('connected',()=>{
    console.log('Database Connected Successfully');
})

db.on('disconnected',()=>{
    console.log("Database Disconnected");
})

db.on('error',(err)=>{
    console.log("Database Connection Error",err);
})

module.exports=db;