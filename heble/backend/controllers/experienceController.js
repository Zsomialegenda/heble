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

/** getAllExercises -- Az összes gyakorlat lekérdezése
 *
 * @param {*} req Nem tartalmaz paramétereket.
 * @param {*} res Válaszként visszaadja az összes felhasználó exp pontjait - 200
 * @returns Hibát küld vissza szerverhiba - 500
 */
const getAllExperiences = async (req, res) => {
  try {
    const experiences = await UserExperience.findAll();
    return res.status(200).json({
      message: "All experiences fetched successfully.",
      üzenet: "Az összes tapasztalat sikeresen lekérve.",
      data: experiences,
    });
  } catch (error) {
    reason = [
      "Failed to fetch experiences.",
      "Hiba merült fel a tapasztalatok lekérése közben.",
    ];
    return Code500(error, null, res, null, reason);
  }
};

/** getUserExercises -- Egy felhasználó gyakorlatai
 *
 * @param {*} req Az üzenet tartalmazza a `userId` paramétert az URL-ben.
 * @param {*} res Válaszként visszaadja a felhasználó exp pontjait - 200
 * @returns Hibákat küld vissza:
 *              1. Ha a userId érvénytelen - 400
 *              2. Ha nincs találat - 404
 *              3. Szerverhiba - 500
 */
const getUserExperience = async (req, res) => {
  const userId = parseInt(req.params.id, 10);

  if (isNaN(userId)) {
    reason = ["Invalid user ID.", "Érvénytelen felhasználói azonosító."];
    return Code400(null, null, res, null, reason);
  }

  try {
    const experiences = await UserExperience.findOne({ where: { userId } });
    if (!experiences) {
      reason = [
        "No experiences found for this user.",
        "Nincsenek tapasztalatok ehhez a felhasználóhoz.",
      ];
      return Code404(null, null, res, null, reason);
    }
    return res.status(200).json({
      message: "User experiences fetched successfully.",
      üzenet: "A felhasználó tapasztalatai sikeresen lekérve.",
      data: experiences,
    });
  } catch (error) {
    reason = [
      "An error occurred while fetching experiences.",
      "Hiba történt a tapasztalatok lekérése közben.",
    ];
    return Code500(error, null, res, null, reason);
  }
};

module.exports = {
  getAllExperiences,
  getUserExperience
}