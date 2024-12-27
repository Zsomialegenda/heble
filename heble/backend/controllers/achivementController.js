const { Sequelize } = require('sequelize');
const { Users, Exercise, Achievement, UserAchievement, sequelize } = require('../models');

// Fetch all achievements
const getAllAchievements = async (req, res) => {
  try {
    const achievements = await Achievement.findAll();
    res.status(200).json({
      message: 'Achievements fetched successfully.',
      üzenet: 'Az eredmények sikeresen lekérve.',
      data: achievements,
    });
  } catch (error) {
    console.error('Error fetching achievements:', error);
    res.status(500).json({
      message: 'Failed to fetch achievements.',
      üzenet: 'Hiba merült fel az eredmények lekérése közben.',
    });
  }
};

// List user achievements
const listAchievement = async (req, res) => {
  const userId = req.params.userId;

  try {
    const userAchievements = await UserAchievement.findAll({
      where: { userId: userId },
      include: [Achievement],
    });

    res.status(200).json({
      message: 'User achievements fetched successfully.',
      üzenet: 'A felhasználó eredményei sikeresen lekérve.',
      data: userAchievements,
    });
  } catch (error) {
    console.error('Error fetching user achievements:', error);
    res.status(500).json({
      message: 'Failed to fetch user achievements.',
      üzenet: 'Hiba merült fel a felhasználó eredményeinek lekérése közben.',
    });
  }
};

// Add a new achievement
const addAchievement = async (req, res) => {
  const { name, description, pushUpsRequired, pullUpsRequired, squatsRequired, runningRequired } = req.body;

  try {
    const newAchievement = await Achievement.create({
      name,
      description,
      pushUpsRequired: pushUpsRequired || 0,
      pullUpsRequired: pullUpsRequired || 0,
      squatsRequired: squatsRequired || 0,
      runningRequired: runningRequired || 0,
    });

    res.status(201).json({
      message: 'Achievement created successfully.',
      üzenet: 'Az eredmény sikeresen létrehozva.',
      data: newAchievement,
    });
  } catch (error) {
    console.error('Error creating achievement:', error);
    res.status(500).json({
      message: 'Failed to create achievement.',
      üzenet: 'Hiba merült fel az eredmény létrehozása közben.',
    });
  }
};


// Update an achievement
const updateAchievement = async (req, res) => {
  const achievementId = req.params.id;
  const { name, description, pushUpsRequired, pullUpsRequired, squatsRequired, runningRequired } = req.body;

  try {
    const achievement = await Achievement.findByPk(achievementId);

    if (!achievement) {
      return res.status(404).json({
        message: 'Achievement not found.',
        üzenet: 'Az eredmény nem található.',
      });
    }

    await achievement.update({
      name,
      description,
      pushUpsRequired: pushUpsRequired || achievement.pushUpsRequired,
      pullUpsRequired: pullUpsRequired || achievement.pullUpsRequired,
      squatsRequired: squatsRequired || achievement.squatsRequired,
      runningRequired: runningRequired || achievement.runningRequired,
    });

    res.status(200).json({
      message: 'Achievement updated successfully.',
      üzenet: 'Az eredmény sikeresen frissítve.',
      data: achievement,
    });
  } catch (error) {
    console.error('Error updating achievement:', error);
    res.status(500).json({
      message: 'Failed to update achievement.',
      üzenet: 'Hiba merült fel az eredmény frissítése közben.',
    });
  }
};

/**
 [
  {
    "name": "Push-Up Master",
    "description": "Complete 50 push-ups in total.",
    "pushUpsRequired": 50,
    "pullUpsRequired": 0,
    "squatsRequired": 0,
    "runningRequired": 0
  },
  {
    "name": "Pull-Up Pro",
    "description": "Complete 20 pull-ups in total.",
    "pushUpsRequired": 0,
    "pullUpsRequired": 20,
    "squatsRequired": 0,
    "runningRequired": 0
  },
  {
    "name": "Squat Specialist",
    "description": "Perform 100 squats in total.",
    "pushUpsRequired": 0,
    "pullUpsRequired": 0,
    "squatsRequired": 100,
    "runningRequired": 0
  },
  {
    "name": "Running Rookie",
    "description": "Run 5 kilometers in total.",
    "pushUpsRequired": 0,
    "pullUpsRequired": 0,
    "squatsRequired": 0,
    "runningRequired": 5000
  },
  {
    "name": "Fitness All-Rounder",
    "description": "Complete 20 push-ups, 10 pull-ups, 30 squats, and run 1 kilometer.",
    "pushUpsRequired": 20,
    "pullUpsRequired": 10,
    "squatsRequired": 30,
    "runningRequired": 1
  },
  {
    "name": "Advanced Athlete",
    "description": "Achieve 100 push-ups, 50 pull-ups, 150 squats, and run 10 kilometers.",
    "pushUpsRequired": 100,
    "pullUpsRequired": 50,
    "squatsRequired": 150,
    "runningRequired": 10
  },
  {
    "name": "Marathon Runner",
    "description": "Run a total of 42 kilometers.",
    "pushUpsRequired": 0,
    "pullUpsRequired": 0,
    "squatsRequired": 0,
    "runningRequired": 42
  }
]

 */

module.exports = {
  listAchievement,
  getAllAchievements,
  addAchievement,
  updateAchievement,
};
