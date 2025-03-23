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
} = require("../utils/statusCode");
let reason = []; // Hiba leezeésre

/** getAllAchievements -- Az összes teljesítmény lekérdezése
 *
 * @param {*} req Nem tartalmaz paramétereket
 * @param {*} res Válaszként visszaadja az összes teljesítményt - 200
 * @returns Hibát küld vissza szerverhiba esetén - 500
 */
const getAllAchievements = async (req, res) => {
  try {
    const achievements = await Achievement.findAll();
    return res.status(200).json({
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

/** getAchievementById -- Az adott teljesítmény lekérdezése
 *
 * @param {*} req Paraméterként az adott teljesítmény id-jét adja meg
 * @param {*} res Válaszként visszaadja az adott teljesítményt - 200
 * @returns Hibát küld ha:
 *          1. Nem szám az id - 400
 *          2. Nem található az achievement - 404
 *          3. Szerverhiba - 500
 */
const getAchievementById = async (req, res) => {
  try {
    const achievementId = parseInt(req.params.id, 10);

    if (isNaN(achievementId)) {
      reason = [
        "Invalid achievement ID.",
        "Érvénytelen azonosító a teljesítménynek.",
      ];
      return Code400(null, req, res, null, reason);
    }

    const achievement = await Achievement.findByPk(achievementId);

    if (!achievement) {
      reason = ["Achievement not found.", "Achievement nem találva."];
      return Code404(null, req, res, null, reason);
    }

    return res.status(200).json(achievement);
  } catch (error) {
    reason = [
      "Failed to fetch achievement.",
      "Nem sikerült lekérni a teljesítményt.",
    ];
    return Code500(error, req, res, null, reason);
  }
};

/** addAchievement -- Új teljesítmény hozzáadása
 *
 * @param {*} req A kérés törzse tartalmazza az új teljesítmény adatait.
 * @param {*} res A válasz visszaadja a létrehozott teljesítményt - 201
 * @returns Hibát küld ha:
 *          1. Nincs adat a kérésben - 400
 *          2. Rosszak az adatok - 400
 *          3. Szerverhiba - 500
 */
const addAchievement = async (req, res) => {
  const {
    name,
    description,
    pushUpsRequired = 0,
    pullUpsRequired = 0,
    sitUpsRequired = 0,
    squatsRequired = 0,
    runningRequired = 0,
  } = req.body;

  if (!name || !description) {
    const reason = [
      "Name and description are required.",
      "A név és a leírás megadása kötelező.",
    ];
    return Code400(null, null, res, null, reason);
  }

  if (
    isNaN(pushUpsRequired) ||
    pushUpsRequired < 0 ||
    isNaN(pullUpsRequired) ||
    pullUpsRequired < 0 ||
    isNaN(sitUpsRequired) ||
    sitUpsRequired < 0 ||
    isNaN(squatsRequired) ||
    squatsRequired < 0 ||
    isNaN(runningRequired) ||
    runningRequired < 0
  ) {
    const reason = [
      "Invalid values provided. All exercise requirements must be non-negative numbers.",
      "Érvénytelen értékek. Minden gyakorlatkövetelménynek nem negatív számnak kell lennie.",
    ];
    return Code400(null, null, res, null, reason);
  }

  try {
    const newAchievement = await Achievement.create({
      name,
      description,
      pushUpsRequired,
      pullUpsRequired,
      sitUpsRequired,
      squatsRequired,
      runningRequired,
    });

    return res.status(201).json({
      message: "Achievement created successfully.",
      üzenet: "Az eredmény sikeresen létrehozva.",
      data: newAchievement,
    });
  } catch (error) {
    const reason = [
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
  const achievementId = parseInt(req.params.id, 10);

  if (isNaN(achievementId)) {
    reason = ["Invalid achievement ID.", "Érvénytelen teljesitmény azonosító."];
    return Code400(null, null, res, null, reason);
  }

  const {
    name,
    description,
    pushUpsRequired,
    pullUpsRequired,
    sitUpsRequired,
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
      sitUpsRequired: sitUpsRequired || achievement.sitUpsRequired,
      squatsRequired: squatsRequired || achievement.squatsRequired,
      runningRequired: runningRequired || achievement.runningRequired,
    });

    return res.status(200).json({
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

module.exports = {
  getAllAchievements,
  getAchievementById,
  addAchievement,
  updateAchievement,
};
