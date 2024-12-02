const { User } = require('../models/User');
const bcrypt = require('bcryptjs');

const getAllUsers = async () => {
    return await User.findAll();
};

const getAllUsersNoPassword = async () => {
    return await User.findAll({
        attributes: ['id', 'firstName', 'lastName', 'email', 'level', 'xp']
    });
};

const getUserByID = async (userId) => {
    return await User.findOne({
        where: { id: userId },
        attributes: ['id', 'firstName', 'lastName', 'email', 'xp', 'created_at']
    });
};

const getUserByEmail = async (email) => {
    return await User.findOne({
        where: { email: email },
        attributes: ['id', 'firstName', 'lastName', 'email', 'xp', 'created_at']
    });
};

const signupUser = async (firstName, lastName, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword
    });
};

const validateLogin = async (email, password) => {
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
        return null;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return null;
    }
    return user;
};

const updatePassword = async (email, newPassword) => {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
        return null;
    }
    return await user.update({ password: hashedPassword });
};

// Gain XP/Level Up logic
const gainXp = async (userId, xpAmount) => {
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
        return null;
    }

    let newXp = user.xp + xpAmount;
    let newLevel = user.level;
    const xpGain = 100;

    while (newXp >= xpGain * newLevel) {
        newLevel++;
    }

    await user.update({ xp: newXp, level: newLevel });
    return { newXp, newLevel }; // Return new XP and Level
};

const deleteUserById = async (userId) => {
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
        return null;
    }
    await user.destroy();
    return user;
};

const deleteUserByEmail = async (email) => {
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
        return null;
    }
    await user.destroy();
    return user;
};

module.exports = {
    getAllUsers,
    getAllUsersNoPassword,
    getUserByID,
    getUserByEmail,
    signupUser,
    validateLogin,
    updatePassword,
    gainXp,
    deleteUserById,
    deleteUserByEmail
};
