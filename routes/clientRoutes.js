const express = require('express');
const router = express.Router();
const { addClient, getClients, updateClient, deleteClient } = require('../controllers/clientController');
const authMiddleware = require('../middleware/authMiddleware');

// Routes
router.post('/add', authMiddleware, addClient);
router.get('/', authMiddleware, getClients);
router.put('/:clientId', authMiddleware, updateClient);  // Update client details
router.delete('/:clientId', authMiddleware, deleteClient);  // Delete client
// Add a new client
// router.post('/clients/add', authMiddleware, addClient);

// // Get all clients
// router.get('/clients', authMiddleware, getClients);

// // Update a client
// router.put('/clients/:id', authMiddleware, updateClient);

// // Delete a client
// router.delete('/clients/:id', authMiddleware, deleteClient);

module.exports = router;
