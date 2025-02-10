const { DataTypes } = require('sequelize');
const sequelize = require('../utils/sequelize');

const Exercise = sequelize.define('Exercise', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    references: {
      model: 'Users',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  pushUps: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
  pullUps: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
  sitUps: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
  squats: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
  running: {
    type: DataTypes.FLOAT,
    defaultValue: 0.0,
    allowNull: false,
    comment: 'Running distance in kilometers',
  },
}, {
  tableName: 'Exercises',
  timestamps: true
});

module.exports = Exercise;
