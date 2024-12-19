const express = require('express');
const userAchievementController = require('../controllers/userAchivementController');

const router = express.Router();

router.get('/', userAchievementController.getAllAchievements);

router.get('/:userId', userAchievementController.getUserAchievements);

module.exports = router;
