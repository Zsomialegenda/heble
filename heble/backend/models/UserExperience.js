const { DataTypes } = require('sequelize');
const sequelize = require('../utils/sequelize');

const UserExperience = sequelize.define('UserExperience', {
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
    level: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
    xp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    xpToNextLevel: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 100,
    },
}, {
    timestamps: true,
    tableName: 'UserExperience'
});

module.exports = UserExperience;
