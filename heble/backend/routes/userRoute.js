const express = require('express');
const router = express.Router();
const {
    getAllUsers,
    getUserByEmail,
    getUserByID,
    signupUser,
    loginUser,
    logoutUser,
    updateUser,
    deleteUser,
    countUsers,
} = require('../controllers/userController');

// GET metódusojk
router.get('/', getAllUsers);
router.get('/count', countUsers);
router.get('/email', getUserByEmail);
router.get('/:userId', getUserByID);

// POST metódusojk
router.post('/login', loginUser);
router.post('/logout', logoutUser);

// PUT metódusojk
router.put('/signup', signupUser);

// PATCH metódusojk
router.patch('/patch/:userId', updateUser);

// DELETE metódusojk
router.delete('/delete/:id?', deleteUser);

module.exports = router;
