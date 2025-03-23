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

/** getAllUserAchievements - Minden felhasználó és az általuk elért achievement lekérdezése
 *
 * @param {*} req Nem vár bemenetet
 * @param {*} res Visszaadja az összes felhasználóhoz tartozó eredményt - 200
 * @returns Ha belső hiba történik - 500
 */
const getAllUserAchievements = async (req, res) => {
  try {
    const achievements = await UserAchievement.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName", "email"],
          model: Achievement,
          attributes: ["id", "name", "description"],
        },
      ],
    });

    return res.status(200).json({
      message: "Achievements fetched successfully.",
      üzenet: "Az eredmények sikeresen lekérve.",
      data: achievements,
    });
  } catch (error) {
    reason = [
      "Failed to fetch achievements.",
      "Nem sikerült lekérni az eredményeket.",
    ];
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
  const userId = parseInt(req.params.id, 10);

  if (isNaN(userId)) {
    reason = ["Invalid user ID.", "Érvénytelen felhasználói azonosító."];
    return Code400(null, null, res, null, reason);
  }

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      reason = ["User not found.", "Nem található felhasználó."];
      return Code404(null, null, res, null, reason);
    }
    const userAchievements = await UserAchievement.findAll({
      where: { userId: userId },
      include: [
        {
          model: Achievement,
          attributes: ["id", "name", "description"],
        },
      ],
    });

    if (userAchievements.length === 0) {
      reason = [
        "This user hasn't completed a single achievement.",
        "Ez a feljassználó nem teljesitett még achievementet.",
      ];
      return Code404(null, null, res, null, reason);
    }

    return res.status(200).json({
      message: "User achievements fetched successfully.",
      üzenet: "A felhasználó eredményei sikeresen lekérve.",
      data: userAchievements,
    });
  } catch (error) {
    reason = [
      "Failed to fetch user achievements.",
      "Nem sikerült lekérni a felhasználó eredményeit.",
    ];
    return Code500(error, null, res, null, reason);
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
    reason = [
      "Failed to fetch achievement statistics.",
      "Hiba történt az achievementek lekérdezése során.",
    ];
    return Code500(error, null, res, null, reason);
  }
};

module.exports = {
  getAllUserAchievements,
  getUserAchievements,
  getAchievementStats,
};
