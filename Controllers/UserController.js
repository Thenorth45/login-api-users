const Users = require('../models/User.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const express = require('express');

//Getall
exports.getUsers = async (req, res) => {

    try {
        const users = await Users.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//Delete
exports.deleteUser =  async (req, res) => {
    try {
        const { id } = req.params._id;
        const deletedUser = await Users.findById(id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
            Users.findByIdAndDelete(id);
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

//Update
exports.getUser =  async (req, res) => {
    try {
        const { id } = req.params._id;
        const user = await Users.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
            const data = {$set: [req.body]};
            Users.findByIdAndUpdate(id, data);
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

//FindByID
exports.getUser =  async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await Users.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
            res.json(user);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};