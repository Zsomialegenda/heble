const express = require('express');
const router = express.Router();
const {
    getAllAchievements,
    addAchievement,
    updateAchievement,
    getAchievementById,
} = require('../controllers/achivementController');

// GET metódusok
router.get('/', getAllAchievements);
router.get('/:id', getAchievementById);

// PUT metódusok
router.put('/', addAchievement);

// POST metódusok
router.post('/:id', updateAchievement);

module.exports = router;
