const mongoose = require('mongoose');

const TrainingSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Users' },
    runing: { type: Number, default: 0 },
    ropejumping: { type: Number, default: 0 },
    punchingandkicking: { type: Number, default: 0 },
    weighttraining: { type: Number, default: 0 },
    updated_at: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Training', TrainingSchema)