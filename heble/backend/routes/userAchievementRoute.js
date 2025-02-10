const express = require('express');
const router = express.Router();
const {
    getAllAchievements,
    getUserAchievements,
    getAchievementStats
} = require('../controllers/userAchivementController');

// GET metódusok
router.get('/', getAllAchievements);
router.get('/:id', getUserAchievements);
router.get('/stats/sum', getAchievementStats)

module.exports = router;
