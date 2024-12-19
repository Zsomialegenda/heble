const { DataTypes } = require('sequelize');
const sequelize = require('../connection/sequelize');

const Achievement = sequelize.define('Achievement', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.TEXT,
  },
  points: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
}, {
  timestamps: true,
  tableName: 'Achievements',
});

module.exports = Achievement;
