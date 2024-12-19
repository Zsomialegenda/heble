const { Users, Exercises, Achievements, UserAchievements, Token } = require('../models');

const fetchAllTokens = async (req, res) => {
    try {
        const tokens = await Token.findAll();
        res.status(200).json({
            status: 200,
            tokens
        });
    } catch (error) {
        console.error('Error fetching tokens:', error);
        res.status(500).json({
            status: 500,
            message: 'Error fetching tokens.'
        });
    }
}

const fetchTokenById = async (req, res) => {
    const { id } = req.params;

    try {
        const token = await Token.findByPk(id);

        if (!token) {
            return res.status(404).json({
                status: 404,
                message: 'Token not found.'
            });
        }

        res.status(200).json({
            status: 200,
            token
        });
    } catch (error) {
        console.error('Error fetching token by ID:', error);
        res.status(500).json({
            status: 500,
            message: 'Error fetching token by ID.'
        });
    }
}

const fetchTokenByUserId = async (req, res) => {
    const { userId } = req.body;

    try {
        const token = await Token.findByPk(userId);

        if (!token) {
            return res.status(404).json({
                status: 404,
                message: 'Token not found.'
            });
        }

        res.status(200).json({
            status: 200,
            token
        });
    } catch (error) {
        console.error('Error fetching token by ID:', error);
        res.status(500).json({
            status: 500,
            message: 'Error fetching token by ID.'
        });
    }
}

const checkAndDeleteExpiredTokens = async () => {
    try {
        const now = new Date();
        const result = await Token.destroy({
            where: {
                expiresAt: {
                    [Sequelize.Op.lt]: now
                }
            }
        });

        console.log(`${result} expired tokens deleted.`);
    } catch (error) {
        console.error('Error deleting expired tokens:', error);
    }
};

setInterval(checkAndDeleteExpiredTokens, 3600000);

module.exports = [
    fetchAllTokens,
    fetchTokenById,
    fetchTokenByUserId
]