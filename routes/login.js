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
      '2bfaf34cecd96c55bd5e95566ea96294c28aaf66161c5cbcbca705eb21f5f39b15f49b1dc22b5ebab71414c6a7c40ab6ff950615e8b2bdc31ec3d66d945ca2a6',
      { expiresIn: '1h' }
    );

    res.header('Authorization', 'Bearer ' + token).send({ token, user: { name: user.fullname } });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
