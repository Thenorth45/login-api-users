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
            return res.status(400).send('Username is required');
        }

        const userId = await User.getUserIdByUsername(username);

        // Create a new training object using the data from the request body
        const newTraining = new Training({
            userId: userId, // Convert string to ObjectId
            runing: running ? {
                start_time: new Date(running.start_time),
                end_time: new Date(running.end_time),
                duration: running.duration,
                distance: running.distance
            } : null,
            ropejumping: ropeJumping ? {
                start_time: new Date(ropeJumping.start_time),
                end_time: new Date(ropeJumping.end_time),
                duration: ropeJumping.duration,
                count: ropeJumping.count
            } : null,
            punchingandkicking: punching ? {
                start_time: new Date(punching.start_time),
                end_time: new Date(punching.end_time),
                duration: punching.duration,
                count: punching.count
            } : null,
            weighttraining: weightTraining ? {
                start_time: new Date(weightTraining.start_time),
                end_time: new Date(weightTraining.end_time),
                duration: weightTraining.duration,
                count: weightTraining.count
            } : null
        });

        // Save the training document to the database
        await newTraining.save();

        // Send a success response
        res.status(201).json({ message: 'Training data saved successfully!' });
    } catch (error) {
        console.error('Error saving training data:', error);
        res.status(500).json({ message: 'An error occurred while saving training data.' });
    }
};

// Get all activities for a user
exports.getTraining = async (req, res) => {
    try {
        // Find all training records
        const activities = await Training.find()
            .populate('userId', 'name') // Populate the 'userId' field with the 'name' from User model
            .exec();

        // Map the result to include the user's name
        const activitiesWithUserNames = activities.map(activity => ({
            ...activity.toObject(), // Convert the Mongoose document to a plain object
            userName: activity.userId.name // Add the user's name
        }));

        res.status(200).json(activitiesWithUserNames);
    } catch (error) {
        console.error('Error fetching activities:', error);
        res.status(500).send('Error fetching activities');
    }
};