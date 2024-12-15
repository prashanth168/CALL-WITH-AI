const Transcript = require('../models/Transcript');
const staticResponses = require('../data/responses.json');

const speechToText = async (req, res) => {
    const { audioData } = req.body;

    // Simulated Speech-to-Text conversion
    const userInput = "Simulated text from audio"; // Replace with actual speech-to-text logic
    res.json({ userInput });
};

const textToSpeech = async (req, res) => {
    const { text } = req.body;

    // Simulated Text-to-Speech conversion
    const audioUrl = "http://example.com/generated-audio.mp3"; // Replace with actual text-to-speech logic
    res.json({ audioUrl });
};

const getResponse = async (req, res) => {
    const { userInput } = req.body;

    // Retrieve static response or fallback
    const botResponse = staticResponses[userInput.toLowerCase()] || "Sorry, I didn't understand that.";

    // Save conversation to database
    await Transcript.create({ userInput, botResponse });

    res.json({ botResponse });
};

module.exports = { speechToText, textToSpeech, getResponse };
