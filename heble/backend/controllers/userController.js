/** 
 * 
 * 
 */

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sequelize = require('../connection/sequelize');
const { User, Exercise, Achievements, UserAchievements, UserExperience, Token } = require('../models');

const SECRET_KEY = 'Kicsicsirke_1298';

/** getAllUsers -- az összes felhasználó lekérdezése
 * 
 * @param {*} req Nincs
 * @param {*} res Vissza adja az összes felhasználó adatát | különben szerver hiba
 */
const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({ include: [Exercise, UserExperience, UserAchievements] });
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            message: 'An error occurred while fetching users.',
            üzenet: 'Hiba merült fel az adatok lekérése közben.'
        });
    }
};

/** countUsers -- felhasználók megszámlálása
 * 
 * @param {*} req Nem kér vissza semmit
 * @param {*} res Vissza küldi a felhasználók számát statisztikai célokra //
 *                Hibaként pedig szerverhibát ad vissza
 */
const countUsers = async (req, res) => {
    try {
        const userCount = await User.count();
        res.status(200).json({
            status: 200,
            message: 'User count fetched successfully.',
            üzenet: 'Felhasználók száma sikeresen lekérve.',
            userCount,
        });
    } catch (error) {
        console.error('Error fetching user count:', error);
        res.status(500).json({
            status: 500,
            message: 'Error fetching user count.',
            üzenet: 'Hiba történt a felhasználók számának lekérése közben.',
        });
    }
};

/** getUserByID -- ID alapú lekérdezés egy felhasználóra
 * 
 * @param {*} req ID-t kér be az üzenet törzsébe
 * @param {*} res Vissza küld egy felhasználó összes adatát a jelszón kívűl | különben szerver hiba
 * @returns Hibát ad vissza ha nem egy szám az ID vagy ha nem található
 */
const getUserByID = async (req, res) => {
    const userId = parseInt(req.params.userId, 10);

    if (isNaN(userId)) {
        return res.status(400).json({
            message: 'Invalid user ID.',
            üzenet: 'Érvénytelen felhasználói azonosító.'
        });
    }

    try {
        const user = await User.findOne({
            where: { id: userId },
            attributes: ['id', 'firstName', 'lastName', 'email', 'createdAt', 'updatedAt'],
            include: [Exercise, UserExperience]
        });

        if (!user) {
            return res.status(404).json({
                status: 404,
                message: 'User not found.',
                üzenet: 'A felhasználó nem található.'
            });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            message: 'An error occurred while fetching the user.',
            üzenet: 'Hiba merült fel a felhasználó lekérése közben.'
        });
    }
};

/** getUserByEmail -- e-mail alapú lekérdezés egy felhasználóra
 * 
 * @param {*} req Egy e-mail az üzenet törzsébe
 * @param {*} res Vissza adja egy felhasználó minden adatát a jelszó kivételvel | különben szerver hiba
 * @returns Hibát ad vissza ha nincs megadva e-mail/nem található felhasználó
 */
const getUserByEmail = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({
            message: 'Email is required.',
            üzenet: 'Az email megadása kötelező.'
        });
    }

    try {
        const user = await User.findOne({
            where: { email },
            attributes: ['id', 'firstName', 'lastName', 'email', 'createdAt', 'updatedAt'],
            include: [Exercise, UserExperience]
        });

        if (!user) {
            return res.status(404).json({
                status: 404,
                message: 'User not found.',
                üzenet: 'A felhasználó nem található.'
            });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            message: 'An error occurred while fetching the user.',
            üzenet: 'Hiba merült fel a felhasználó lekérése közben.'
        });
    }
};

/** signupUser -- felhasználó regisztrálása
 * 
 * @param {*} req Az üzenetbe kerül a név, e-mail és jelszó
 * @param {*} res Válaszként vissza küldi hogy a felhasználó létre lett hozva | különben szerver hiba
 * @returns Hibákat küld vissza:
 *              1. nincs minden mező kitöltve
 *              2. az e-mail használatban van
 */
