const express = require("express");
const router = express.Router();
const {
  getAllAchievements,
  addAchievement,
  updateAchievement,
  getAchievementById,
} = require("../controllers/achivementController");

// GET metódusok
router.get("/", getAllAchievements);
router.get("/:id", getAchievementById);

// PUT metódusok
router.post("/", addAchievement);

// POST metódusok
router.patch("/:id", updateAchievement);

module.exports = router;
