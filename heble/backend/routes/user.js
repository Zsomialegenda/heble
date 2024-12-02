//Start of Required libraries
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const db = require('../util/database');
const userQueries = require('../queries/userQueries')
// const queris = require('../queries/queris.json');
//End of Required libraries


// Test methods
router.get('/testUserRouteID/:id', (req, res) => {
    console.log('Request reached /user/:id');
    const userId = req.params.id;
    res.status(200).json({ message: `User ID: ${userId}` });
});

router.get('/testUserRoute', (req, res) => {
    res.send("Hello from the user route");
});

// router.get('/test/:id', (req, res) => {
//     const userId = req.params.id;
//     res.status(200).json({ message: `User ID: ${userId}` });
// });



//// START OF GET METHODS ////
///

// Get all users method
router.get('/getAllUsers', async (req, res) => {
    try {
        const users = userQueries.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            message: 'An error occurred while fetching users.',
            üzenet: 'Hiba merült fel az adatok lekérése közben.'
        });
    }
});

// Get all users method exluding fetching password
router.get('/getAllUsersNoPassword', async (req, res) => {
    try {
        const [users] = await db.query('SELECT id, firstName, lastName, email, level, xp FROM Users');
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            message: 'An error occurred while fetching users.',
            üzenet: 'Hiba merült fel az adatok lekérése közben.'
        });
    }
});

//Get user based on ID
router.get('/getUserByID/:id', async (req, res) => {
    const userId = req.params.id * 1;

    try {
        const [user] = await db.query('SELECT id, firstName, lastName, email, xp, created_at FROM users WHERE id = ?'  , [userId]); 
        if (user.length === 0) {
            return res.status(404).json({
                message: 'User not found.',
                üzenet: 'A felhasználó nem található.'
            });
        }
        res.status(200).json(user[0]);
    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            message: 'An error occurred while fetching users.',
            üzenet: 'Hiba merült fel az adatok lekérése közben.'
        });
    }
});

//Get user by E-mail
router.get('/getUserByEmail', async (req, res) => {
     // Expecting email in the request body rather than in the URL (unlike with the ID based method)
    const email = req.body.email;

    try {
        //Let us not send password it wouldn't be too shiny
        const [user] = await db.query('SELECT id, firstName, lastName, email, xp, created_at FROM Users WHERE email = ?', [email]); 
        if (user.length === 0) {
            return res.status(404).json({
                message: 'User not found.',
                üzenet: 'A felhasználó nem található.'
            });
        }
        res.status(200).json(user[0]);
    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            message: 'An error occurred while fetching users.',
            üzenet: 'Hiba merült fel az adatok lekérése közben.'
        });
    }
});

///
//// END OF GET METHODS ////



//// START OF POST METHODS ////
///
//User signup method
router.post('/signupUser', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({
            message: 'All fields are required to fill.',
            üzenet: 'Mindes sor kitöltése szükséges.'
        });
    }

    try {
        const [existingUser] = await db.query('SELECT id FROM Users WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(409).json({
                message: 'E-mail already in use.',
                üzenet: 'E-mail már hasznélatban.'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const [newUser] = await db.query('INSERT INTO Users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)',
                                        [firstName, lastName, email, hashedPassword]);

        res.status(201).json({
            userId: newUser.insertId,
            message: 'User registered successfully!',
            üzenet: 'Felhasználó sikeresen regisztrálva!'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'An error occurred. Please, try again later.',
            üzenet: 'Hiba merült fel. Kérjük, próbálja újra később.'
        });
    }
});

// User login method
router.post("/loginUser", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: 'Both email and password are required for login.',
            üzenet: 'E-mail és jelszó szükséges a bejelentkezéshez. '
        });
    }

    try {
        const [user] = await db.query("SELECT * FROM Users WHERE email = ?", [email]);

        if (user.length === 0) {
            return res.status(401).json({ 
                message: 'Invalid E-mail or password.',
                üzenet: 'Nem megfelelő E-mail vagy jelszó.'
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user[0].password);

        if (!isPasswordValid) {
            return res.status(401).json({ 
                message: 'Invalid E-mail or password.',
                üzenet: 'Nem megfelelő E-mail vagy jelszó.'
            });
        }

        res.status(200).json({ 
            userId: user[0].id,
            message: 'Login successful!',
            üzenet: 'Sikeres bejelentkezés!'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            message: 'An error occurred. Please, try again later.',
            üzenet: 'Hiba merült fel. Kérjük, próbálja újra később.'
        });
    }
});

