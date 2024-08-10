const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Boxer = require('../models/Boxer.js');
const cors = require('cors');

router.use(cors());

// GET all boxers
router.get('/', async (req, res, next) => {
  try {
    const boxerdata = await Boxer.find();
    res.json(boxerdata);
  } catch (err) {
    next(err);
  }
});

// POST a new boxer
router.post('/', async (req, res, next) => {
  try {
    const post = await Boxer.create(req.body);
    res.json(post);
  } catch (err) {
    next(err);
  }
});

// DELETE a boxer by ID
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedBoxer = await Boxer.findByIdAndDelete(id);
    if (!deletedBoxer) {
      return res.status(404).json({ message: 'Boxer not found' });
    }
    res.json({ message: 'Boxer deleted successfully', deletedBoxer });
  } catch (err) {
    next(err);
  }
});

// UPDATE a boxer by ID
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedBoxer = await Boxer.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedBoxer) {
      return res.status(404).json({ message: 'Boxer not found' });
    }
    res.json({ message: 'Boxer updated successfully', updatedBoxer });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
