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
router.get('', userController.getAllUsers);
// Get all users method exluding fetching password
router.get('/noPass', userController.getAllUsersNoPassword);


//Get user by E-mail
router.get('/email', userController.getUserByEmail);

//Get user based on ID
router.get('/:id', userController.getUserByID);
///
//// END OF GET METHODS ////



//// START OF POST METHODS ////
///

//User signup method
router.put('/signup', userController.signupUser);

// User login method
router.post("/login", userController.loginUser);

//Experience gain method (for future mechanics)
router.post('/xp/:id', userController.gainXP);
router.post('/xp', userController.gainXP);





//// START OF PATCH METHODS ////
///
// Start of Update method
router.patch('/patch/:id', userController.updateUser);

//// START OF DELETE METHODS ////
///
router.delete('/deleteUserID/:id', userController.deleteUser);


module.exports = router;

