const { DataTypes } = require('sequelize');
const sequelize = require('../connection/sequelize');
const User = require('./User');
const Achievement = require('./Achivement');

const UserAchievement = sequelize.define('UserAchievement', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  earnedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'UserAchievements',
  timestamps: false
});

UserAchievement.belongsTo(User, { foreignKey: 'user_id' });
UserAchievement.belongsTo(Achievement, { foreignKey: 'achievement_id' });

module.exports = UserAchievement;
