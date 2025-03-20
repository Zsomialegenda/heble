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

module.exports = checkAndDeleteExpiredTokens;