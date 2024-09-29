const mongoose = require('mongoose');

const RunActivityDetailsSchema = new mongoose.Schema({
    start_time: { type: Date, required: false },  // เวลาที่เริ่มซ้อม
    end_time: { type: Date, required: false },    // เวลาสิ้นสุดการซ้อม
    duration: { type: Number, required: false },  // ระยะเวลาที่ซ้อม (นาที)
    distance: { type: Number, default: 0 }       // ระยะทางคิดเป็นกิโลเมตร (optional)
});

const RopejumpingActivityDetailsSchema = new mongoose.Schema({
    start_time: { type: Date, required: false },  // เวลาที่เริ่มซ้อม
    end_time: { type: Date, required: false },    // เวลาสิ้นสุดการซ้อม
    duration: { type: Number, required: false },  // ระยะเวลาที่ซ้อม (นาที)
    count: { type: Number, default: 0 }       // จำนวนครั้ง
});

const punchingandkickingActivityDetailsSchema = new mongoose.Schema({
    start_time: { type: Date, required: false },  // เวลาที่เริ่มซ้อม
    end_time: { type: Date, required: false },    // เวลาสิ้นสุดการซ้อม
    duration: { type: Number, required: false },  // ระยะเวลาที่ซ้อม (นาที)
    count: { type: Number, default: 0 }       // จำนวนครั้ง
});

const weighttrainingActivityDetailsSchema = new mongoose.Schema({
    start_time: { type: Date, required: false },  // เวลาที่เริ่มซ้อม
    end_time: { type: Date, required: false },    // เวลาสิ้นสุดการซ้อม
    duration: { type: Number, required: false },  // ระยะเวลาที่ซ้อม (นาที)
    count: { type: Number, default: 0 }       // จำนวนครั้ง
});

const TrainingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    running: { type: RunActivityDetailsSchema, default: null },
    ropeJumping: { type: RopejumpingActivityDetailsSchema, default: null },
    punching: { type: punchingandkickingActivityDetailsSchema, default: null },
    weightTraining: { type: weighttrainingActivityDetailsSchema, default: null },
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Training', TrainingSchema);
