const mongoose = require('mongoose');


const mongoDBUri = process.env.MONGODB_URI || 'your_default_connection_string';


mongoose.connect(mongoDBUri, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB connection error:', err));


const logSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  project: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    required: true,
    enum: ['Open', 'In Progress', 'Closed']
  }
});


const Log = mongoose.model('Log', logSchema);


module.exports = Log;