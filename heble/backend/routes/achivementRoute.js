const express = require("express");
const router = express.Router();
const {
  getAllAchievements,
  addAchievement,
  updateAchievement,
  getAchievementById,
} = require("../controllers/achivementController");
const authenticator = require("../utils/authenticator");

// GET metódusok
router.get("/", getAllAchievements);
router.get("/:id?", getAchievementById);

// POST metódusok
router.post("/", authenticator, addAchievement);

// PATCH metódusok
router.patch("/:id?", authenticator, updateAchievement);

module.exports = router;
