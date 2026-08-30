const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URL;

    if (!uri) {
      console.error('MONGO_URL is not defined. Check your .env file.');
      process.exit(1);
    }

    await mongoose.connect(uri);

    console.log('Database Connected');

    const db = mongoose.connection;

    db.on('connected', () => {
      console.log('Database connection established');
    });

    db.on('disconnected', () => {
      console.warn('Database Disconnected');
    });

    db.on('error', (error) => {
      console.error('Database Error:', error);
    });

  } catch (err) {
    console.error('Database connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;