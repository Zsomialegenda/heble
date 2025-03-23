const express = require('express');
const router = express.Router();
const {
    getAllUserAchievements,
    getUserAchievements,
    getAchievementStats
} = require('../controllers/userAchivementController');

// GET metódusok
router.get('/', getAllUserAchievements);
router.get('/:id', getUserAchievements);
router.get('/stats/sum', getAchievementStats)

module.exports = router;
