const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    path: { type: String, required: false },
  });

module.exports = mongoose.model('Image', ImageSchema);
