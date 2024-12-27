const sequelize = require('../connection/sequelize');

const User = require('./User');
const Achievement = require('./Achivement');
const Exercise = require('./Exercise');
const Token = require('./Token');
const UserAchievement = require('./UserAchivement');
const UserExperience = require('./UserExperience');

// Define relationships
User.hasMany(Exercise, { foreignKey: 'userId' });
Exercise.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Token, { foreignKey: 'userId' });
Token.belongsTo(User, { foreignKey: 'userId' });

User.belongsToMany(Achievement, { through: UserAchievement, foreignKey: 'userId' });
Achievement.belongsToMany(User, { through: UserAchievement, foreignKey: 'achievementId' });

User.hasOne(UserExperience, { foreignKey: 'userId', onDelete: 'CASCADE' });
UserExperience.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
  sequelize,
  User,
  Achievement,
  Exercise,
  Token,
  UserAchievement,
  UserExperience,
};
