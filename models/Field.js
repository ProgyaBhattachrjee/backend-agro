const mongoose = require('mongoose');

const FieldSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  location: {
    lat: Number,
    lng: Number,
    region: String
  },
  crop: String,
  diseases: [String],
  yield: Number
});

module.exports = mongoose.model('Field', FieldSchema);
