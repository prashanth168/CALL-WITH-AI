import React, { useState } from 'react';
import './style.css';

const SpeechBot = () => {
    const [userInput, setUserInput] = useState('');
    const [botResponse, setBotResponse] = useState('');

    // Start speech recognition
    const startListening = () => {
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = 'en-US';

        recognition.start();
        recognition.onresult = async (event) => {
            const text = event.results[0][0].transcript;
            setUserInput(text);
            fetchResponse(text);
        };
    };

    // Fetch bot response from backend
    const fetchResponse = async (input) => {
        const res = await fetch('http://localhost:5000/api/speech', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userInput: input }),
        });
        const data = await res.json();
        setBotResponse(data.botResponse);

        // Text-to-Speech
        const utterance = new SpeechSynthesisUtterance(data.botResponse);
        window.speechSynthesis.speak(utterance);
    };

    return (
        <div className="container">
            <h1>Speech-to-Text Bot</h1>
            <button onClick={startListening}>🎤 Start Speaking</button>
            <p>User Input: {userInput}</p>
            <p>Bot Response: {botResponse}</p>
        </div>
    );
};

export default SpeechBot;
