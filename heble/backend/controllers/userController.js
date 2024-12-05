const Users = require('../models/User');
const bcrypt = require('bcryptjs');

const Achievement = require('../models/Achivement');
const UserAchievement = require('../models/UserAchivement');


const testUserRoute = (req, res) => {
    res.send("Hello from the user route");
    console.log(Users);
};

const testUserRouteID = (req, res) => {
    console.log('Request reached /user/:id');
    const userId = req.params.id;
    res.status(200).json({ message: `User ID: ${userId}` });
};

const getAllUsers = async (req, res) => {
    try {
        const users = await Users.findAll();
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            message: 'An error occurred while fetching users.',
            üzenet: 'Hiba merült fel az adatok lekérése közben.'
        });
    }
};

const getAllUsersNoPassword = async (req, res) => {
    try {
        //Let us not send password it wouldn't be too shiny
        const users = await Users.findAll({
            attributes: ['id', 'firstName', 'lastName', 'email', 'level', 'xp', 'createdAt', 'updatedAt']
        });
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            message: 'An error occurred while fetching users.',
            üzenet: 'Hiba merült fel az adatok lekérése közben.'
        });
    }
};

const getUserByID = async (req, res) => {
    const userId = req.params.id * 1;

    try {
        const user = await Users.findOne({
            where: { id: userId },
            attributes: ['id', 'firstName', 'lastName', 'email', 'xp', 'createdAt', 'updatedAt']
        });
        if (user.length === 0) {
            return res.status(404).json({
                message: 'User not found.',
                üzenet: 'A felhasználó nem található.'
            });
        }
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            message: 'An error occurred while fetching users.',
            üzenet: 'Hiba merült fel az adatok lekérése közben.'
        });
    }
};

const getUserByEmail = async (req, res) => {
    // Expecting email in the request body rather than in the URL (unlike with the ID based method)
   const email = req.body.email;

   try {
       //Let us not send password it wouldn't be too shiny
       const user = await Users.findOne({
        where: { email: email },
        attributes: ['id', 'firstName', 'lastName', 'email', 'xp', 'createdAt', 'updatedAt']
    });
       if (user.length === 0) {
           return res.status(404).json({
               message: 'User not found.',
               üzenet: 'A felhasználó nem található.'
           });
       }
       res.status(200).json(user);
   } catch (error) {
       console.log(error);
       res.status(500).json({ 
           message: 'An error occurred while fetching users.',
           üzenet: 'Hiba merült fel az adatok lekérése közben.'
       });
   }
};

const listAchivements = async (req, res) => {
    try {
      const userId = req.params.userId;
      const achievements = await UserAchievement.findAll({
        where: { user_id: userId },
        include: [Achievement]
      });
  
      res.status(200).json(achievements);
    } catch (error) {
      console.error('Error fetching user achievements:', error);
      res.status(500).json({
        message: 'Failed to fetch achievements.'
      });
    }
}

const signupUser = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({
            message: 'All fields are required to fill.',
            üzenet: 'Mindes sor kitöltése szükséges.'
        });
    }

    try {
        const [existingUser] = await Users.findOne({ where: { email: email } });
        if (existingUser.length > 0) {
            return res.status(409).json({
                message: 'E-mail already in use.',
                üzenet: 'E-mail már hasznélatban.'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const [newUser] = await Users.create({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });
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
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: 'Both email and password are required for login.',
            üzenet: 'E-mail és jelszó szükséges a bejelentkezéshez. '
        });
    }

    try {
        const [user] = await Users.findOne({ where: { email: email } });

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
};

const gainXP = async (req, res) => {
    const userId = req.params.id; 
    const { xpAmount } = req.body; 

    if (!userId || typeof xpAmount !== 'number') {
        return res.status(400).json({ 
            message: 'Invalid input data.',
            üzenet: 'Nem megfelelő bemenő adat.'
        });
    }

    try {
        const user = await Users.findOne({ where: { id: userId } });
        if (user.length === 0) {
            return res.status(404).json({
                message: 'User not found.',
                üzenet: 'A felhasználó nem található.'
            });
        }

        const currentUser = user;
        const newXp = currentUser.xp + xpAmount;
        let newLevel = currentUser.level;

        const xpGain = 100;

        //Calculate level up
        while (newXp >= xpGain * newLevel) {
            newLevel++;
        }

        await user.update({ xp: newXp, level: newLevel });

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
};

const updatePassword = async (req, res) => { //might change to ID
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
        return res.status(400).json({
            message: 'E-mail and new password are required.',
            üzenet: 'E-mail és új jelszó szükséfes.'
        });
    }

    try {
        const [user] = await Users.findOne({ where: { email: email } });
        if (user.length === 0) {
            return res.status(404).json({
                message: 'User not found.',
                üzenet: 'A felhasználó nem található.'
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await user.update({ password: hashedPassword });

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
};

const deleteUserByID = async (req, res) => {
    const userId = req.params.id * 1;

    try {
        const user = await Users.findOne({ where: { id: userId } });
        if (user.length === 0) {
            return res.status(404).json({
                message: 'User not found.',
                üzenet: 'A felhasználó nem található.'
            });
        }

        await user.destroy();

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
};

const deleteUserByEmail = async (req, res) => {
    // Expecting email in the request body rather than in the URL (unlike with the ID based method)
    const email = req.body.email;

    try {
        const user = await Users.findOne({ where: { email: email } });
        if (user.length === 0) {
            return res.status(404).json({
                message: 'User not found.',
                üzenet: 'A felhasználó nem található.'
            });
        }

        await user.destroy();

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
};

module.exports = {
    testUserRoute,
    testUserRouteID,
    getAllUsers,
    getAllUsersNoPassword,
    getUserByID,
    getUserByEmail,
    listAchivements,
    signupUser,
    loginUser,
    gainXP,
    updatePassword,
    deleteUserByID,
    deleteUserByEmail
};