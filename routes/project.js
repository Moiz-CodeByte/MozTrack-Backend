
const express = require('express');
const router = express.Router();
const { addProject } = require('../controllers/projectController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/add', authMiddleware, addProject);

module.exports = router;

