const express = require('express');
const logEntryController = require('./logEntryController');

const router = express.Router();

router.post('/logs', logEntryController.createEntry);

router.get('/logs', logEntryController.fetchAllEntries);

router.get('/logs/:id', logEntryController.fetchEntryById);

router.put('/logs/:id', logEntryController.updateEntry);

router.delete('/logs/:id', logEntryController.removeEntry);

module.exports = router;