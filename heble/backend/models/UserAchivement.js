const { DataTypes } = require('sequelize');
const sequelize = require('../utils/sequelize');

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
      model: 'users',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  achievementId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'achievements',
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
  tableName: 'UserAchievements'
});

module.exports = UserAchievement;
