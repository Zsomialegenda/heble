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

// Allowed exercise namess
const ALLOWED_EXERCISES = ["pushUps", "pullUps", "sitUps", "squats", "running"];

/** getLeaderboardByXP -- Legjobb 10 felhasználó lekérdezése XP alapján
 *
 * @param {*} req Az üzenet nem tartalmaz paramétereket.
 * @param {*} res Válaszként visszaadja a legjobb 10 felhasználó XP ranglistáját - 200
 * @returns Hibát küld vissza szerverhiba esetén - 500
 */
const getLeaderboardByXP = async (req, res) => {
  try {
    const leaderboard = await UserExperience.findAll({
      attributes: ["userId", "xp"],
      include: {
        model: User,
        attributes: ["firstName", "lastName"],
      },
      order: [["xp", "DESC"]],
      limit: 10,
    });

    const formattedLeaderboard = leaderboard.map((entry, index) => ({
      rank: index + 1,
      userId: entry.userId,
      firstName: entry.User.firstName,
      lastName: entry.User.lastName,
      xp: entry.xp,
    }));

    return res.status(200).json({
      message: "XP leaderboard fetched successfully.",
      üzenet: "XP ranglista sikeresen lekérve.",
      users: formattedLeaderboard,
    });
  } catch (error) {
    reason = [
      "Failed to fetch XP leaderboard.",
      "Nem sikerült rekérdezni az XP ranglistát.",
    ];
    return Code500(error, null, res, null, reason);
  }
};

/** getLeaderboardByAchievements -- Legjobb 10 felhasználó lekérdezése elért eredmények száma alapján
 *
 * @param {*} req Az üzenet nem tartalmaz paramétereket.
 * @param {*} res Válaszként visszaadja a top 10 felhasználó eredmény ranglistáját - 200
 * @returns Hibát küld vissza szerverhiba esetén - 500
 */
const getLeaderboardByAchievements = async (req, res) => {
  try {
    const leaderboard = await UserAchievement.findAll({
      attributes: [
        "userId",
        [
          Sequelize.fn("COUNT", Sequelize.col("achievementId")),
          "achievementCount",
        ],
      ],
      include: {
        model: User,
        attributes: ["firstName", "lastName"],
      },
      group: ["userId", "User.id"],
      order: [[Sequelize.literal("achievementCount"), "DESC"]],
      limit: 10,
    });

    const formattedLeaderboard = leaderboard.map((entry, index) => ({
      rank: index + 1,
      userId: entry.userId,
      firstName: entry.User.firstName,
      lastName: entry.User.lastName,
      achievementCount: entry.dataValues.achievementCount,
    }));

    return res.status(200).json({
      message: "Achievement leaderboard fetched successfully.",
      üzenet: "Eredmény ranglista sikeresen lekérve.",
      users: formattedLeaderboard,
    });
  } catch (error) {
    reason = [
      "Failed to fetch achievement leaderboard.",
      "Nem sikerült lekérdezni az achievement ranglistát.",
    ];
    return Code500(error, null, res, null, reason);
  }
};

/** getLeaderboardByExercise -- Legjobb 10 felhasználó lekérdezése adott gyakorlat neve szerint
 *
 * @param {*} req Az üzenet tartalmazza az `exercise name` paramétert az URL-ben.
 * @param {*} res Válaszként visszaadja a megadott gyakorlat név szerinti első 10 felhasználót - 200
 * @returns Hibákat küld vissza:
 *              1. Ha az `exercise name` érvénytelen - 400
 *              2. Szerverhiba esetén - 500
 */
const getLeaderboardByExercise = async (req, res) => {
  const { name } = req.params;

  if (!ALLOWED_EXERCISES.includes(name)) {
    reason = ["Invalid exercise name.", "Nem meggfelelő gyakorlat név."];
    return Code400(error, null, res, null, reason);
  }

  try {
    const leaderboard = await Exercise.findAll({
      attributes: [
        "userId",
        [Sequelize.literal(`\`${name}\``), "exerciseCount"],
      ],
      include: {
        model: User,
        attributes: ["firstName", "lastName"],
      },
      order: [[Sequelize.literal(`\`${name}\``), "DESC"]],
      limit: 10,
    });

    const formattedLeaderboard = leaderboard.map((entry, index) => ({
      rank: index + 1,
      userId: entry.userId,
      firstName: entry.User.firstName,
      lastName: entry.User.lastName,
      exerciseCount: entry.dataValues.exerciseCount,
    }));

    return res.status(200).json({
      message: `Leaderboard for ${name} fetched successfully.`,
      üzenet: `${name} ranglista sikeresen lekérve.`,
      users: formattedLeaderboard,
    });
  } catch (error) {
    reason = [
      `Failed to fetch leaderboard for ${name}.`,
      `Nem sikerült lekérdezni a ranglistát a ${name} gyakorlathoz.`,
    ];
    return Code500(null, null, res, null, reason);
  }
};

module.exports = {
  getLeaderboardByXP,
  getLeaderboardByAchievements,
  getLeaderboardByExercise,
};
