import React, { useState, useEffect, useRef } from 'react';
import './style.css';

const SpeechBot = () => {
  const [conversationHistory, setConversationHistory] = useState([]); // Store conversation history
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  // Initialize and start speech recognition
  const initializeRecognition = () => {
    if (!recognitionRef.current) {
      recognitionRef.current = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognitionRef.current.lang = 'en-US';
      recognitionRef.current.continuous = true; // Set continuous mode

      recognitionRef.current.onresult = async (event) => {
        const text = event.results[event.resultIndex][0].transcript;
        addToConversation('User', text);
        // console.log("User input:", text); // Log the user input

        // Trigger backend to get response
        await fetchResponse(text);
      };

      recognitionRef.current.onend = () => {
        if (isListening) {
          recognitionRef.current.start(); // Restart listening automatically
        }
      };

      recognitionRef.current.onerror = (event) => {
        console.error("Speech recognition error: ", event.error);
        if (isListening) {
          recognitionRef.current.start(); // Restart on error
        }
      };
    }
  };

  const startListening = () => {
    initializeRecognition();
    setIsListening(true);
    recognitionRef.current.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  // Add messages to conversation history
  const addToConversation = (sender, message) => {
    setConversationHistory((prevHistory) => [...prevHistory, { sender, message }]);
  };

  // Fetch bot response from backend
  const fetchResponse = async (input) => {
    // console.log("Sending request to backend with input:", input); // Log the request

    const res = await fetch('http://localhost:5000/api/speech', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userInput: input }),
    });
    const data = await res.json();
    addToConversation('Bot', data.botResponse);

    // Text-to-Speech
    const utterance = new SpeechSynthesisUtterance(data.botResponse);
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    return () => {
      // Cleanup on component unmount
      stopListening();
    };
  }, []);

  return (
    <div className="container">
      <h1>Speech-to-Text Bot</h1>
      <div className="conversation-box">
        {conversationHistory.map((entry, index) => (
          <p key={index} className={entry.sender === 'User' ? 'user-message' : 'bot-message'}>
            <strong>{entry.sender}:</strong> {entry.message}
          </p>
        ))}
      </div>
      {!isListening ? (
        <button onClick={startListening}> Start Speaking</button>
      ) : (
        <button onClick={stopListening} style={{ backgroundColor: 'red' }}> End Conversation</button>
      )}
    </div>
  );
};

export default SpeechBot;