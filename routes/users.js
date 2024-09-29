const express = require('express');
const router = express.Router();
const {getUsers, deleteUser, getUser, addboxer} = require('../Controllers/UserController');

router.get('/users', getUsers);
router.get('/getuser/:id', getUser);
router.put('/updateuser/:id', updateUser);
router.delete('/deleteuser/:id', deleteUser);
router.post('/addboxer', addboxer);

module.exports = router;