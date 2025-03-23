const jwt = require("jsonwebtoken");
require("dotenv").config();
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

const SECRET_KEY = process.env.SECRET_KEY || "admin";

const { assignAchievements } = require("../utils/checkAchievements");

/** getAllExercises -- Az összes gyakorlat lekérdezése
 *
 * @param {*} req Nem tartalmaz paramétereket.
 * @param {*} res Válaszként visszaadja az összes gyakorlatot - 200
 * @returns Hibát küld vissza szerverhiba - 500
 */
const getAllExercises = async (req, res) => {
  try {
    const exercises = await Exercise.findAll();
    return res.status(200).json({
      message: "All exercises fetched successfully.",
      üzenet: "Az összes gyakorlat sikeresen lekérve.",
      data: exercises,
    });
  } catch (error) {
    reason = [
      "Failed to fetch exercises.",
      "Hiba merült fel a gyakorlatok lekérése közben.",
    ];
    return Code500(error, null, res, null, reason);
  }
};

/** getExercise -- visssza adja  az összesitett számát egy gyakorlatnak.
 *
 * @param {*} req BBevitelnek a gyakorlat tipusa
 * @param {*} res Vissza adja a megadott gyakorlat összesitett számát - 200
 * @returns Hibákat küld vissza:
 *              1. Ha a gyakorlat érvénytelen - 400
 *              2. Szerverhiba - 500
 */
const getExercise = async (req, res) => {
  try {
    const name = req.params.type;

    const validFields = ["pushUps", "pullUps", "sitUps", "squats", "running"];

    if (!validFields.includes(name)) {
      reason = ["Invalid exercise type.", "Nem megfelelő gyakorlat típus."];
      return Code400(null, null, res, null, reason);
    }

    const total = await Exercise.sum(name);

    return res.status(200).json({
      status: 200,
      exerciseName: name,
      total,
      message: `Total ${name} performed: ${total}`,
      üzenet: `Összes ${name}: ${total}`,
    });
  } catch (error) {
    reason = [
      "Error retrieving exercise data.",
      "Hiba történt a gyakorlatok lekérésekor.",
    ];
    return Code500(error, null, res, null, reason);
  }
};

/** getUserExercises -- Egy felhasználó gyakorlatai
 *
 * @param {*} req Az üzenet tartalmazza a `userId` paramétert az URL-ben.
 * @param {*} res Válaszként visszaadja a felhasználó gyakorlatait - 200
 * @returns Hibákat küld vissza:
 *              1. Ha a userId érvénytelen - 400
 *              2. Ha nincs találat - 404
 *              3. Szerverhiba - 500
 */
const getUserExercises = async (req, res) => {
  const userId = parseInt(req.params.id, 10);

  if (isNaN(userId)) {
    reason = ["Invalid user ID.", "Érvénytelen felhasználói azonosító."];
    return Code400(null, null, res, null, reason);
  }

  try {
    const exercises = await Exercise.findOne({ where: { userId } });
    if (exercises.length === 0) {
      reason = [
        "No exercises found for this user.",
        "Nincsenek gyakorlatok ehhez a felhasználóhoz.",
      ];
      return Code404(null, null, res, null, reason);
    }
    return res.status(200).json({
      message: "User exercises fetched successfully.",
      üzenet: "A felhasználó gyakorlatai sikeresen lekérve.",
      data: exercises,
    });
  } catch (error) {
    reason = [
      "An error occurred while fetching exercises.",
      "Hiba történt a gyakorlatok lekérése közben.",
    ];
    return Code500(error, null, res, null, reason);
  }
};

/** logExerciseAndGainXP -- Gyakorlat rögzítése és XP növelése
 *
 * @param {*} req userId, pushUps, pullUps, sitUps, squats, running - szzámok
 * @param {*} res Válaszként visszaadja a frissített adatokat és az újonnan szerzett achievementeket - 200
 * @returns Hibákat küld vissza:
 *              1. Ha nincs a token - 401
 *              2. Nem megfelelő az ID - 400
 *              3. Nem saját táblára töltünk fel adatot - 403
 *              4. Nem meggfelelő az adat(formátum) - 400
 *              5. Nem megfelelő a token - 401
 *              6. Belső szerver hiba - 5000
 */
