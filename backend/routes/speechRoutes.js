const express = require('express');
const router = express.Router();
const Transcript = require('../models/Transcript');
const responses = require('../data/responses.json');

// POST: Process user input and return bot response
router.post('/', async (req, res) => {
    try {
        const { userInput } = req.body;
        if (!userInput) return res.status(400).json({ error: 'No input provided.' });

        // Lookup bot response
        const botResponse = responses[userInput.toLowerCase()] || "Sorry, I don't understand that.";

        // Save transcript to MongoDB
        const transcript = new Transcript({ userInput, botResponse });
        await transcript.save();

        res.json({ botResponse });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server Error' });
    }
});

module.exports = router;
