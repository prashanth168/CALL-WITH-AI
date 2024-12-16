const Transcript = require('../models/Transcript');
const staticResponses = require('../data/responses.json');

const getResponse = async (req, res) => {
    const { userInput } = req.body;
    console.log("Received input:", userInput); // Log the received input

    // Normalize input and compare to static responses
    const normalizedInput = userInput.toLowerCase().trim();
    const botResponse = staticResponses[normalizedInput] || "Sorry, I didn't understand that.";
    console.log("Bot response:", botResponse); // Log the response

    // Optionally, save the conversation to the database
    await Transcript.create({ userInput, botResponse });

    // Return the bot's response to the frontend
    res.json({ botResponse });
};

const endConversation = (req, res) => {
    // End the conversation logic (if needed)
    res.json({ message: "Conversation ended successfully" });
};

module.exports = { getResponse, endConversation };