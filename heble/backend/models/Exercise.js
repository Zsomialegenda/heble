const { DataTypes } = require('sequelize');
const sequelize = require('../connection/sequelize');

const Exercise = sequelize.define('Exercise', {
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
  pushUps: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  pullUps: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  squats: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  running: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
}, {
  timestamps: true,
  tableName: 'Exercises',
});

module.exports = Exercise;
