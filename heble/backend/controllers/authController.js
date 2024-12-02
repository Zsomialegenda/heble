const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Signup method
exports.signup = async (req, res, next) => {
    const errors = validationResult(req);

    // Handle validation errors
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);
        
        // Prepare user details with hashed password
        const userDetails = {
            name: name,
            email: email,
            password: hashedPassword,
        };

        // Save user to the database
        const results = await User.save(userDetails);

        // Respond with success
        res.status(201).json({ message: 'User is registered!' });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500; // Ensure proper error status
        }

        next(err); // Pass error to error-handling middleware
    }
};
