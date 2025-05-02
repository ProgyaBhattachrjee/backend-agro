const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  auth0Id: { type: String, required: true, unique: true },
  name: String,
  email: String,
  fields: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Field' }]
});

module.exports = mongoose.model('User', UserSchema);
