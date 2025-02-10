const { Sequelize } = require("sequelize");
const {
  sequelize,
  User,
  Exercise,
  Achievement,
  UserExperience,
  Token,
  DeletedOrBannedUser,
  UserAchievement,
} = require("../models");
const {
  Code400,
  Code401,
  Code403,
  Code404,
  Code409,
  Code500,
} = require("./statusCodeController");
let reason = []; // Hiba leezeésre

/** getAllAchievements -- vissza ad minden teljesítményt
 *
 * @param {*} req Nincs
 * @param {*} res Lekérdez minden generált teljesíményt | különben szerver hiba
 */
/** getAllAchievements -- Az összes teljesítmény lekérdezése
 *
 * @param {*} req Nem tartalmaz paramétereket
 * @param {*} res Válaszként visszaadja az összes teljesítményt - 200
 * @returns Hibát küld vissza szerverhiba esetén - 500
 */
const getAllAchievements = async (req, res) => {
  try {
    const achievements = await Achievement.findAll();
    res.status(200).json({
      message: "Achievements fetched successfully.",
      üzenet: "Az eredmények sikeresen lekérve.",
      data: achievements,
    });
  } catch (error) {
    reason = [
      "Failed to fetch achievements.",
      "Hiba merült fel az eredmények lekérése közben.",
    ];
    return Code500(error, null, res, null, reason);
  }
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const getAchievementById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      reason = ["Invalid achievement ID.", "Érvénytelen azanositó a teljesitménynek."]
      return Code400(null, null, res, null, reason);
    }

    const achievement = await Achievement.findByPk(id);

    if (!achievement) {
      reason = ["Achievement not found.", "Achievement nem találva."]
      return Code404(null, null, res, null, reason);
    }

    return res.status(200).json(achievement);
  } catch (error) {
    reason = ["Failed to fetch achievement.", "Nem sikerült lekérni a teljesitményt."]
    return Code500(error, null, res, null, reason);
  }
};
/** addAchievement -- Új teljesítmény hozzáadása
 *
 * @param {*} req A kérés törzse tartalmazza az új teljesítmény adatait.
 * @param {*} res A válasz visszaadja a létrehozott teljesítményt - 201
 * @returns Hibát küld vissza szerverhiba - 500
 */
const addAchievement = async (req, res) => {
  const {
    name,
    description,
    pushUpsRequired,
    pullUpsRequired,
    squatsRequired,
    runningRequired,
  } = req.body;

  try {
    const newAchievement = await Achievement.create({
      name,
      description,
      pushUpsRequired: pushUpsRequired || 0,
      pullUpsRequired: pullUpsRequired || 0,
      squatsRequired: squatsRequired || 0,
      runningRequired: runningRequired || 0,
    });

    res.status(201).json({
      message: "Achievement created successfully.",
      üzenet: "Az eredmény sikeresen létrehozva.",
      data: newAchievement,
    });
  } catch (error) {
    reason = [
      "Failed to create achievement.",
      "Hiba merült fel az eredmény létrehozása közben.",
    ];
    return Code500(error, null, res, null, reason);
  }
};

/** updateAchievement -- Létező teljesítmény frissítése
 *
 * @param {*} req A kérés tartalmazza az achievement ID-ját és frissítendő mezőket.
 * @param {*} res A válasz visszaadja a frissített teljesítményt - 200
 * @returns Hibákat küld vissza:
 *              1. Ha az Achievement nem létezik - 404
 *              2. Szerverhiba - 500
 */
const updateAchievement = async (req, res) => {
  const achievementId = req.params.id;
  const {
    name,
    description,
    pushUpsRequired,
    pullUpsRequired,
    squatsRequired,
    runningRequired,
  } = req.body;

  try {
    const achievement = await Achievement.findByPk(achievementId);

    if (!achievement) {
      reason = ["Achievement not found.", "Az eredmény nem található."];
      return Code404(null, null, res, null, reason);
    }

    await achievement.update({
      name,
      description,
      pushUpsRequired: pushUpsRequired || achievement.pushUpsRequired,
      pullUpsRequired: pullUpsRequired || achievement.pullUpsRequired,
      squatsRequired: squatsRequired || achievement.squatsRequired,
      runningRequired: runningRequired || achievement.runningRequired,
    });

    res.status(200).json({
      message: "Achievement updated successfully.",
      üzenet: "Az eredmény sikeresen frissítve.",
      data: achievement,
    });
  } catch (error) {
    reason = [
      "Failed to update achievement.",
      "Hiba merült fel az eredmény frissítése közben.",
    ];
    return Code500(error, null, res, null, reason);
  }
};

/**
 [
  {
    "name": "Push-Up Master",
    "description": "Complete 50 push-ups in total.",
    "pushUpsRequired": 50,
    "pullUpsRequired": 0,
    "squatsRequired": 0,
    "runningRequired": 0
  },
  {
    "name": "Pull-Up Pro",
    "description": "Complete 20 pull-ups in total.",
    "pushUpsRequired": 0,
    "pullUpsRequired": 20,
    "squatsRequired": 0,
    "runningRequired": 0
  },
  {
    "name": "Squat Specialist",
    "description": "Perform 100 squats in total.",
    "pushUpsRequired": 0,
    "pullUpsRequired": 0,
    "squatsRequired": 100,
    "runningRequired": 0
  },
  {
    "name": "Running Rookie",
    "description": "Run 5 kilometers in total.",
    "pushUpsRequired": 0,
    "pullUpsRequired": 0,
    "squatsRequired": 0,
    "runningRequired": 5000
  },
  {
    "name": "Fitness All-Rounder",
    "description": "Complete 20 push-ups, 10 pull-ups, 30 squats, and run 1 kilometer.",
    "pushUpsRequired": 20,
    "pullUpsRequired": 10,
    "squatsRequired": 30,
    "runningRequired": 1
  },
  {
    "name": "Advanced Athlete",
    "description": "Achieve 100 push-ups, 50 pull-ups, 150 squats, and run 10 kilometers.",
    "pushUpsRequired": 100,
    "pullUpsRequired": 50,
    "squatsRequired": 150,
    "runningRequired": 10
  },
  {
    "name": "Marathon Runner",
    "description": "Run a total of 42 kilometers.",
    "pushUpsRequired": 0,
    "pullUpsRequired": 0,
    "squatsRequired": 0,
    "runningRequired": 42
  }
]

 */

module.exports = {
  getAllAchievements,
  getAchievementById,
  addAchievement,
  updateAchievement
};
