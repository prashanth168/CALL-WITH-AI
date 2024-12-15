const mongoose = require('mongoose');

const TranscriptSchema = new mongoose.Schema({
    userInput: { type: String, required: true },
    botResponse: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Transcript', TranscriptSchema);
