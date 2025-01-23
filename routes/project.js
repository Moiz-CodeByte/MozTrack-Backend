
const express = require('express');
const router = express.Router();
const { addProject, updateProject, deleteProject, getProjects } = require('../controllers/projectController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/add', authMiddleware, addProject); //add a project
router.put('/:id', updateProject); // Update a project
router.delete('/:id', deleteProject); // Delete a project
router.get('/getprojects', authMiddleware, getProjects );

module.exports = router;

