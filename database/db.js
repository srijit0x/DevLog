const mongoose = require('mongoose');
require('dotenv').config();

const mongoDBConnectionString = process.env.MONGODB_URI;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: false,
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  family: 4
};

const connectWithRetry = () => {
  console.log('Attempting to connect to MongoDB...');
  mongoose.connect(mongoDBConnectionString, options)
    .then(() => console.log('MongoDB connection established successfully'))
    .catch((error) => {
      console.error('Failed to connect to MongoDB:', error.message);
      
      console.log('Retrying MongoDB connection in 5 seconds...');
      setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();

mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to DB.');
});

mongoose.connection.on('error', (error) => {
    console.log('Mongoose connection error:', error);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected from DB.');
});

process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('Mongoose connection disconnected due to app termination.');
        process.exit(0);
    });
});

module.exports = mongoose.connection;