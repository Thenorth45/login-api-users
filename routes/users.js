const express = require('express');
const {getUsers, createUsers, deleteUser, getUser} = require('../Controllers/UserController');
const router = express.Router();

router.get('/users', getUsers);
router.get('/user/:id', getUser);
router.post('/user', createUsers);
router.put('/user/:id', getUser);
router.delete('/user/:id', deleteUser);