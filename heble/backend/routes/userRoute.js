const express = require('express');
const router = express.Router();
const {
    testUserRoute,
    testUserRouteID,
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

// Test Routes
router.get('/testUserRoute', testUserRoute);
router.get('/testUserRouteID/:id', testUserRouteID);

// GET Methods
router.get('/', getAllUsers);
router.get('/stats', countUsers);
router.get('/email', getUserByEmail);
router.get('/:userId', getUserByID);

// POST Methods
router.post('/login', loginUser);
router.post('/logout', logoutUser);

// PUT Methods
router.put('/signup', signupUser);

// PATCH Methods
router.patch('/patch/:userId', updateUser);

// DELETE Method
router.delete('/delete/:id?', deleteUser);

module.exports = router;
