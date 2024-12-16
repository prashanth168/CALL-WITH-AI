const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const speechRoutes = require('./routes/speechRoutes');
const connectDB = require('./config/db'); // Function to connect to MongoDB

// Initialize Express
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB(); // Define this function in 'config/db.js' to connect to MongoDB

// Routes
app.use('/api/speech', speechRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});