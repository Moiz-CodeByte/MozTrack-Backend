const mongoose = require('mongoose');

const timesheetSchema = new mongoose.Schema({
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true }, // Reference to project
    timerValue: { type: Number, required: true }, // Timer value in seconds
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Timesheet', timesheetSchema);
