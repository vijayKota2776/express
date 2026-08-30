const express = require('express');
const userRouter = require('./router/userrouter');

const db = require('./db');
const cors=require('cors');

const app = express();
app.use(cors('*'))
app.use(express.json());

app.use('/user',userRouter)

app.listen(4000,()=>{
    console.log("Server Running on port 4000")
})