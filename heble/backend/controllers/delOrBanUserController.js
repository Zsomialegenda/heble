const DeletedOrBannedUser = require("../models/DeletedOrBannedUsers");
const { Code400, Code404, Code500 } = require("../utils/statusCode");

/**
 * getAllDeletedOrBannedUsers -- Az összes törölt vagy kitiltott felhasználó lekérdezése
 *
 * @param {*} req Nincs bemenet
 * @param {*} res Visszaadja az összes törölt/kitiltott felhasználó adatát - 200
 * @returns Hibát küld vissza, ha szerverhiba - 500
 */
const getAllDelOrBanUsers = async (req, res) => {
  try {
    const users = await DeletedOrBannedUser.findAll();
    return res.status(200).json(users);
  } catch (error) {
    return Code500(error, null, res, null, [
      "Failed to fetch deleted or banned users.",
      "Nem sikerült lekérdezni a törölt vagy kitiltott felhasználókat.",
    ]);
  }
};

/**
 * getDeletedOrBannedUserByID -- Egy adott törölt vagy kitiltott felhasználó lekérdezése ID alapján
 *
 * @param {*} req userId
 * @param {*} res Visszaadja a felhasználó adatait - 200
 * @returns Hibákat küld vissza:
 *              1. Az ID érvénytelen vagy nem szám - 400
 *              2. A felhasználó nem található - 404
 *              3. Szerverhiba - 500
 */
const getDelOrBanUserByID = async (req, res) => {
  const userId = parseInt(req.params.id, 10);

  if (isNaN(userId)) {
    return Code400(null, null, res, null, [
      "Invalid user ID.",
      "Érvénytelen felhasználói azonosító.",
    ]);
  }

  try {
    const user = await DeletedOrBannedUser.findOne({
      where: { userId },
    });

    if (!user) {
      return Code404(null, null, res, null, [
        "Deleted or banned user not found.",
        "A törölt vagy kitiltott felhasználó nem található.",
      ]);
    }

    return res.status(200).json(user);
  } catch (error) {
    return Code500(error, null, res, null, [
      "Failed to fetch deleted or banned user.",
      "Nem sikerült lekérdezni a törölt vagy kitiltott felhasználót.",
    ]);
  }
};

/** getDeletedOrBannedUserByEmail -- e-mail alapú lekérdezés egy törölt vagy kitiltott felhasználóra
 *
 * @param {*} req email
 * @param {*} res Válaszként visszaadja a felhasználó adatait - 200.
 * @returns Hibákat küld vissza:
 *              1. Az e-mail nincs megadva - 400
 *              2. A felhasználó nem található - 404
 *              3. Szerverhiba - 500
 */
const getDelOrBanUserByEmail = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    reason = ["Email is required.", "Az email megadása kötelező."];
    return Code400(null, null, res, null, reason);
  }

  try {
    const user = await DeletedOrBannedUser.findOne({
      where: { email },
    });

    if (!user) {
      reason = ["User not found.", "Felhasználó nem található."];
      return Code404(null, null, res, null, reason);
    }

    return res.status(200).json(user);
  } catch (error) {
    return Code500(error, null, res, null, reason);
  }
};


module.exports = {
  getAllDelOrBanUsers,
  getDelOrBanUserByID,
  getDelOrBanUserByEmail,
};
