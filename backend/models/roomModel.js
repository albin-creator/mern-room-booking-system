const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  bed: String,
  subtitle: String,
  price: Number,
  description: String,
  images: [String],
});


module.exports = mongoose.model('Room', roomSchema);
