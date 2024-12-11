const express = require('express');
const router = express.Router();
const achievementController = require('../controllers/achivementController');

router.get('/achievements', achievementController.getAllAchievements);

router.post('/achievements', achievementController.addAchievement);

router.put('/achievements/:id', achievementController.updateAchievement);

router.get('/achievements/user/:userId', achievementController.listAchivements);

module.exports = router;
