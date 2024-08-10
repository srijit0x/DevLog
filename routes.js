const LogEntry = require('./LogEntryModel'); 

exports.createLogEntry = async (req, res) => {
    try {
        const data = extractLogEntryData(req);
        const logEntry = await saveLogEntry(data);
        sendResponse(res, 201, logEntry);
    } catch (error) {
        handleError(res, error);
    }
};

function extractLogEntryData(req) {
    const { title, description, date } = req.body;
    return { title, description, date };
}

async function saveLogEntry(data) {
    const logEntry = new LogEntry(data);
    await logEntry.save();
    return logEntry;
}

function sendResponse(res, statusCode, data) {
    res.status(statusCode).json(data);
}

function handleError(res, error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred', error: error.message });
}