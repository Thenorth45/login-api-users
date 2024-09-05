const mongoose = require('mongoose');

const CampSchema = new mongoose.Schema({
    name: { type: String, required: false },
    description: { type: String, required: false },
    location: {
        latitude: Number,
        longitude: Number,
    },
    updated_at: { type: Date, default: Date.now }
})

module.exports = mongoose.model('CampSchema', CampSchema)