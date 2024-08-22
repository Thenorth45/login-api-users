const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const BoxerSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: {type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, required: false },
    telephone: { type: String, required: false },
    profilePictureUrl: { type: String },
    role: { type: String, required: true, enum: ['ผู้ดูแลระบบ', 'ผู้ใช้ทั่วไป', 'ครูมวย', 'ผู้จัดการค่ายมวย', 'นักมวย'] },
    updated_at: { type: Date, default: Date.now }
})

// Pre-save middleware to hash password
BoxerSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

module.exports = mongoose.model('Boxer', BoxerSchema)