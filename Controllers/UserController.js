const Users = require('../models/User.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const express = require('express');
const Camp = require('../models/Camp.js')

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
exports.deleteUser =  async (req, res) => {
    try {
        const { id } = req.params._id;
        const deletedUser = await Users.findById(id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
            Users.findByIdAndDelete(id);
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

//Update
exports.getUser =  async (req, res) => {
    try {
        const { id } = req.params._id;
        const user = await Users.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
            const data = {$set: [req.body]};
            Users.findByIdAndUpdate(id, data);
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

//FindByID
exports.getUser =  async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await Users.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
            res.json(user);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.addboxer = async (req, res) => {
    const { campId, boxerUsername } = req.body;
  
    try {
      // ตรวจสอบการมีอยู่ของค่ายมวย
      const camp = await Camp.findById(campId);
      if (!camp) {
        return res.status(404).json({ error: 'ค่ายมวยไม่พบ' });
      }
  
      // ตรวจสอบการมีอยู่ของนักมวย
      const boxer = await Users.findOne({ username: boxerUsername });
      if (!boxer) {
        return res.status(404).json({ error: 'นักมวยไม่พบ' });
      }
  
      // ตรวจสอบว่านักมวยมีบทบาทเป็น 'นักมวย'
      if (boxer.role !== 'นักมวย') {
        return res.status(400).json({ error: 'บทบาทของผู้ใช้ไม่ใช่นักมวย' });
      }
  
      // เพิ่มนักมวยไปยังค่ายมวย (คุณอาจจะต้องสร้าง field ใหม่ใน CampSchema เพื่อจัดเก็บนักมวย)
      // สมมติว่าคุณมี field 'boxers' เป็น array ของ usernames ใน CampSchema
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