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
  }
};

module.exports = { assignAchievements };
