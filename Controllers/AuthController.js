const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.register = async (req, res) => {
    const { fullname, username, email, password, address, telephone, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ fullname, username, email, password: hashedPassword, address, telephone, role });

    try {
        await user.save();

        res.status(201).json({
            message: 'User registered',
        });
    } catch (err) {
        res.status(400).send(err);
    }
}

exports.login = async (req, res) => {
    const { username, password } = req.body;
    console.log("Request body:", req.body);
    try {
        const user = await User.findOne({ username: username });
        console.log("User found:", user);
        console.log("Username from request:", username);
        if (!user) return res.status(400).send("User Not Found");

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).send("Invalid Credentials");

        const accessToken = jwt.sign(
            { userId: user._id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "5m" }
        );
        const refreshToken = jwt.sign(
            { userId: user._id },
            process.env.REFRESH_TOKEN_SECRET
        );
        res.json({ accessToken, refreshToken, users: user });
    } catch (err) {
        res.status(500).send(err.message);
    }
};


exports.refresh = async (req, res) => {
    const refreshToken = req.body.token;
    if (!refreshToken) return res.sendStatus(401);

    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const newAccessToken = jwt.sign({ userId: decoded.userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5m' });
        res.json({ accessToken: newAccessToken });
    } catch (err) {
        return res.status(403).send("Invalid refresh token");
    }
};
