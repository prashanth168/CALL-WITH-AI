const express = require('express');
const router = express.Router();
const { getResponse, endConversation } = require('../controllers/speechController');

// POST: Process user input and return bot response
router.post('/', getResponse);

// POST: End conversation
router.post('/end', endConversation);

module.exports = router;