const logExerciseAndGainXP = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    reason = ["Token not provided.", "A token nincs megadva."];
    return Code404(null, req, res, next, reason);
  }

  let decoded;
  try {
    decoded = jwt.verify(token, SECRET_KEY);
  } catch (error) {
    reason = [
      "Invalid token. Please log in again.",
      "Érvénytelen token. Kérjük, jelentkezzen be újra.",
    ];
    return Code401(error, req, res, next, reason);
  }

  const { pushUps, pullUps, sitUps, squats, running } = req.body;
  const requestUserId = Number(decoded.userId);
  const isAdmin = decoded.isAdmin || false;
  const userId = parseInt(decoded.userId, 10);

  if (isNaN(userId)) {
    reason = ["Invalid user ID.", "Érvénytelen felhasználói azonosító."];
    return Code400(null, req, res, next, reason);
  }

  if (!isAdmin && requestUserId !== userId) {
    reason = [
      "You can only log exercises for your own account.",
      "Csak a saját fiókjára rögzítheti a gyakorlatokat.",
    ];
    return Code403(null, req, res, next, reason);
  }

  if (
    pushUps === undefined &&
    pullUps === undefined &&
    sitUps === undefined &&
    squats === undefined &&
    running === undefined
  ) {
    reason = [
      "Exercise not found for this user!",
      "Gyakorlat nem található ehhez a felhasználóhoz!",
    ];
    return Code404(null, req, res, next, reason);
  }

  try {
    const [exercise] = await Exercise.findOrCreate({
      where: { userId },
      defaults: {
        userId,
        pushUps: 0,
        pullUps: 0,
        sitUps: 0,
        squats: 0,
        running: 0,
      },
    });

    const [userExperience] = await UserExperience.findOrCreate({
      where: { userId },
      defaults: { userId, level: 1, xp: 0, xpToNextLevel: 100 },
    });

    const xpMultipliers = {
      pushUps: 10,
      pullUps: 15,
      sitUps: 5,
      squats: 5,
      running: 50,
    };

    const totalXpGained =
      (pushUps || 0) * xpMultipliers.pushUps +
      (pullUps || 0) * xpMultipliers.pullUps +
      (sitUps || 0) * xpMultipliers.sitUps +
      (squats || 0) * xpMultipliers.squats +
      (running || 0) * xpMultipliers.running;

    Object.assign(exercise, {
      pushUps: exercise.pushUps + (pushUps || 0),
      pullUps: exercise.pullUps + (pullUps || 0),
      sitUps: exercise.sitUps + (sitUps || 0),
      squats: exercise.squats + (squats || 0),
      running: exercise.running + (running || 0),
    });
    await exercise.save();

    let { xp, level, xpToNextLevel } = userExperience;
    xp += totalXpGained;

    while (xp >= xpToNextLevel) {
      xp -= xpToNextLevel;
      level++;
      xpToNextLevel = Math.floor(xpToNextLevel * 1.3);
    }

    await userExperience.update({ xp, level, xpToNextLevel });

    const newAchievements = await assignAchievements(userId);

    return res.status(200).json({
      message: "Exercise logged and XP gained successfully.",
      üzenet: "Gyakorlat rögzítve és XP sikeresen hozzáadva.",
      exerciseData: { ...exercise.get() },
      xpData: {
        currentLevel: level,
        currentXp: xp,
        xpToNextLevel,
        xpGained: totalXpGained,
      },
      achievements: newAchievements.map((ach) => ({
        id: ach.id,
        name: ach.name,
        description: ach.description,
      })),
    });
  } catch (error) {
    reason = [
      "An error occurred while logging exercise and gaining XP.",
      "Hiba történt a gyakorlat rögzítése és az XP hozzáadása közben.",
    ];
    return Code500(error, req, res, next, reason);
  }
};

/** statsExercises -- Összesített statisztikák
 *
 * @param {*} req Nem tartalmaz paramétereket
 * @param {*} res Válaszként visszaadja az összesített edzési adatokat - 200
 * @returns Hibákat küld vissza szerverhiba esetén - 500
 */
const statsExercises = async (req, res) => {
  try {
    const totals = await Exercise.findAll({
      attributes: [
        [sequelize.fn("SUM", sequelize.col("pushUps")), "totalPushUps"],
        [sequelize.fn("SUM", sequelize.col("pullUps")), "totalPullUps"],
        [sequelize.fn("SUM", sequelize.col("sitUps")), "totalSitUps"],
        [sequelize.fn("SUM", sequelize.col("squats")), "totalSquats"],
        [sequelize.fn("SUM", sequelize.col("running")), "totalRunning"],
      ],
    });

    res.json(totals[0].dataValues);
  } catch (error) {
    reason = [
      "Failed to fetch exercise sums.",
      "Nem sikerült az összesitett gyakorlatok lekérdezése.",
    ];
    return Code500(error, null, res, null, reason);
  }
};

module.exports = {
  getAllExercises,
  getExercise,
  getUserExercises,
  logExerciseAndGainXP,
  statsExercises,
};
