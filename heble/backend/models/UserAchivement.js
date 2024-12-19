const { DataTypes } = require('sequelize');
const sequelize = require('../connection/sequelize');
const { User, Exercise, Achievement, Token } = require('../models');

const UserAchievement = sequelize.define('UserAchievement', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  achievementId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Achievements',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  earnedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: false,
  tableName: 'UserAchievements',
});

User.hasMany(Exercise, { foreignKey: 'userId' });
Exercise.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Token, { foreignKey: 'userId' });
Token.belongsTo(User, { foreignKey: 'userId' });

User.belongsToMany(Achievement, { through: UserAchievement, foreignKey: 'userId' });
Achievement.belongsToMany(User, { through: UserAchievement, foreignKey: 'achievementId' });

module.exports = UserAchievement;
