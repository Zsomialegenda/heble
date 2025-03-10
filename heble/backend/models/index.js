const sequelize = require('../utils/sequelize');

const User = require('./User');
const Achievement = require('./Achivement');
const Exercise = require('./Exercise');
const Token = require('./Token');
const UserAchievement = require('./UserAchivement');
const UserExperience = require('./UserExperience');
const DeletedOrBannedUser = require('./DeletedOrBannedUsers');

// User <-> Exercise (One-to-One)
User.hasOne(Exercise, { foreignKey: 'userId', onDelete: 'CASCADE' });
Exercise.belongsTo(User, { foreignKey: 'userId' });

// User <-> Token (One-to-Many)
User.hasOne(Token, { foreignKey: 'userId', onDelete: 'CASCADE' });
Token.belongsTo(User, { foreignKey: 'userId' });

// User <-> Achievement (Many-to-Many, UserAchievement keresztül)
User.belongsToMany(Achievement, { through: UserAchievement, foreignKey: 'userId', onDelete: 'CASCADE' });
Achievement.belongsToMany(User, { through: UserAchievement, foreignKey: 'achievementId' });

// UserExperience (One-to-One)
User.hasOne(UserExperience, { foreignKey: 'userId', onDelete: 'CASCADE' });
UserExperience.belongsTo(User, { foreignKey: 'userId' });

// Achievement <-> UserAchievement (One-to-Many)
Achievement.hasMany(UserAchievement, { foreignKey: 'achievementId', onDelete: 'CASCADE' });
UserAchievement.belongsTo(Achievement, { foreignKey: 'achievementId' });

// User <-> UserAchievement (One-to-Many)
User.hasMany(UserAchievement, { foreignKey: 'userId', onDelete: 'CASCADE' });
UserAchievement.belongsTo(User, { foreignKey: 'userId' });


module.exports = {
  sequelize,
  User,
  Achievement,
  Exercise,
  Token,
  UserAchievement,
  UserExperience,
  DeletedOrBannedUser
};
