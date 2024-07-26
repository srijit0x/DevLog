const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

async function connectToMongoDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Could not connect to MongoDB...', err);
    process.exit(1);
  }
}

connectToMongoDB();

const app = express();

app.use(express.json());

const logEntrySchema = new mongoose.Schema({
  title: String,
  description: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

const LogEntry = mongoose.model('LogIdEntry', logEntrySchema);

app.get('/logs', async (req, res) => {
  try {
    const entries = await LogEntry.find();
    res.json(entries);
  } catch (error) {
    res.status(500).json({ message: "Error fetching log entries.", error: error.message });
  }
});

app.post('/logs', async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: "Title and description are required." });
  }

  try {
    const logEntry = new LogEntry({ title, description });
    const newEntry = await logEntry.save();
    res.status(201).json(newEntry);
  } catch (error) {
    res.status(400).json({ message: "Error saving the log entry.", error: error.message });
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));