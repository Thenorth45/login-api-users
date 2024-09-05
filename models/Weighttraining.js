const mongoose = require('mongoose');

const WeighttrainingSchema = new mongoose.Schema({
    count: { type: String, required: false },
    usetime: { type: Timestamp, required: false },
    updated_at: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Weighttraining', WeighttrainingSchema)