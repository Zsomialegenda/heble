const { UserAchievement, User, Achievement } = require('../models');

// Get all achievements
const getAllAchievements = async (req, res) => {
    try {
        const achievements = await UserAchievement.findAll({
            include: [
                {
                    model: User,
                    attributes: ['id', 'firstName', 'lastName', 'email']
                },
                {
                    model: Achievement,
                    attributes: ['id', 'name', 'description', 'xp']
                }
            ]
        });

        res.status(200).json({
            message: 'Achievements fetched successfully.',
            üzenet: 'Az eredmények sikeresen lekérve.',
            data: achievements
        });
    } catch (error) {
        console.error('Error fetching achievements:', error);
        res.status(500).json({
            message: 'Failed to fetch achievements.',
            üzenet: 'Nem sikerült lekérni az eredményeket.'
        });
    }
};

// Get achievements for a specific user
const getUserAchievements = async (req, res) => {
    const userId = req.params.userId;

    try {
        const userAchievements = await UserAchievement.findAll({
            where: { userId: userId },
            include: [
                {
                    model: Achievement,
                    attributes: ['id', 'name', 'description', 'xp']
                }
            ]
        });

        if (userAchievements.length === 0) {
            return res.status(404).json({
                message: 'No achievements found for this user.',
                üzenet: 'A felhasználóhoz nem találhatóak eredmények.'
            });
        }

        res.status(200).json({
            message: 'User achievements fetched successfully.',
            üzenet: 'A felhasználó eredményei sikeresen lekérve.',
            data: userAchievements
        });
    } catch (error) {
        console.error('Error fetching user achievements:', error);
        res.status(500).json({
            message: 'Failed to fetch user achievements.',
            üzenet: 'Nem sikerült lekérni a felhasználó eredményeit.'
        });
    }
};

module.exports = {
    getAllAchievements,
    getUserAchievements
};
