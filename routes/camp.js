const express = require('express');
const router = express.Router();
const {addcamp, getcamp} = require('../Controllers/CampController');

router.post("/addcamp", addcamp);
router.get("/getcamp", getcamp);

module.exports = router;