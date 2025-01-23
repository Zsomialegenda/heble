const { Sequelize } = require('sequelize'); // Add this line to get Sequelize utilities
const { sequelize } = require('sequelize');
const { User, Exercise, UserExperience, } = require('../models');

// Get top 10 users by XP
const getLeaderboardByXP = async (req, res) => {
    try {
      const leaderboard = await UserExperience.findAll({
        attributes: ['userId', 'xp'],
        include: {
          model: User,
          attributes: ['firstName', 'lastName'], // Correctly specify attributes
        },
        order: [['xp', 'DESC']],
        limit: 10,
      });
  
      res.json(leaderboard);
    } catch (error) {
      console.error('Error fetching XP leaderboard:', error);
      res.status(500).json({ error: 'Failed to fetch XP leaderboard.' });
    }
  };

// Get top 10 users by achievement count
const getLeaderboardByAchievements = async (req, res) => {
  try {
    const leaderboard = await UserAchievement.findAll({
      attributes: ['userId', [sequelize.fn('COUNT', sequelize.col('achievementId')), 'achievementCount']],
      include: {
        model: User,
        attributes: ['firstName', 'lastName'],
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

// Get top 10 users by exercise type
const getLeaderboardByExercise = async (req, res) => {
    const { type } = req.params; // Type: pushUps, sitUps, etc.
    if (!['pushUps', 'pullUps', 'sitUps', 'squats', 'running'].includes(type)) {
      return res.status(400).json({ error: 'Invalid exercise type.' });
    }
  
    try {
      const leaderboard = await Exercise.findAll({
        attributes: ['userId', [Sequelize.col(type), 'exerciseCount']], // Use Sequelize.col
        include: {
          model: User,
          attributes: ['firstName', 'lastName'],    
        },
        order: [[Sequelize.col(type), 'DESC']], // Ensure ordering also uses Sequelize.col
        limit: 10,
      });
  
      res.json(leaderboard);
    } catch (error) {
      console.error(`Error fetching leaderboard for ${type}:`, error);
      res.status(500).json({ error: `Failed to fetch leaderboard for ${type}.` });
    }
  };


module.exports = {
    getLeaderboardByXP,
    getLeaderboardByAchievements,
    getLeaderboardByExercise,
  };