const sequelize = require('../connection/sequelize');
const { User, UserExperience } = require('../models');

const getAllXP = async (req, res) => {
    try {
        const users = await User.findAll({ include: [ UserExperience ] });
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            message: 'An error occurred while fetching users.',
            üzenet: 'Hiba merült fel az adatok lekérése közben.'
        });
    }
};

module.exports = {
    getAllXP,
    getLeaderboardByXP
}