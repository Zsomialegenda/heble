const express = require("express");
const {
  getLeaderboardByAchievements,
  getLeaderboardByXP,
  getLeaderboardByExercise,
} = require("../controllers/leaderboardController");
const router = express.Router();

// GET metódusok
router.get("/xp", getLeaderboardByXP);
router.get("/achievements", getLeaderboardByAchievements);
router.get("/exercise/:name", getLeaderboardByExercise);

module.exports = router;
