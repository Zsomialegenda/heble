const { Op } = require('sequelize');
const User = require('../models/User');
const Achievement = require('../models/Achievement');
const UserAchievement = require('../models/UserAchievement');

const checkAndAwardAchievements = async (userId, completedExercises) => {
  try {
    // Example: Awarding an achievement for reaching 100 push-ups in total
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Check achievements criteria
    const achievements = await Achievement.findAll({
      where: {
        points: {
          [Op.lte]: completedExercises.totalPoints 
          // Assumes totalPoints are calculated from completedExercises
        }
      }
    });

    for (const achievement of achievements) {
      const existingAchievement = await UserAchievement.findOne({
        where: {
          user_id: userId,
          achievement_id: achievement.id
        }
      });

      if (!existingAchievement) {
        await UserAchievement.create({
          user_id: userId,
          achievement_id: achievement.id
        });
        console.log(`Achievement '${achievement.name}' awarded to user ${userId}`);
      }
    }
  } catch (error) {
    console.error('Error awarding achievements:', error);
  }
};

const listAchivements = async (req, res) => {
    try {
      const userId = req.params.userId;
      const achievements = await UserAchievement.findAll({
        where: { user_id: userId },
        include: [Achievement]
      });
  
      res.status(200).json(achievements);
    } catch (error) {
      console.error('Error fetching user achievements:', error);
      res.status(500).json({
        message: 'Failed to fetch achievements.'
      });
    }
}

module.exports = {
    checkAndAwardAchievements,
    listAchivements
};
