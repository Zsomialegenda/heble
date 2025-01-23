const express = require('express');
const router = express.Router();
const {
    getAllAchievements,
    getUserAchievements,
    getAchievementStats,
    getLeaderboardByAchievements
} = require('../controllers/userAchivementController');

// GET Methods
router.get('/', getAllAchievements);
router.get('/:userId', getUserAchievements);
router.get('/leaderboard/achivements', getLeaderboardByAchievements);
// router.get('/assign/:userId', );
router.get('/stats/sum', getAchievementStats)

module.exports = router;
