const express = require('express');
const router = express.Router();
const {getUsers, deleteUser, getUser} = require('../Controllers/UserController');

router.get('/users', getUsers);
router.get('/user/:id', getUser);
router.put('/user/:id', getUser);
router.delete('/user/:id', deleteUser);

module.exports = router;