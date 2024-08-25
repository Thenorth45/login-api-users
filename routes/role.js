const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middlewares/auth');

router.get('/admin', authenticate, authorize(['ผู้ดูแลระบบ']), (req, res) => {
    res.send('Admin Content');
});

router.get('/user', authenticate, authorize(['ผู้ใช้ทั่วไป']), (req, res) => {
    res.send('User Content');
});

router.get('/trainer', authenticate, authorize(['ครูมวย']), (req, res) => {
    res.send('Trainer Content');
});

router.get('/manager', authenticate, authorize(['ผู้จัดการค่ายมวย']), (req, res) => {
    res.send('Manager Content');
});

router.get('/boxer', authenticate, authorize(['นักมวย']), (req, res) => {
    res.send('Boxer Content');
});

module.exports = router;
