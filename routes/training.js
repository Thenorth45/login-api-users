const express = require('express');
const router = express.Router();
const {addtraining, getTraining} = require('../Controllers/TrainingController');

router.post("/addtraining", addtraining);
router.get("/gettraining", getTraining);

module.exports = router;