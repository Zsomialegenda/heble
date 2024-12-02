// const { validationResult } = require('express-validator');
// const bcrypt = require('bcryptjs');
// const User = require('../models/user');

// exports.signup = async (req, res, next) => {
//     const errors = validationResult(req);

//     // Handle validation errors
//     if (!errors.isEmpty()) {
//         return res.status(422).json({ errors: errors.array() });
//     }

//     const name = req.body.name;
//     const email = req.body.email;
//     const password = req.body.password;

//     try {
//         // Hash the password
//         const hashedPassword = await bcrypt.hash(password, 12);
        
//         // Prepare user details with hashed password
//         const userDetails = {
//             name: name,
//             email: email,
//             password: hashedPassword // Use hashed password here
//         };

//         // Save user to the database
//         const results = await User.save(userDetails);

//         // Respond with success
//         res.status(201).json({ message: 'User is registered!' });
//     } catch (err) {
//         if (!err.statusCode) {
//             err.statusCode = 500; // Correct error assignment
//         }

//         // Pass error to the next middleware
//         next(err);
//     }
// };
