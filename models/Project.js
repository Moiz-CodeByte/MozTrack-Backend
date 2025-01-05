const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to user
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true }, // Reference to client
    timesheets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Timesheet' }], // Reference to timesheets
});

module.exports = mongoose.model('Project', projectSchema);
