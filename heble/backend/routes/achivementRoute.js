const express = require('express');
const router = express.Router();
const {
    listAchievement,
    getAllAchievements,
    addAchievement,
    updateAchievement,
} = require('../controllers/achivementController');

// Define routes
router.get('/', getAllAchievements);
router.put('/', addAchievement);
router.post('/:id', updateAchievement);

module.exports = router;
