const express = require('express');
const router = express.Router();
const exerciseController = require('../controllers/exerciseController');

router.get('/exercises/:id', exerciseController.getUserExercises);

router.post('/exercises/log', exerciseController.logExercise);

module.exports = router;
