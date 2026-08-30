const express = require('express');
// const mongoose = require('mongoose');
const employeeRoutes = require('./routers/employerouter'); 
const cors = require('cors')

const db = require ('./db')

const app = express();

app.use(cors('*'))
app.use(express.json());




app.use('/employees', employeeRoutes);


app.get('/', (req, res) => {
  res.send(' Employee API is running...');
});


app.listen(4000, () => {
  console.log(' Server started on PORT 4000');
});