const signupUser = async (req, res) => {
    const transaction = await sequelize.transaction();

    try {
        const { firstName, lastName, email, password } = req.body;

        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({
                status: 400,
                message: 'All fields are required.',
                üzenet: 'Minden mező kitöltése kötelező.',
            });
        }

        const existingUser = await User.findOne({ where: { email }, transaction });
        if (existingUser) {
            return res.status(409).json({
                status: 409,
                message: 'E-mail already in use.',
                üzenet: 'E-mail már használatban van.',
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create(
            {
                firstName,
                lastName,
                email,
                password: hashedPassword,
            },
            { transaction }
        );

        await Exercise.create(
            {
                userId: newUser.id,
                pushUps: 0,
                pullUps: 0,
                squats: 0,
                running: 0,
            },
            { transaction }
        );

        await UserExperience.create(
            {
                userId: newUser.id,
                level: 1,
                xp: 0,
                xpToNextLevel: 100,
            },
            { transaction }
        );

        await transaction.commit();

        res.status(201).json({
            status: 201,
            userId: newUser.id,
            message: 'User registered successfully!',
            üzenet: 'Felhasználó sikeresen regisztrálva!',
        });
    } catch (error) {
        if (transaction) await transaction.rollback();
        res.status(500).json({
            status: 500,
            message: 'An error occurred. Please try again later.',
            üzenet: 'Hiba merült fel. Kérjük, próbálja újra később.',
        });
    }
};

/** loginUser -- felhasználó bejelentkezés
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Kicsicsirke_1298';

    if (!email || !password) {
        return res.status(400).json({
            status: 400,
            message: 'Both email and password are required for login.',
            üzenet: 'E-mail és jelszó szükséges a bejelentkezéshez.',
        });
    }

    if (email === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        try {
            const loginTimestamp = new Date().toISOString();
            const adminToken = jwt.sign(
                {
                    username: ADMIN_USERNAME,
                    role: 'admin',
                    loginAt: loginTimestamp,
                },
                SECRET_KEY,
                { expiresIn: '8h' }
            );

            console.log('Admin Login Successful');
            console.log('Generated Admin JWT Token:', adminToken);

            return res.status(200).json({
                status: 200,
                token: adminToken,
                loginAt: loginTimestamp,
                message: 'Admin login successful!',
                üzenet: 'Sikeres admin bejelentkezés!',
            });
        } catch (error) {
            console.error('Error generating admin token:', error);
            return res.status(500).json({
                status: 500,
                message: 'An error occurred during admin login. Please try again.',
                üzenet: 'Hiba történt az admin bejelentkezés során. Kérjük, próbálja újra.',
            });
        }
    }

    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({
                status: 401,
                message: 'Invalid email or password.',
                üzenet: 'Nem megfelelő E-mail vagy jelszó.',
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                status: 401,
                message: 'Invalid email or password.',
                üzenet: 'Nem megfelelő E-mail vagy jelszó.',
            });
        }

        const loginTimestamp = new Date().toISOString();
        const userToken = jwt.sign(
            {
                userId: user.id,
                email: user.email,
                loginAt: loginTimestamp,
            },
            SECRET_KEY,
            { expiresIn: '8h' }
        );

        // Save the token in the database with an expiration time
        const expiresAt = new Date(Date.now() + 8 * 60 * 60 * 1000);
        await Token.create({
            userId: user.id,
            token: userToken,
            loginAt: loginTimestamp,
            expiresAt,
        });

        console.log('User Login Successful');
        console.log('Generated User JWT Token:', userToken);

        return res.status(200).json({
            status: 200,
            userId: user.id,
            token: userToken,
            loginAt: loginTimestamp,
            message: 'Login successful!',
            üzenet: 'Sikeres bejelentkezés!',
        });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({
            status: 500,
            message: 'An error occurred. Please try again later.',
            üzenet: 'Hiba merült fel. Kérjük, próbálja újra később.',
        });
    }
};

/** logoutUser -- felhasználó kijelentkezés
 * 
 * @param {*} req Üzenetbe tokent kér
 * @param {*} res Kitörli a táblából a tokent és kijelentkeztet | különben szerver hiba
 * @returns Hibákat ad vissza ha:
 *          1. Nincs token
 *          2. Nem található a token
 *          3. Már törölve van
 */
const logoutUser = async (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.status(400).json({
            status: 400,
            message: 'Token is required for logout.',
            üzenet: 'A kijelentkezéshez token szükséges.'
        });
    }

    try {
        const tokenRecord = await Token.findOne({ where: { token } });

        if (!tokenRecord) {
            return res.status(404).json({
                status: 404,
                message: 'Token not found or already invalidated.',
                üzenet: 'A token nem található vagy már érvénytelenítve lett.'
            });
        }

        await tokenRecord.destroy();

        res.status(200).json({
            status: 200,
            message: 'Logout successful.',
            üzenet: 'Sikeres kijelentkezés.'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            message: 'An error occurred. Please try again later.',
            üzenet: 'Hiba merült fel. Kérjük, próbálja újra később.'
        });
    }
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const updateUser = async (req, res) => { //TODO jobbra megcsinálni az update-et
    const { email, password, newEmail, newPassword } = req.body;
    const userId = parseInt(req.params.userId, 10); // user id from URL params

    if (isNaN(userId)) {
        return res.status(400).json({
            message: 'Invalid user ID.',
            üzenet: 'Érvénytelen felhasználói azonosító.'
        });
    }  

    try {
        if (isAdmin(req)) {
            // Admin can modify any user's account using userId or email
            if (!email && !userId) {
                return res.status(400).json({
                    status: 400,
                    message: 'Provide either user ID or email.',
                    üzenet: 'Adjon meg azonosítót vagy e-mailt.'
                });
            }

            let user;
            if (email) {
                user = await User.findOne({ where: { email } });
            } else if (userId) {
                user = await User.findOne({ where: { id: userId } });
            }

            if (!user) {
                return res.status(404).json({
                    status: 404,
                    message: 'User not found.',
                    üzenet: 'A felhasználó nem található.'
                });
            }

            // Update the email if newEmail is provided
            if (newEmail) {
                user.email = newEmail;
            }

            // Update the password if newPassword is provided
            if (newPassword) {
                const hashedPassword = await bcrypt.hash(newPassword, 10);
                user.password = hashedPassword;
            }

            await user.save();

            return res.status(200).json({
                status: 200,
                message: 'User account updated successfully.',
                üzenet: 'Felhasználói fiók sikeresen frissítve.'
            });
        } else {
            // Non-admin users can only modify their own account
            const user = await User.findOne({ where: { id: userId } });
            if (!user) {
                return res.status(404).json({
                    status: 404,
                    message: 'User not found.',
                    üzenet: 'A felhasználó nem található.'
                });
            }

            if (user.id !== userId) {
                return res.status(403).json({
                    status: 403,
                    message: 'Forbidden. You can only update your own account.',
                    üzenet: 'Tilos. Csak a saját fiókját módosíthatja.'
                });
            }

            if (newEmail) {
                user.email = newEmail;
            }

            if (newPassword) {
                const hashedPassword = await bcrypt.hash(newPassword, 10);
                user.password = hashedPassword;
            }

            await user.save();

            return res.status(200).json({
                status: 200,
                message: 'User account updated successfully.',
                üzenet: 'Felhasználói fiók sikeresen frissítve.'
            });
        }
    } catch (error) {
        console.error('Error updating user account:', error);
        res.status(500).json({
            status: 500,
            message: 'An error occurred while updating the user account.',
            üzenet: 'Hiba történt a felhasználói fiók frissítésekor.'
        });
    }
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const deleteUser = async (req, res) => { //TODO tokenből kinyerni a szükséges adatokat
    try {

        const { id, email } = req.body; // For payload-based delete
        const userId = req.params.id; // For URL-based delete

        if (email) {
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(404).json({
                    status: 404,
                    message: 'User not found by email.',
                    üzenet: 'Felhasználó nem található email alapján.'
                });
            }

            await user.destroy();
            return res.status(200).json({
                status: 200,
                message: 'User deleted successfully by email.',
                üzenet: 'Felhasználó sikeresen törölve email alapján.'
            });
        } else if (id || userId) {
            const user = await User.findOne({ where: { id: id || userId } });
            if (!user) {
                return res.status(404).json({
                    status: 404,
                    message: 'User not found by ID.',
                    üzenet: 'Felhasználó nem található azonosító alapján.'
                });
            }

            await user.destroy();
            return res.status(200).json({
                status: 200,
                message: 'User deleted successfully by ID.',
                üzenet: 'Felhasználó sikeresen törölve azonosító alapján.'
            });
        } else {
            return res.status(400).json({
                status: 400,
                message: 'Provide either user ID or email.',
                üzenet: 'Adjon meg azonosítót vagy e-mailt.'
            });
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({
            status: 500,
            message: 'An error occurred while deleting the user.',
            üzenet: 'Hiba merült fel a felhasználó törlése közben.'
        });
    }
};


module.exports = {
    getAllUsers,
    countUsers,
    getUserByID,
    getUserByEmail,
    signupUser,
    loginUser,
    logoutUser,
    updateUser,
    deleteUser
};
