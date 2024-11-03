const mongoose = require('mongoose');
require('dotenv').config();

const mongoDBConnectionString = process.env.MONGODB_URI;

mongoose.connect(mongoDBConnectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connection established successfully'))
.catch((error) => console.error('Failed to connect to MongoDB:', error));

module.exports = mongoose.connection;