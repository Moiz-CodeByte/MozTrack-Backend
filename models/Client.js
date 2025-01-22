// const mongoose = require('mongoose');

// const ClientSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true },
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Link to User
// });

// module.exports = mongoose.model('Client', ClientSchema);
const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true},  // Remove the unique constraint here
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Link to User
});

module.exports = mongoose.model('Client', ClientSchema);
