const mongoose = require ('mongoose');
const employeSchema = require('./modules/employes')


mongoose.connect('mongodb://localhost:27017/hi', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log(' Database connected successfully');
});

mongoose.connection.on('error', (err) => {
  console.error(' Database connection error:', err);
});