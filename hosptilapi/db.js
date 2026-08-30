const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/hosptial-api');

const db= mongoose.connection;

db.on('connected',()=>{
    console.log('mongodb connected successfully');
})
db.on ('disconnected',()=>{
    console.log('mongodb disconnected ');
})
db.on('error',()=>{
    console.log('database conection error');
})
module.exports=db;