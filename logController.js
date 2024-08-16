const mongoose = require('mongoose');
const LogEntry = require('./LogModel');

mongoose.connect(process.env.MONGODB_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
});

const createLogEntry = async (req, res) => {
  try {
    const logEntry = new LogEntry(req.body);
    const result = await logEntry.save();
    res.status(201).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getAllLogEntries = async (req, res) => {
  try {
    const logEntries = await LogEntry.find({});
    res.status(200).send(logEntries);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getLogEntryById = async (req, res) => {
  try {
    const logEntry = await LogEntry.findById(req.params.id);
    if (!logEntry) return res.status(404).send();
    res.status(200).send(logEntry);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateLogEntry = async (req, res) => {
  try {
    const logEntry = await LogEntry.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!logEntry) return res.status(404).send();
    res.status(200).send(logEntry);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteLogEntry = async (req, res) => {
  try {
    const logEntry = await LogEntry.findByIdAndDelete(req.params.id);
    if (!logEntry) return res.status(404).send();
    res.status(200).send(logEntry);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  createLogEntry,
  getAllLogEntries,
  getLogEntryById,
  updateLogEntry,
  deleteLogEntry
};