const { DataTypes } = require("sequelize");
const sequelize = require("../utils/sequelize");

const Achievement = sequelize.define(
  "Achievement",
  {
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
    pushUpsRequired: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    pullUpsRequired: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    sitUpsRequired: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    squatsRequired: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    runningRequired: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    timestamps: true,
    tableName: "Achievements",
  }
);

module.exports = Achievement;
