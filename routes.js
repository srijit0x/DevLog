const express = require('express');
const logEntryController = require('./logEntryController');

const router = express.Router();

router.post('/logs', logEntryController.createLogEntry);

router.get('/logs', logEntryController.retrieveAllLogEntries);

router.get('/logs/:id', logEntryController.retrieveLogEntryById);

router.put('/logs/:id', logEntryController.updateLogEntryById);

router.delete('/logs/:id', logEntryController.deleteLogEntryById);

module.exports = router;