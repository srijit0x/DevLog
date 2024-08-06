const express = require('express');
const logController = require('./logController');

const router = express.Router();

router.post('/logs', logController.createLogEntry);

router.get('/logs', logController.getAllLogEntries);

router.get('/logs/:id', logController.getLogEntryById);

router.put('/logs/:id', logController.updateLogEntry);

router.delete('/logs/:id', logController.deleteLogEntry);

module.exports = router;