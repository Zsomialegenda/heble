const { Users, Exercises, Achievements, UserAchievements, Token } = require('../models');
const { Sequelize } = require('sequelize');

// Fetch all tokens
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
        console.error('Error fetching tokens:', error);
        res.status(500).json({
            status: 500,
            message: 'Error fetching tokens.',
            üzenet: 'Hiba történt a tokenek lekérése közben.',
        });
    }
};

// Fetch a token by its ID
const fetchTokenById = async (req, res) => {
    const { id } = req.params;

    try {
        const token = await Token.findByPk(id);

        if (!token) {
            return res.status(404).json({
                status: 404,
                message: 'Token not found.',
                üzenet: 'A token nem található.',
            });
        }

        res.status(200).json({
            status: 200,
            message: 'Token fetched successfully.',
            üzenet: 'Token sikeresen lekérve.',
            token,
        });
    } catch (error) {
        console.error('Error fetching token by ID:', error);
        res.status(500).json({
            status: 500,
            message: 'Error fetching token by ID.',
            üzenet: 'Hiba történt a token lekérése közben.',
        });
    }
};

// Fetch a token by user ID
const fetchTokenByUserId = async (req, res) => {
    const userId = parseInt(req.params.userId, 10);

    if (isNaN(userId)) {
        return res.status(400).json({
            status: 400,
            message: 'Invalid user ID.',
            üzenet: 'Érvénytelen felhasználói azonosító.',
        });
    }

    try {
        const token = await Token.findOne({ where: { userId } });

        if (!token) {
            return res.status(404).json({
                status: 404,
                message: 'Token not found for this user.',
                üzenet: 'A token nem található ehhez a felhasználóhoz.',
            });
        }

        res.status(200).json({
            status: 200,
            message: 'Token fetched successfully.',
            üzenet: 'Token sikeresen lekérve.',
            token,
        });
    } catch (error) {
        console.error('Error fetching token by user ID:', error);
        res.status(500).json({
            status: 500,
            message: 'Error fetching token by user ID.',
            üzenet: 'Hiba történt a token lekérése közben.',
        });
    }
};

// Periodically delete expired tokens
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
        console.error('Error deleting expired tokens:', error);
    }
};

// Run the cleanup function every hour
setInterval(checkAndDeleteExpiredTokens, 3600000);

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
        res.status(500).json({
            status: 500,
            message: 'Error fetching token count.',
            üzenet: 'Hiba történt a tokenek számának lekérése közben.',
        });
    }
};

module.exports = {
    fetchAllTokens,
    fetchTokenById,
    fetchTokenByUserId,
    countToken
};
