const express = require('express');
const router = express.Router();
const {
    getAllAchievements,
    getUserAchievements,
} = require('../controllers/userAchivementController');

// GET Methods
router.get('/', getAllAchievements);
router.get('/:userId', getUserAchievements);
router.get('/assign/:userId')

module.exports = router;
