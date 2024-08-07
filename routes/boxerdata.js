const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Boxer = require('../models/Boxer.js');
const cors = require('cors');

router.use(cors());

router.get('/', async (req, res, next) => {
  try {
    const boxerdata = await Boxer.find();
    res.json(boxerdata);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const post = await Boxer.create(req.body);
    res.json(post);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
