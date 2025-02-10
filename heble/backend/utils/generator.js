const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
const { faker } = require("@faker-js/faker");

const {
  sequelize,
  User,
  Exercise,
  Achievement,
  UserExperience,
  Token,
  DeletedOrBannedUser,
  UserAchievement,
} = require("../models");

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin";

/**
 * 
 * @returns 
 */
const generateUsers = async (req, res) => {
  try {
    const existingUsers = await User.count();
    if (existingUsers > 0) {
      return;
    }

    const hashedAdminPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);

    const adminUser = {
      firstName: "Admin",
      lastName: "User",
      email: ADMIN_USERNAME,
      password: hashedAdminPassword,
      isAdmin: true,
    };

    const users = await Promise.all(
      Array.from({ length: 10 }).map(async () => {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const email = faker.internet.email();
        const password = await bcrypt.hash(faker.internet.password(), 10);
        const isAdmin = false;

        return { firstName, lastName, email, password, isAdmin };
      })
    );

    const allUsers = [adminUser, ...users];
    const createdUsers = await User.bulkCreate(allUsers, { returning: true });

    for (const user of createdUsers) {
      const exercise = await Exercise.create({
        userId: user.id,
        pushUps: faker.number.int({ min: 0, max: 200 }),
        pullUps: faker.number.int({ min: 0, max: 100 }),
        sitUps: faker.number.int({ min: 0, max: 300 }),
        squats: faker.number.int({ min: 0, max: 500 }),
        running: faker.number.float({ min: 0, max: 50, precision: 0.1 }),
      });

      await UserExperience.create({
        userId: user.id,
        level: faker.number.int({ min: 1, max: 10 }),
        xp: faker.number.int({ min: 0, max: 500 }),
        xpToNextLevel: faker.number.int({ min: 100, max: 1000 }),
      });
    }

    console.log("sUCCES!/sIKER!");
    return res.status(200).JSON(
      
    )
  } catch (error) {
    console.error("Error/Hiba:", error);
  }
};



/**
 * 
 */
const generateAchievements = async () => {
  const achievementsData = [
    {
      name: "Push-Up Master",
      description: "Complete 50 push-ups in total.",
      pushUpsRequired: 50,
      pullUpsRequired: 0,
      squatsRequired: 0,
      runningRequired: 0,
    },
    {
      name: "Pull-Up Pro",
      description: "Complete 20 pull-ups in total.",
      pushUpsRequired: 0,
      pullUpsRequired: 20,
      squatsRequired: 0,
      runningRequired: 0,
    },
    {
      name: "Squat Specialist",
      description: "Perform 100 squats in total.",
      pushUpsRequired: 0,
      pullUpsRequired: 0,
      squatsRequired: 100,
      runningRequired: 0,
    },
    {
      name: "Running Rookie",
      description: "Run 5 kilometers in total.",
      pushUpsRequired: 0,
      pullUpsRequired: 0,
      squatsRequired: 0,
      runningRequired: 5000,
    },
    {
      name: "Fitness All-Rounder",
      description: "Complete 20 push-ups, 10 pull-ups, 30 squats, and run 1 kilometer.",
      pushUpsRequired: 20,
      pullUpsRequired: 10,
      squatsRequired: 30,
      runningRequired: 1000,
    },
    {
      name: "Advanced Athlete",
      description: "Achieve 100 push-ups, 50 pull-ups, 150 squats, and run 10 kilometers.",
      pushUpsRequired: 100,
      pullUpsRequired: 50,
      squatsRequired: 150,
      runningRequired: 10000,
    },
    {
      name: "Marathon Runner",
      description: "Run a total of 42 kilometers.",
      pushUpsRequired: 0,
      pullUpsRequired: 0,
      squatsRequired: 0,
      runningRequired: 42000,
    },
  ];

  try {
    for (const achievement of achievementsData) {
      await Achievement.findOrCreate({
        where: { name: achievement.name },
        defaults: achievement,
      });
    }
  } catch (error) {
    console.error("Error initializing achievements:", error);
  }
};

module.exports = {
  generateUsers,
  generateAchievements,
};
