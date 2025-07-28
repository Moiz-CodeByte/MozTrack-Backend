const Timesheet = require('../models/Timesheet');
const Project = require('../models/Project');



const addTime = async (req, res) => {
    const { project, timerValue, name, createdAt } = req.body;

    try {
        // Validate required fields
        if (!project) {
            return res.status(400).json({ message: 'Project is required' });
        }
        if (!name) {
            return res.status(400).json({ message: 'Task name is required' });
        }
        if (timerValue === undefined) {
            return res.status(400).json({ message: 'Timer value is required' });
        }

        const projectObj = await Project.findById(project);

        if (!projectObj) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // Create timesheet data with required fields
        const timesheetData = { 
            project, 
            name, 
            timerValue 
        };
        
        // Add createdAt if provided and valid
        if (createdAt) {
            // Validate createdAt is a valid date
            const dateObj = new Date(createdAt);
            if (isNaN(dateObj.getTime())) {
                return res.status(400).json({ message: 'Invalid date format for createdAt' });
            }
            timesheetData.createdAt = createdAt;
        }

        const timesheet = new Timesheet(timesheetData);
        await timesheet.save();

        // Add timesheet to project
        projectObj.timesheets.push(timesheet._id);
        await projectObj.save();

        res.status(201).json({ message: 'Timesheet entry added', timesheet });
        console.log('Timesheet entry added', timesheet);
    } catch (error) {
        console.error('Error adding timesheet:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const updateTime = async (req, res) => {
    const { id } = req.params; // Timesheet ID from URL
    const { timerValue, createdAt } = req.body; // New timer value and optional createdAt
  
    try {
      // Check if at least one field is provided for update
      if (!timerValue && !createdAt) {
        return res.status(400).json({ message: 'At least one field (timerValue or createdAt) is required for update' });
      }
      
      // Create update object with provided fields
      const updateData = {};
      
      // Add timerValue to update if provided
      if (timerValue !== undefined) {
        updateData.timerValue = timerValue;
      }
      
      // Add createdAt to update if provided
      if (createdAt) {
        // Validate createdAt is a valid date
        const dateObj = new Date(createdAt);
        if (isNaN(dateObj.getTime())) {
          return res.status(400).json({ message: 'Invalid date format for createdAt' });
        }
        updateData.createdAt = createdAt;
      }
  
      const updatedTimesheet = await Timesheet.findByIdAndUpdate(
        id,
        updateData,
        { new: true } // Return the updated document
      );
  
      if (!updatedTimesheet) {
        return res.status(404).json({ message: 'Timesheet not found' });
      }
  
      res.status(200).json({ message: 'Timesheet updated successfully', timesheet: updatedTimesheet });
    } catch (error) {
      console.error('Error updating timesheet:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
  const deleteTime = async (req, res) => {
    const { id } = req.params; // Timesheet ID from URL
  
    try {
      const timesheet = await Timesheet.findById(id);
  
      if (!timesheet) {
        return res.status(404).json({ message: 'Timesheet not found' });
      }
  
      // Remove reference from the project
      const project = await Project.findById(timesheet.project);
      if (project) {
        project.timesheets = project.timesheets.filter(tsId => tsId.toString() !== id);
        await project.save();
      }
  
      await timesheet.deleteOne();
  
      res.status(200).json({ message: 'Timesheet deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };

const getUserTimesheets = async (req, res) => {
  try {
    const userId = req.user.id; // Extract user ID from the authenticated token

    // Find all projects for the logged-in user
    const projects = await Project.find({ user: userId }).select('_id');

    if (projects.length === 0) {
      return res.status(404).json({ message: 'No projects found for this user' });
    }

    // Extract project IDs
    const projectIds = projects.map((project) => project._id);

    // Find all timesheets linked to the user's projects
    const timesheets = await Timesheet.find({ project: { $in: projectIds } });

    res.status(200).json({
      message: 'Timesheets retrieved successfully',
      timesheets,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

  
module.exports = {addTime, updateTime, deleteTime, getUserTimesheets};