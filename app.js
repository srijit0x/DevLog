const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

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
    res.status(500).json({message: error.message});
  }
});

app.post('/logs', async (req, res) => {
  const logEntry = new LogEntry({
    title: req.body.title,
    description: req.body.description
  });
  
  try {
    const newEntry = await logEntry.save();
    res.status(201).json(newEntry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));