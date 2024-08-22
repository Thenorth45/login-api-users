const express = require('express');
const router = express.Router();
const User = require('../models/Boxer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');

router.use(cors());

router.post('/', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send('Invalid email or password');
    }

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) {
      return res.status(400).send('Invalid email or password');
    }

    const token = jwt.sign(
      { _id: user._id, role: user.role },
      { expiresIn: '1h' }
    );

    res.header('Authorization', 'Bearer ' + token).send({ token, user: { name: user.fullname } });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
