const createMultipleLogEntries = async (req, res) => {
  try {
    const logEntries = await LogEntry.insertMany(req.body);
    res.status(201).send(logEntries);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteMultipleLogEntries = async (req, res) => {
  try {
    const results = await LogEntry.deleteMany({
      _id: { $in: req.body.ids },
    });
    res.status(200).send(results);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  createLogEntry,
  getAllLogEntries,
  getLogEntryById,
  updateLogEntry,
  deleteLogEntry,
  createMultipleLogEntries,
  deleteMultipleLogEntries,
};