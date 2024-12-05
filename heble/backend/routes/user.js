//Start of Required libraries
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const db = require('../util/database');
const userQueries = require('../queries/userQueries')
// const queris = require('../queries/queris.json');
//End of Required libraries


// Test methods
router.get('/testUserRouteID/:id', );

router.get('/testUserRoute', );

// router.get('/test/:id', (req, res) => {
//     const userId = req.params.id;
//     res.status(200).json({ message: `User ID: ${userId}` });
// });



//// START OF GET METHODS ////
///

// Get all users method
router.get('/getAllUsers', );

// Get all users method exluding fetching password
router.get('/getAllUsersNoPassword', );

//Get user based on ID
router.get('/getUserByID/:id', );

//Get user by E-mail
router.get('/getUserByEmail', );

///
//// END OF GET METHODS ////



//// START OF POST METHODS ////
///

//User signup method
router.post('/signupUser', );

// User login method
router.post("/loginUser", );

//Experience gain method (for future mechanics)
router.post('/gain-xp/:id', );

///
//// END OF POST METHODS ////



//// START OF PATCH METHODS ////
///

// Start of Update method
router.patch('/updateUser', );

///
//// END OF PATCH METHODS ////



//// START OF DELETE METHODS ////
///

// User Delete method based on ID
router.delete('/deleteUserID/:id', );

// User Delete method based on E-mail
router.delete('/deleteUserEmail', );

//
///
//// END OFF DELETE METHODS



module.exports = router;



//sequelize library         promise
