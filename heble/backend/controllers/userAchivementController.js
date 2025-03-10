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

/**
 *
 * @param {*} req Nem vár bemenetet
 * @param {*} res Visszaadja az összes felhasználóhoz tartozó eredményt - 200
 * @returns Ha belső hiba történik - 500
 */
const getAllAchievements = async (req, res) => {
  try {
    const achievements = await UserAchievement.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName", "email"],
        },
        {
          model: Achievement,
          attributes: ["id", "name", "description"],
        },
      ],
    });

    res.status(200).json({
      message: "Achievements fetched successfully.",
      üzenet: "Az eredmények sikeresen lekérve.",
      data: achievements,
    });

  } catch (error) {
    reason = ["Failed to fetch achievements.", "Nem sikerült lekérni az eredményeket." ];
    return Code500(error, null, res, null, reason);
  }
};

/** getUserAchievements -- egy felhasználó teljesitményeinek lekérdezése
 *
 * @param {*} req userId
 * @param {*} res Visszaadja az adott felhasználó teljesítményeit
 * @returns Hibát küld vissza, ha:
 *            1. Nem mefelelő a felhasználó ID - 400
 *            2. Nem található a felhasználóhoz eredmény - 404
 *            3. Szerverhiba történt - 500
 */
const getUserAchievements = async (req, res) => {
  const id = req.params.id;

  if (isNaN(id)) {
    reason = ["Invalid user ID.", "Érvénytelen felhasználói azonosító."];
    return Code400(null, null, res, null, reason);
  }

  try {
    const user = await User.findByPk(id);
    
    if (!user) {
      reason = ["User not found.", "Nem található felhasználó."];
      return Code404(null, null, res, null, reason);
    }
    const userAchievements = await UserAchievement.findAll({
      where: { userId: id },
      include: [
        {
          model: Achievement,
          attributes: ["id", "name", "description"],
        },
      ],
    });

    if (userAchievements.length === 0) {
      reason = ["This user hasn't completed a single achievement.", "Ez a feljassználó nem teljesitett még achievementet."];
      return Code404(null, null, res, null, reason);
    }

    res.status(200).json({
      message: "User achievements fetched successfully.",
      üzenet: "A felhasználó eredményei sikeresen lekérve.",
      data: userAchievements,
    });
  } catch (error) {
    reason = ["Failed to fetch user achievements.", "Nem sikerült lekérni a felhasználó eredményeit.",];
    return Code500(error, null, res, null, reason);
  }
};

/** checkAchievements -- Ellenőrzi, hogy egy felhasználó milyen teljesítményeket ért el
 *
 * @param {*} userId A felhasználó egyedi azonosítója
 * @returns 1. Visszaadja a felhasználó által elért eredményeket
 *          2. Ha nincs a felhasználóhoz tartozó gyakorlat üres tömböt ad vissza
 */
const checkAchievements = async (userId) => {
  try {
    const userExercises = await Exercise.findOne({ where: { userId } });
    if (!userExercises) {
      return [];
    }

    const achievements = await Achievement.findAll();

    const earnedAchievements = achievements.filter((achievement) => {
      console.log(`Checking achievement: ${achievement.name}`);
      const requirements =
        userExercises.pushUps >= achievement.pushUpsRequired &&
        userExercises.pullUps >= achievement.pullUpsRequired &&
        userExercises.squats >= achievement.squatsRequired &&
        userExercises.running >= achievement.runningRequired;

      return requirements;
    });

    return earnedAchievements;
  } catch (error) {
    console.error("Error/Hiba:", error);
    throw error;
  }
};

/** assignAchievements -- Megszerzett eredmények hozzárendelése egy felhasználóhoz
 *
 * @param {*} userId A felhasználó egyedi azonosítója
 * @returns A frissen megszerzett eredményeket adja vissza
 */
const assignAchievements = async (userId) => {
  try {
    const earnedAchievements = await checkAchievements(userId);

    const newAchievements = [];

    for (const achievement of earnedAchievements) {
      const alreadyEarned = await UserAchievement.findOne({
        where: { userId: userId, achievementId: achievement.id },
      });

      if (!alreadyEarned) {
        await UserAchievement.create({
          userId: userId,
          achievementId: achievement.id,
        });
        newAchievements.push(achievement);
      }
    }

    return newAchievements;
  } catch (error) {
    console.error("Error/Hiba:", error);
    throw error;
  }
};

/** getAchievementStats -- Statisztikai adatok lekérése az elért achievementekről
 *
 * @param {*} req Nem kell bemenet
 * @param {*} res Visszaadja, hogy hány felhasználó ért el egy-egy achievementet
 */
const getAchievementStats = async (req, res) => {
  try {
    const stats = await UserAchievement.findAll({
      attributes: [
        "achievementId",
        [sequelize.fn("COUNT", sequelize.col("userId")), "totalUsers"],
      ],
      include: [
        {
          model: Achievement,
          attributes: ["name"],
        },
      ],
      group: ["achievementId", "Achievement.id"],
    });

    const data = stats.map((stat) => ({
      title: stat.Achievement.name,
      totalUsers: stat.dataValues.totalUsers,
    }));

    res.json({ data });
  } catch (error) {
    reason = ["Failed to fetch achievement statistics.", "Hiba történt az achievementek lekérdezése során.",];
    return Code500(error, null, res, null, reason);
  }
};

module.exports = {
  getAllAchievements,
  getUserAchievements,
  assignAchievements,
  getAchievementStats,
};
