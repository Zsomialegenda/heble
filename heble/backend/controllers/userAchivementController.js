const { UserAchievement, User, Achievement, Exercise, sequelize } = require('../models');

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

const checkAchievements = async (userId) => {
    try {
      const userExercises = await Exercise.findOne({ where: { userId } });
      if (!userExercises) {
        console.log('No exercises found for this user.');
        return [];
      }
  
      console.log('Cumulative exercise totals:', {
        pushUps: userExercises.pushUps,
        pullUps: userExercises.pullUps,
        squats: userExercises.squats,
        running: userExercises.running,
      });
  
      const achievements = await Achievement.findAll();
  
      // Filter achievements based on requirements
      const earnedAchievements = achievements.filter((achievement) => {
        console.log(`Checking achievement: ${achievement.name}`);
        const meetsRequirements =
          userExercises.pushUps >= achievement.pushUpsRequired &&
          userExercises.pullUps >= achievement.pullUpsRequired &&
          userExercises.squats >= achievement.squatsRequired &&
          userExercises.running >= achievement.runningRequired;
  
        console.log(
          `Achievement: ${achievement.name}, Meets Requirements: ${meetsRequirements}`
        );
  
        return meetsRequirements;
      });
  
      console.log('Earned achievements:', earnedAchievements);
      return earnedAchievements;
    } catch (error) {
      console.error('Error checking achievements:', error);
      throw error;
    }
};


const assignAchievements = async (userId) => {
  try {
    const earnedAchievements = await checkAchievements(userId);

    const newlyEarnedAchievements = [];

    for (const achievement of earnedAchievements) {
      const alreadyEarned = await UserAchievement.findOne({
        where: { userId: userId, achievementId: achievement.id },
      });

      if (!alreadyEarned) {
        await UserAchievement.create({
          userId: userId,
          achievementId: achievement.id,
        });
        newlyEarnedAchievements.push(achievement);
      }
    }

    return newlyEarnedAchievements; // Only return newly earned achievements
  } catch (error) {
    console.error('Error assigning achievements:', error);
    throw error;
  }
};


const getAchievementStats = async (req, res) => {
  try {
    // Count the number of users per achievement
    const stats = await UserAchievement.findAll({
      attributes: [
        'achievementId',
        [sequelize.fn('COUNT', sequelize.col('userId')), 'totalUsers'],
      ],
      include: [
        {
          model: Achievement,
          attributes: ['name'], // Get the name of the achievement
        },
      ],
      group: ['achievementId', 'Achievement.id'], // Group by achievement
    });

    // Format the data for the frontend
    const data = stats.map((stat) => ({
      title: stat.Achievement.name,
      totalUsers: stat.dataValues.totalUsers,
    }));

    res.json({ data });
  } catch (error) {
    console.error('Error fetching achievement stats:', error);
    res.status(500).json({ error: 'Failed to fetch achievement statistics' });
  }
};

const getLeaderboardByAchievements = async (req, res) => {
  try {
    const leaderboard = await UserAchievement.findAll({
      attributes: ['userId', [sequelize.fn('COUNT', sequelize.col('achievementId')), 'achievementCount']],
      include: {
        model: User,
        attributes: ['username'],
      },
      group: ['userId'],
      order: [[sequelize.fn('COUNT', sequelize.col('achievementId')), 'DESC']],
      limit: 10,
    });

    res.json(leaderboard);
  } catch (error) {
    console.error('Error fetching achievement leaderboard:', error);
    res.status(500).json({ error: 'Failed to fetch achievement leaderboard.' });
  }
};
  
  
  module.exports = {
    getAllAchievements,
    getUserAchievements,
    assignAchievements,
    getAchievementStats,
    getLeaderboardByAchievements
  };
  