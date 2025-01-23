
const express = require('express');
const router = express.Router();
const { addProject, updateProject, deleteProject } = require('../controllers/projectController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/add', authMiddleware, addProject); //add a project
router.put('/:id', updateProject); // Update a project
router.delete('/:id', deleteProject); // Delete a project

module.exports = router;

