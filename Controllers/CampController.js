const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Camp = require("../models/Camp");

exports.addcamp = async (req, res) => {
    try {
        const { name, description, location } = req.body;
        console.log(req.body);

        if (!name || !description || !location || !location.latitude || !location.longitude) {
            return res.status(400).json({ message: 'Invalid input data' });
        }

        const newCamp = new Camp({ name, description, location });
        await newCamp.save();
        res.status(201).json(newCamp);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getcamp = async (req, res) => {
    try {
        const camps = await Camp.find();
        res.json(camps);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};