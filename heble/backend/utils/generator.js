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
const { assignAchievements } = require("../controllers/userAchivementController");

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin";

/** generateUsers -- felhasználók generálása
 *
 * @returns Feltölt random generált felhasználókat a Users táblába és 
 *          egy 'generated_users.json' nevü fájlba leirja el is menti azokat
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
      secureAnswer: "heble"
    };

    const users = await Promise.all(
      Array.from({ length: 10 }).map(async () => {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const email = faker.internet.email();
        const password = await bcrypt.hash(faker.internet.password(), 10);
        const isAdmin = false;
        const secureAnswer = "heble"

        return { firstName, lastName, email, password, isAdmin, secureAnswer };
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

      assignAchievements(user.id);
    }

    console.log("sUCCES!/sIKER!");
  } catch (error) {
    console.error("Error/Hiba:", error);
  }
};



/** generateAchievements - teljesitmény generálás
 * 
 * Előre meghatározott teljesitményeket generál a szerver elinditása után
 * 
 */
const generateAchievements = async () => {
  const achievementsData = [
    {
      name: "Fekvőtámasz mester",
      description: "Végezzen összesen 50 fekvőtámaszt!",
      pushUpsRequired: 50,
      pullUpsRequired: 0,
      squatsRequired: 0,
      runningRequired: 0,
    },
    {
      name: "Húzódzkodás profi",
      description: "Végezzen összesen 20 Húzódzkodást!",
      pushUpsRequired: 0,
      pullUpsRequired: 20,
      squatsRequired: 0,
      runningRequired: 0,
    },
    {
      name: "Guggolás specialista",
      description: "Végezzen összesen 100 guggolást!",
      pushUpsRequired: 0,
      pullUpsRequired: 0,
      squatsRequired: 100,
      runningRequired: 0,
    },
    {
      name: "Újonc futó",
      description: "Fusson összesen 5 kilométert!",
      pushUpsRequired: 0,
      pullUpsRequired: 0,
      squatsRequired: 0,
      runningRequired: 5,
    },
    {
      name: "Sokoldalú sportoló",
      description: "Végezzen el 20 fekvőtámaszt, 10 Húzódzkodást, 30 guggolást és fusson 1 kilométert!",
      pushUpsRequired: 20,
      pullUpsRequired: 10,
      squatsRequired: 30,
      runningRequired: 1,
    },
    {
      name: "Haladó sportoló",
      description: "Érjen el összesen 100 fekvőtámaszt, 50 Húzódzkodást, 150 guggolást és fusson 10 kilométert!",
      pushUpsRequired: 100,
      pullUpsRequired: 50,
      squatsRequired: 150,
      runningRequired: 10,
    },
    {
      name: "Marathon futó",
      description: "Fusson összesen 42 kilométert!",
      pushUpsRequired: 0,
      pullUpsRequired: 0,
      squatsRequired: 0,
      runningRequired: 42,
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
