//Start of Required libraries
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
//End of Required libraries


// Test methods
router.get('/testUserRoute', userController.testUserRoute);
router.get('/testUserRouteID/:id', userController.testUserRouteID);


//// START OF GET METHODS ////
///

// Get all users method
router.get('/getAllUsers', userController.getAllUsers);

// Get all users method exluding fetching password
router.get('/getAllUsersNoPassword', userController.getAllUsersNoPassword);

//Get user based on ID
router.get('/getUserByID/:id', userController.getUserByID);

//Get user by E-mail
router.get('/getUserByEmail', userController.getUserByEmail);

///
//// END OF GET METHODS ////



//// START OF POST METHODS ////
///

//User signup method
router.post('/signupUser', userController.signupUser);

// User login method
router.post("/loginUser", userController.loginUser);

//Experience gain method (for future mechanics)
router.post('/gain-xp/:id', userController.gainXP);




//// START OF PATCH METHODS ////
///
// Start of Update method
router.patch('/updatePassword', userController.updatePassword);




//// START OF DELETE METHODS ////
///

// User Delete method based on ID
router.delete('/deleteUserID/:id', userController.deleteUserByID);

// User Delete method based on E-mail
router.delete('/deleteUserEmail', userController.deleteUserByEmail);


module.exports = router;

