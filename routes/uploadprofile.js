const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const User = require('../models/Boxer');
const auth = require('../middleware/auth');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

router.post('/', auth, upload.single('file'), async (req, res) => {
    try {
        const filePath = req.file.path;
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ msg: 'User not found' });
        user.profilePictureUrl = filePath;
        await user.save();
        res.json({ url: filePath });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

module.exports = router;