//Experience gain method (for future mechanics)
router.post('/gain-xp/:id', async (req, res) => {
    const userId = req.params.id; 
    const { xpAmount } = req.body; 

    if (!userId || typeof xpAmount !== 'number') {
        return res.status(400).json({ 
            message: 'Invalid input data.',
            üzenet: 'Nem megfelelő bemenő adat.'
        });
    }

    try {
        const [user] = await db.query('SELECT level, xp FROM Users WHERE id = ?', [userId]);
        if (user.length === 0) {
            return res.status(404).json({
                message: 'User not found.',
                üzenet: 'A felhasználó nem található.'
            });
        }

        const currentUser = user[0];
        const newXp = currentUser.xp + xpAmount;
        let newLevel = currentUser.level;

        const xpGain = 100;

        //Calculate level up
        while (newXp >= xpGain * newLevel) {
            newLevel++;
        }

        await db.query('UPDATE Users SET xp = ?, level = ? WHERE id = ?', [newXp, newLevel, userId]);

        res.status(200).json({
            currentLevel: newLevel,
            currentXp: newXp,
            message: `User leveled up to level ${newLevel}!`,
            üzenet: `Felhasználó szintet lépett ${newLevel}`
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'An error occurred. Please, try again later.',
            üzenet: 'Hiba merült fel. Kérjük, próbálja újra később.'
        });
    }
});
//
///
//// END OF POST METHODS ////



//// START OF PATCH METHODS ////
///
// Start of Update method
router.patch('/updateUser', async (req, res) => { //might change to ID
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
        return res.status(400).json({
            message: 'E-mail and new password are required.',
            üzenet: 'E-mail és új jelszó szükséfes.'
        });
    }

    try {
        const [user] = await db.query('SELECT * FROM Users WHERE email = ?', [email]);
        if (user.length === 0) {
            return res.status(404).json({
                message: 'User not found.',
                üzenet: 'A felhasználó nem található.'
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await db.query('UPDATE Users SET password = ? WHERE email = ?', [hashedPassword, email]);

        res.status(200).json({
            message: 'Password updated successfully!',
            üzenet: 'Jelszó sikeresen frisítve!'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'An error occurred while updating the password.',
            üzenet: 'Hiba merült fel a jelsző frissítése közben.'
        });
    }
});
//
///
//// END OF PATCH METHODS ////



//// START OF DELETE METHODS ////
///
// User Delete method based on ID
router.delete('/deleteUser/:id', async (req, res) => {
    const userId = req.params.id;

    try {
        const [user] = await db.query('SELECT * FROM Users WHERE id = ?', [userId]);
        if (user.length === 0) {
            return res.status(404).json({
                message: 'User not found.',
                üzenet: 'A felhasználó nem található.'
            });
        }

        await db.query('DELETE FROM Users WHERE id = ?', [userId]);

        res.status(200).json({
            message: 'User deleted successfully.',
            üzenet: 'Felhasználó sikeresen törölve.'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'An error occurred while deleting the user.',
            üzenet: 'Hiba merült fel a felhasználó törlése közben.'
        });
    }
});

// User Delete method based on E-mail
router.delete('/deleteUser', async (req, res) => {
    // Expecting email in the request body rather than in the URL (unlike with the ID based method)
    const email = req.body.email;

    try {
        const [user] = await db.query('SELECT * FROM Users WHERE email = ?', [email]);
        if (user.length === 0) {
            return res.status(404).json({
                message: 'User not found.',
                üzenet: 'A felhasználó nem található.'
            });
        }

        await db.query('DELETE FROM Users WHERE email = ?', [email]);

        res.status(200).json({
            message: 'User deleted successfully.',
            üzenet: 'Felhasználó sikeresen törölve.'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'An error occurred while deleting the user.',
            üzenet: 'Hiba merült fel a felhasználó törlése közben.'
        });
    }
});

//
///
//// END OFF DELETE METHODS



module.exports = router;



//sequelize library         promise