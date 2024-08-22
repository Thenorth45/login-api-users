const express = require('express');
const router = express.Router();
const User = require('../models/Boxer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

router.use(cors());

router.post('/', async (req, res) => {
  const { fullname, email, password, address, telephone, role } = req.body;
  
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ fullname, email, password: hashedPassword, address, telephone, role });

  try {
    await user.save();

    const token = jwt.sign(
      { _id: user._id, role: user.role },
      { expiresIn: '1h' }
    );

    res.status(201).json({ 
      message: 'User registered', 
      token 
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
