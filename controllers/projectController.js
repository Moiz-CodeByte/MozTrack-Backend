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
    console.log('Project created successfully', project)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProject = async (req, res) => {
  try {
    const { id } = req.params; // Project ID from URL parameters
    const { name, clientId } = req.body; // Data to update

    if (!name && !clientId) {
      return res.status(400).json({ message: 'At least one field to update is required' });
    }

    const updatedFields = {};
    if (name) updatedFields.name = name;
    if (clientId) updatedFields.client = clientId;

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { $set: updatedFields },
      { new: true } // Return the updated document
    );

    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json({
      message: 'Project updated successfully',
      project: updatedProject,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params; // Project ID from URL parameters

    const deletedProject = await Project.findByIdAndDelete(id);

    if (!deletedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json({
      message: 'Project deleted successfully',
      project: deletedProject,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = { addProject, updateProject, deleteProject };
