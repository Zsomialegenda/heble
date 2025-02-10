const express = require('express');
const router = express.Router();
const {
    getAllExercises,
    getUserExercises,
    getExercise,
    logExerciseAndGainXP,
    statsExercises
} = require('../controllers/exerciseController');

// GET metódusok
router.get('/', getAllExercises);
router.get('/:id', getUserExercises);
router.get('/stats/sum', statsExercises);
router.get('/stats/:name', getExercise);

// POST metódusok
router.post('/log', logExerciseAndGainXP);

module.exports = router;
