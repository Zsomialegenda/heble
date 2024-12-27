const express = require('express');
const router = express.Router();
const {
    getAllExercises,
    getExerciseByUserID,
    logExerciseAndGainXP
} = require('../controllers/exerciseController');

// GET Methods
router.get('/', getAllExercises);
router.get('/:id', getExerciseByUserID);

// POST Methods
router.post('/log', logExerciseAndGainXP);

module.exports = router;
