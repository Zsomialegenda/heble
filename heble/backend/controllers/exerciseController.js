const {
  sequelize,
  Users,
  Exercise,
  Achievement,
  UserExperience,
  UserAchievement
} = require("../models");

const { assignAchievements} = require('./userAchivementController')

const getAllExercises = async (req, res) => {
  try {
    const exercises = await Exercise.findAll();
    res.status(200).json({
      message: "All exercises fetched successfully.",
      üzenet: "Az összes gyakorlat sikeresen lekérve.",
      data: exercises,
    });
  } catch (error) {
    console.error("Error fetching exercises:", error);
    res.status(500).json({
      message: "Failed to fetch exercises.",
      üzenet: "Hiba merült fel a gyakorlatok lekérése közben.",
    });
  }
};

const getUserExercises = async (req, res) => {
  const userId = parseInt(req.params.id, 10);

  if (isNaN(userId)) {
    return res.status(400).json({
      message: "Invalid user ID.",
      üzenet: "Érvénytelen felhasználói azonosító.",
    });
  }

  try {
    const exercises = await Exercise.findAll({ where: { userId } });
    if (exercises.length === 0) {
      return res.status(404).json({
        message: "No exercises found for this user.",
        üzenet: "Nincsenek gyakorlatok ehhez a felhasználóhoz.",
      });
    }
    res.status(200).json({
      message: "User exercises fetched successfully.",
      üzenet: "A felhasználó gyakorlatai sikeresen lekérve.",
      data: exercises,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while fetching exercises.",
      üzenet: "Hiba történt a gyakorlatok lekérése közben.",
    });
  }
};

const getExerciseByUserID = async (req, res) => {
  const userId = req.params.id;

  try {
    const exercise = await Exercise.findOne({ where: { userId: userId } });
    if (!exercise) {
      return res.status(404).json({
        message: "Exercises not found for this user.",
        üzenet: "A felhasználóhoz nem találhatóak gyakorlatok.",
      });
    }
    res.status(200).json({
      message: "Exercise data fetched successfully for the user.",
      üzenet: "A felhasználó gyakorlatai sikeresen lekérve.",
      data: exercise,
    });
  } catch (error) {
    console.error("Error fetching exercise:", error);
    res.status(500).json({
      message: "Failed to fetch exercise.",
      üzenet: "Hiba merült fel a gyakorlatok lekérése közben.",
    });
  }
};

const logExerciseAndGainXP = async (req, res) => {
  const { userId, pushUps, pullUps, sitUps, squats, running } = req.body;

  // Validate input
  if (
    !userId ||
    (pushUps === undefined &&
      pullUps === undefined &&
      sitUps === undefined &&
      squats === undefined &&
      running === undefined)
  ) {
    return res.status(400).json({
      message: "Invalid input data.",
      üzenet: "Nem megfelelő bemenő adat.",
    });
  }

  try {
    // Fetch or create exercise record
    const exercise = await Exercise.findOrCreate({
      where: { userId },
      defaults: {
        userId,
        pushUps: 0,
        pullUps: 0,
        sitUps: 0,
        squats: 0,
        running: 0,
      },
    }).then(([record]) => record);

    // Fetch or create UserExperience record
    const userExperience = await UserExperience.findOrCreate({
      where: { userId },
      defaults: {
        userId,
        level: 1,
        xp: 0,
        xpToNextLevel: 100,
      },
    }).then(([record]) => record);

    // Define XP multipliers
    const xpMultipliers = {
      pushUps: 10,
      pullUps: 15,
      sitUps: 5,
      squats: 5,
      running: 50,
    };

    // Calculate XP from exercises
    const totalXpGained = 
      (pushUps || 0) * xpMultipliers.pushUps +
      (pullUps || 0) * xpMultipliers.pullUps +
      (sitUps || 0) * xpMultipliers.sitUps +
      (squats || 0) * xpMultipliers.squats +
      (running || 0) * xpMultipliers.running;

    // Update exercise data
    Object.assign(exercise, {
      pushUps: exercise.pushUps + (pushUps || 0),
      pullUps: exercise.pullUps + (pullUps || 0),
      sitUps: exercise.sitUps + (sitUps || 0),
      squats: exercise.squats + (squats || 0),
      running: exercise.running + (running || 0),
    });
    await exercise.save();

    // Update XP and level
    let { xp, level, xpToNextLevel } = userExperience;
    xp += totalXpGained;

    while (xp >= xpToNextLevel) {
      xp -= xpToNextLevel;
      level++;
      xpToNextLevel = Math.floor(xpToNextLevel * 1.1); // 10% increase per level
    }

    await userExperience.update({ xp, level, xpToNextLevel });

    // Assign achievements and fetch only new achievements
    const newAchievements = await assignAchievements(userId);

    // Send response
    res.status(200).json({
      message: "Exercise logged and XP gained successfully.",
      üzenet: "Gyakorlat rögzítve és XP sikeresen hozzáadva.",
      exerciseData: {
        pushUps: exercise.pushUps,
        pullUps: exercise.pullUps,
        sitUps: exercise.sitUps,
        squats: exercise.squats,
        running: exercise.running,
      },
      xpData: {
        currentLevel: level,
        currentXp: xp,
        xpToNextLevel,
        xpGained: totalXpGained,
      },
      achievements: newAchievements.map((ach) => ({
        id: ach.id,
        name: ach.name,
        description: ach.description,
      })),
    });
  } catch (error) {
    console.error("Error logging exercise and gaining XP:", error);
    res.status(500).json({
      message: "An error occurred while logging exercise and gaining XP.",
      üzenet: "Hiba történt a gyakorlat rögzítése és az XP hozzáadása közben.",
    });
  }
};


const statsExercises = async (req, res) => {
  try {
    const totals = await Exercise.findAll({
      attributes: [
        [sequelize.fn('SUM', sequelize.col('pushUps')), 'totalPushUps'],
        [sequelize.fn('SUM', sequelize.col('pullUps')), 'totalPullUps'],
        [sequelize.fn('SUM', sequelize.col('sitUps')), 'totalSitUps'],
        [sequelize.fn('SUM', sequelize.col('squats')), 'totalSquats'],
        [sequelize.fn('SUM', sequelize.col('running')), 'totalRunning'],
      ],
    });

    res.json(totals[0].dataValues);
  } catch (error) {
    console.error('Error fetching exercise sums:', error);
    res.status(500).json({ message: 'Failed to fetch exercise sums.' });
  }
};



module.exports = {
  getAllExercises,
  getUserExercises,
  getExerciseByUserID,
  logExerciseAndGainXP,
  statsExercises
};
