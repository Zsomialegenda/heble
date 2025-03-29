const express = require("express");
const router = express.Router();
const {
  getAllExercises,
  getUserExercises,
  getExercise,
  logExercise,
  statsExercises,
} = require("../controllers/exerciseController");
const authenticator = require("../utils/authenticator");

// GET metódusok
router.get("/", getAllExercises);
router.get("/:id?", getUserExercises);
router.get("/stats/sum", statsExercises);
router.get("/stats/:type", getExercise);

// POST metódusok
router.post("/log", authenticator, logExercise);

module.exports = router;
