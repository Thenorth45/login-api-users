const Users = require('../models/User.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const express = require('express');
const Camp = require('../models/Camp.js');
const mongoose = require('mongoose');

//Getall
exports.getUsers = async (req, res) => {

    try {
        const users = await Users.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//Delete
exports.deleteUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const result = await Users.findByIdAndDelete(userId);
        if (!result) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

//Update
exports.updateUser = async (req, res) => {
    try {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }

        const updatedData = req.body;

        if (!updatedData.fullname || !updatedData.email || !updatedData.username || !updatedData.address || !updatedData.telephone) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const updatedUser = await Users.findByIdAndUpdate(id, { $set: updatedData }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


//FindByID
exports.getUser = async (req, res) => {
    try {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }

        const user = await Users.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.addboxer = async (req, res) => {
    const { campId, boxerUsername } = req.body;

    try {
        const camp = await Camp.findById(campId);
        if (!camp) {
            return res.status(404).json({ error: 'ค่ายมวยไม่พบ' });
        }

        const boxer = await Users.findOne({ username: boxerUsername });
        if (!boxer) {
            return res.status(404).json({ error: 'นักมวยไม่พบ' });
        }

        if (boxer.role !== 'นักมวย') {
            return res.status(400).json({ error: 'บทบาทของผู้ใช้ไม่ใช่นักมวย' });
        }

        camp.boxers = camp.boxers || [];
        if (camp.boxers.includes(boxerUsername)) {
            return res.status(400).json({ error: 'นักมวยนี้ได้ถูกเพิ่มไปแล้ว' });
        }
        camp.boxers.push(boxerUsername);
        await camp.save();

        res.status(200).json({ message: 'เพิ่มนักมวยสำเร็จ' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'เกิดข้อผิดพลาดในการเพิ่มนักมวย' });
    }
};