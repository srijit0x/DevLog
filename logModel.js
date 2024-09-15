const mongoose = require('mongoose');

const databaseConnectionString = process.env.MONGODB_URI || 'your_default_connection_string';

mongoose.connect(databaseConnectionString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connection Successful'))
  .catch(err => console.error('Error Connecting to MongoDB:', err));

const developmentLogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  projectName: {
    type: String,
    required: true
  },
  entryDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    required: true,
    enum: ['Open', 'In Progress', 'Closed']
  }
});

const DevelopmentLogEntry = mongoose.model('DevelopmentLogEntry', developmentLogSchema);

module.exports = DevelopmentLogEntry;