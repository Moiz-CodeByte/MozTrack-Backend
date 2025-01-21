const Timesheet = require('../models/Timesheet');
const Project = require('../models/Project');



const addTime = async (req, res) => {
    const { projectId, timerValue } = req.body;

    try {
        const project = await Project.findById(projectId);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        const timesheet = new Timesheet({ project: projectId, timerValue });
        await timesheet.save();

        // Add timesheet to project
        project.timesheets.push(timesheet._id);
        await project.save();

        res.status(201).json({ message: 'Timesheet entry added', timesheet });
        console.log('Timesheet entry added', timesheet)
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = {addTime};