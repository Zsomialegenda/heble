const express = require('express');
const router = express.Router();
const {
    getAllAchievements,
    getUserAchievements,
    statsAchievements,
} = require('../controllers/userAchivementController');

// GET Methods
router.get('/', getAllAchievements);
router.get('/:userId', getUserAchievements);
// router.get('/assign/:userId', );
router.get('/stats/sum', statsAchievements)

module.exports = router;
