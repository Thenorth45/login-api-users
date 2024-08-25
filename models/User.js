const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    fullname: { type: String, required: false },
    email: { type: String, required: false, unique: true },
    username: {type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, required: false },
    telephone: { type: String, required: false },
    profilePictureUrl: { type: String, required: false },
    role: { type: String, required: false, enum: ['ผู้ดูแลระบบ', 'ผู้ใช้ทั่วไป', 'ครูมวย', 'ผู้จัดการค่ายมวย', 'นักมวย'] },
    updated_at: { type: Date, default: Date.now }
})

module.exports = mongoose.model('User', UserSchema)