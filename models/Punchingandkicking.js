const mongoose = require('mongoose');

const PunchingandkickingSchema = new mongoose.Schema({
    count: { type: String, required: false },
    usetime: { type: Timestamp, required: false },
    updated_at: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Punchingandkicking', PunchingandkickingSchema)