const mongoose = require('mongoose');

const databaseUri = process.env.MONGODB_URI || 'your_default_connection_string';

mongoose.connect(databaseUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB Connection Successful'))
    .catch(err => console.error('MongoDB Connection Error:', err));

const devLogSchema = new mongoose.Schema({
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

const DevLogEntryModel = mongoose.model('DevLogEntry', devLogSchema);

const searchLogsByStatus = async (entryStatus) => {
  try {
    const matchingEntries = await DevLogEntryModel.find({ status: entryStatus }).exec();
    return matchingEntries;
  } catch (err) {
    console.error('Failed to search entries by status:', err);
    throw err; 
  }
};

module.exports = {
    DevLogEntryModel,
    searchLogsByStatus,
};

const { searchLogsByStatus } = require('./path-to-your-file');

async function displayLogsByStatus() {
  try {
    const openLogs = await searchLogsByStatus('Open');
    console.log('Open Development Logs:', openLogs);
  } catch (err) {
    console.error('Error displaying logs by status:', err);
  }
}

displayLogsByStatus();