const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('Could not connect to MongoDB...', err);
    process.exit(1); 
  });

const app = express();

app.use(express.json());

const logEntrySchema = new mongoose.Schema({
  title: String,
  description: String,
  date: { 
    type: Date, 
    default: Date.now 
  }
});

const LogEntry = mongoose.model('LogEntry', logEntrySchema);

app.get('/logs', async (req, res) => {
  try {
    const entries = await LogEntry.find();
    res.json(entries);
  } catch (error) {
    res.status(500).json({message: "Error fetching log entries."});
    console.error('Error on fetching logs:', error.message);
  }
});

app.post('/logs', async (req, res) => {
  if (!req.body.title || !req.body.description) {
    return res.status(400).json({ message: "Title and description are required." });
  }

  const logEntry = new LogEntry({
    title: req.body.title,
    description: req.element.description
  });
  
  try {
    const newEntry = await logEntry.save();
    res.status(201).json(newEntry);
  } catch (error) {
    res.status(400).json({ message: "Error saving the log entry." });
    console.error('Error on saving new log:', error.message);
  }
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));