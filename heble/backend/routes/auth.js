const express = require('express');
const { body } = require('express-validator');

const router = express.Router();

const User = require('../models/User');
const authController = require('../controllers/authController')

router.post(
    '/signup', 
    [
        body('name').trim().not().isEmpty().withMessage('Name is required.'),
        body('email').isEmail().withMessage('Please enter a valid email.')
        .custom(async (email) => {
            const user = await User.find(email);
            if (user[0].length > 0) {
                return Promise.reject('Email address already exist!');
            }
        })
        .normalizeEmail(),
        body('password').trim().isLength({ min: 7 })
    ], authController.signup
)

module.exports = router;