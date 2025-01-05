const Project = require('../models/Project');

const addProject = async (req, res) => {
  try {
    const { clientId, name } = req.body;

    if (!clientId) {
      return res.status(400).json({ message: 'Client ID is required' });
    }

    if (!name) {
      return res.status(400).json({ message: 'Project name is required' });
    }

    const userId = req.user.id; // Ensure user ID is extracted from the token

    const project = new Project({
      user: userId, // Link the project to the authenticated user
      client: clientId, // Link the project to the specified client
      name,
    });

    await project.save();

    res.status(201).json({
      message: 'Project created successfully',
      project,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addProject };
