const express = require('express');
const router = express.Router();
const {
    getAllExercises,
    getExerciseByUserID,
    logExerciseAndGainXP,
    statsExercises
} = require('../controllers/exerciseController');

// GET Methods
router.get('/', getAllExercises);
router.get('/:id', getExerciseByUserID);
router.get('/stats/sum', statsExercises);

// POST Methods
router.post('/log', logExerciseAndGainXP);

module.exports = router;
