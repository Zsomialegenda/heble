const express = require('express');
const {
    getLeaderboardByAchievements, 
    getLeaderboardByXP, 
    getLeaderboardByExercise} = require('../controllers/leaderboardController');
const router = express.Router();

router.get('/xp', getLeaderboardByXP);
router.get('/achievements', getLeaderboardByAchievements);
router.get('/exercise/:type', getLeaderboardByExercise);

module.exports = router;