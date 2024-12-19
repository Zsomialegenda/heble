const express = require('express');
const router = express.Router();
const exerciseController = require('../controllers/exerciseController');

router.get('/', exerciseController.getAllExercises);
router.get('/:userId', exerciseController.getUserExercises);
router.post('/log', exerciseController.logExercise);

module.exports = router;
