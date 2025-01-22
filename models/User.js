const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    clients: [{ type: mongoose.Schema.Types.ObjectId, 
        ref: 'client' }], // Reference to projects

});

module.exports = mongoose.model('User', userSchema);
