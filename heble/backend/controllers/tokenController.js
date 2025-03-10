const { Sequelize } = require('sequelize');

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


/** fetchAllTokens -- Az összes token lekérdezése
 * 
 * @param {*} req Nem vár bemenetet
 * @param {*} res Visszaadja az összes elérhető tokent - 200
 * @returns Szerverhiba esetén hibát küld vissza - 500
 */
const fetchAllTokens = async (req, res) => {
    try {
        const tokens = await Token.findAll();
        res.status(200).json({
            status: 200,
            message: 'Tokens fetched successfully.',
            üzenet: 'Tokenek sikeresen lekérve.',
            tokens,
        });
    } catch (error) {
        reason = ['Error fetching tokens.', 'Hiba történt a tokenek lekérése közben.'];
        return Code500(error, null, res, null, reason);
    }
};

/** fetchTokenById -- Token lekérdezése ID alapján
 * 
 * @param {*} req A token azonosítója paraméterként
 * @param {*} res A kért tokent adja vissza - 200
 * @returns Szerverhiba esetén hibát küld vissza - 500
 */
const fetchTokenById = async (req, res) => {
    const { id } = req.params;

    try {
        const token = await Token.findByPk(id);

        if (!token) {
            return Code404(null, res);
        }

        res.status(200).json({
            status: 200,
            message: 'Token fetched successfully.',
            üzenet: 'Token sikeresen lekérve.',
            token,
        });
    } catch (error) {
        reason = ['Error fetching tokens.', 'Hiba történt a tokenek lekérése közben.'];
        return Code500(error, null, res, null, reason);
    }
};

/** fetchTokenByUserId -- Token lekérdezése felhasználó ID alapján
 * 
 * @param {*} req A felhasználó azonosítója a paraméterben
 * @param {*} res A felhasználóhoz tartozó tokent adja vissza - 200
 * @returns Hibákat küld vissza ha:
 *              1. a felhasználói ID érvénytelen vagy nem szám - 400
 *              2. a token nem található - 404
 *              3. szerverhiba - 500
 */
const fetchTokenByUserId = async (req, res) => {
    const userId = parseInt(req.params.userId, 10);

    if (isNaN(userId)) {
        reason = ['Invalid user ID.', 'Érvénytelen felhasználói azonosító.']
        return Code400(null, res, reason);
    }

    try {
        const token = await Token.findOne({ where: { userId } });

        if (!token) {
            return Code404(null, res);
        }

        res.status(200).json({
            status: 200,
            message: 'Token fetched successfully.',
            üzenet: 'Token sikeresen lekérve.',
            token,
        });
    } catch (error) {
        console.error('Error fetching token by user ID:', error);
        reason = ['Error fetching token by user ID.', 'Hiba történt a token lekérése közben.'];
        return Code500(error, null, res, null, reason);
    }
};


/** countToken -- Tokenek megszámolása
 * 
 * @param {*} req Nem vár bemenetet
 * @param {*} res Visszaadja a tokenek számát - 200
 * @returns Szerverhiba esetén hibát küld vissza - 500
 */
const countToken = async (req, res) => {
    try {
        const tokenCount = await Token.count();
        res.status(200).json({
            status: 200,
            message: 'Token count fetched successfully.',
            üzenet: 'Tokenek száma sikeresen lekérve.',
            tokenCount,
        });
    } catch (error) {
        console.error('Error fetching token count:', error);
        reason = ['Error fetching token count.', 'Hiba történt a tokenek számának lekérése közben.'];
        return Code500(error, null, res, null, reason);
    }
};

/** checkAndDeleteExpiredTokens -- Lejárt tokenek törlése
 * 
 * Időzített feladat, eltávolítja a lejárt tokeneket
 */
const checkAndDeleteExpiredTokens = async () => {
    try {
        const now = new Date();
        const result = await Token.destroy({
            where: {
                expiresAt: {
                    [Sequelize.Op.lt]: now,
                },
            },
        });

        console.log(`${result} expired tokens deleted. (${result} lejárt token törölve.)`);
    } catch (error) {
        console.log('Error deleting expired tokens:', error);
    }
};

// Törlés -- 1 óra (lehet több kéne a feleslegges túlterhelés miatt akér)
setInterval(checkAndDeleteExpiredTokens, 3600000);

module.exports = {
    fetchAllTokens,
    fetchTokenById,
    fetchTokenByUserId,
    countToken
};
