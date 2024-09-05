const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Training = require("../models/Training");

exports.addtraining = async (req, res) => {
    const { user_id, runing, ropejumping, punchingandkicking, weighttraining } = req.body;
    const date = new Date(); // วันที่ปัจจุบัน

    try {
        // ตรวจสอบว่ามีข้อมูลสำหรับวันนั้นอยู่แล้วหรือไม่
        let existingActivity = await Activity.findOne({ user_id, date });

        if (existingActivity) {
            return res.status(400).json({ message: 'กิจกรรมสำหรับวันนี้ได้ถูกบันทึกไว้แล้ว' });
        }

        // ถ้าไม่มี ให้บันทึกกิจกรรมใหม่
        const newActivity = new Activity({
            user_id,
            date,
            runing,
            ropejumping,
            punchingandkicking,
            weighttraining
        });

        await newActivity.save();
        res.status(201).json({ message: 'บันทึกกิจกรรมสำเร็จ', activity: newActivity });
    } catch (error) {
        res.status(500).json({ message: 'เกิดข้อผิดพลาดในการบันทึกกิจกรรม', error });
    }
};

// Get all activities for a user
exports.getTraining = async (req, res) => {
    try {
        const Trainings = await Training.find({ user_id: req.params.userId });
        res.status(200).json(Trainings);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};