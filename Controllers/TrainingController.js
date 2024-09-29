const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Training = require("../models/Training");
const mongoose = require('mongoose');
const User = require('../models/User');



exports.addtraining = async (req, res) => {
    try {
        const { username, running, ropeJumping, punching, weightTraining } = req.body;

        if (!username) {
            return res.status(400).json({ message: 'Username is required' });
        }

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const existingTraining = await Training.findOne({
            userId: user._id,
            updated_at: { $gte: today }
        });

        if (existingTraining) {
            return res.status(409).json({ message: 'Activity for today has already been recorded.' });
        }

        const newTraining = new Training({
            userId: user._id,
            running: running && {
                start_time: new Date(running.start_time),
                end_time: new Date(running.end_time),
                duration: running.duration,
                distance: running.distance
            },
            ropeJumping: ropeJumping && {
                start_time: new Date(ropeJumping.start_time),
                end_time: new Date(ropeJumping.end_time),
                duration: ropeJumping.duration,
                count: ropeJumping.count
            },
            punching: punching && {
                start_time: new Date(punching.start_time),
                end_time: new Date(punching.end_time),
                duration: punching.duration,
                count: punching.count
            },
            weightTraining: weightTraining && {
                start_time: new Date(weightTraining.start_time),
                end_time: new Date(weightTraining.end_time),
                duration: weightTraining.duration,
                count: weightTraining.count
            },
            updated_at: new Date()
        });

        await newTraining.save();
        res.status(201).json({ message: 'Training data saved successfully!' });
    } catch (error) {
        console.error('Error saving training data:', error);
        res.status(500).json({ message: 'An error occurred while saving training data.' });
    }
};



exports.getTraining = async (req, res) => {
    try {
        const activities = await Training.find()
            .populate('userId', 'name')
            .exec();

        const activitiesWithUserNames = activities.map(activity => ({
            ...activity.toObject(),
            userName: activity.userId.name
        }));

        res.status(200).json(activitiesWithUserNames);
    } catch (error) {
        console.error('Error fetching activities:', error);
        res.status(500).send('Error fetching activities');
    }
};