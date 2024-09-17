const mongoose = require('mongoose');

const databaseConnectionString = process.env.MONGODB_URI || 'your_default_connection_string';

mongoose.connect(databaseConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
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

// Supplementary function to find entries by status
/**
 * Finds development log entries by their status.
 * @param {string} status - The status of the development logs to find ('Open', 'In Progress', 'Closed').
 * @returns {Promise<Array>} A promise that resolves to an array of development log entries.
 */
const findEntriesByStatus = async (status) => {
  try {
    const entries = await DevelopmentLogEntry.find({ status: status }).exec();
    return entries;
  } catch (err) {
    console.error('Error retrieving entries by status:', err);
    throw err; // rethrow the error for further handling if desired
  }
};

// Expose both the model and the new utility function
module.exports = {
    DevelopmentLogEntry,
    findEntriesByStatus,
};

const { findEntriesByStatus } = require('./path-to-your-file');

async function displayEntries() {
  try {
    const openEntries = await findEntriesByStatus('Open');
    console.log('Open Entries:', openEntries);
    // Similarly, you could fetch 'In Progress' or 'Closed' entries
  } catch (err) {
    console.error('Failed to fetch entries:', err);
  }
}

displayEntries();