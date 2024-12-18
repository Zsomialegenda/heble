const { Op } = require('sequelize');
const { Users, Exercises, Achievements, UserAchievements } = require('../models');

const checkAndAwardAchievements = async (userId, completedExercises) => {
  try {
    const user = await Users.findByPk(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Check achievements criteria
    const achievements = await Achievements.findAll({
      where: {
        points: {
          [Op.lte]: completedExercises.totalPoints 
          // Assumes totalPoints are calculated from completedExercises
        }
      }
    });

    for (const achievement of achievements) {
      const existingAchievement = await UserAchievements.findOne({
        where: {
          user_id: userId,
          achievement_id: achievement.id
        }
      });

      if (!existingAchievement) {
        await UserAchievements.create({
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
      const achievements = await UserAchievements.findAll({
        where: { user_id: userId },
        include: [Achievements]
      });
  
      res.status(200).json(achievements);
    } catch (error) {
      console.error('Error fetching user achievements:', error);
      res.status(500).json({
        message: 'Failed to fetch achievements.'
      });
    }
}

const getAllAchievements = async (req, res) => {
    try {
        const achievements = await Achievements.findAll();
        res.status(200).json(achievements);
    } catch (error) {
        console.error('Error fetching achievements:', error);
        res.status(500).json({
            message: 'Failed to fetch achievements.',
            üzenet: 'Hiba merült fel az eredmények lekérése közben.'
        });
    }
};

const addAchievement = async (req, res) => {
    const { name, description, points } = req.body;

    try {
        const newAchievement = await Achievements.create({ name, description, points });
        res.status(201).json({
            message: 'Achievement created successfully.',
            achievement: newAchievement
        });
    } catch (error) {
        console.error('Error creating achievement:', error);
        res.status(500).json({
            message: 'Failed to create achievement.',
            üzenet: 'Hiba merült fel az eredmény létrehozása közben.'
        });
    }
};

const updateAchievement = async (req, res) => {
    const achievementId = req.params.id;
    const { name, description, points } = req.body;

    try {
        const achievement = await Achievements.findByPk(achievementId);
        if (!achievement) {
            return res.status(404).json({
                message: 'Achievement not found.',
                üzenet: 'Az eredmény nem található.'
            });
        }

        await achievement.update({ name, description, points });

        res.status(200).json({
            message: 'Achievement updated successfully.',
            achievement
        });
    } catch (error) {
        console.error('Error updating achievement:', error);
        res.status(500).json({
            message: 'Failed to update achievement.',
            üzenet: 'Hiba merült fel az eredmény frissítése közben.'
        });
    }
};


module.exports = {
    checkAndAwardAchievements,
    listAchivements,
    getAllAchievements,
    addAchievement,
    updateAchievement
};
