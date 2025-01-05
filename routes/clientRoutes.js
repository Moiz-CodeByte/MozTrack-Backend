const express = require('express');
const router = express.Router();
const { addClient, getClients } = require('../controllers/clientController');
const authMiddleware = require('../middleware/authMiddleware');

// Routes
router.post('/add', authMiddleware, addClient);
router.get('/', authMiddleware, getClients);

module.exports = router;
