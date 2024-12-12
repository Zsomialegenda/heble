const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sequelize = require('../connection/sequelize');
const { Users, Exercises, Achievements, UserAchievements } = require('../models');

const SECRET_KEY = 'your_secret_key';

const isAdmin = (req) => {
    const { username, password } = req.headers;
    return username === 'admin' && password === 'Kicsicsirke_1298';
};

const testUserRoute = (req, res) => {
    res.status(200).json({
        status: 200,
        message: "Hello from the user route"
    });
    console.log(Users);
};

const testUserRouteID = (req, res) => {
    console.log('Request reached /user/:id');
    const userId = req.params.id;
    res.status(200).json({
        status: 200,
        message: `User ID: ${userId}`
    });
};

const getAllUsers = async (req, res) => {
    try {
        const users = await Users.findAll();
        res.status(200).json({
            status: 200,
            data: users
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            message: 'An error occurred while fetching users.',
            üzenet: 'Hiba merült fel az adatok lekérése közben.'
        });
    }
};

const getAllUsersNoPassword = async (req, res) => {
    try {
        const users = await Users.findAll({
            attributes: ['id', 'firstName', 'lastName', 'email', 'level', 'xp', 'createdAt', 'updatedAt']
        });
        res.status(200).json({
            status: 200,
            data: users
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
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
        if (!user) {
            return res.status(404).json({
                status: 404,
                message: 'User not found.',
                üzenet: 'A felhasználó nem található.'
            });
        }
        res.status(200).json({
            status: 200,
            data: user
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            message: 'An error occurred while fetching the user.',
            üzenet: 'Hiba merült fel a felhasználó lekérése közben.'
        });
    }
};

const getUserByEmail = async (req, res) => {
    const email = req.body.email;

    try {
        const user = await Users.findOne({
            where: { email: email },
            attributes: ['id', 'firstName', 'lastName', 'email', 'xp', 'createdAt', 'updatedAt']
        });
        if (!user) {
            return res.status(404).json({
                status: 404,
                message: 'User not found.',
                üzenet: 'A felhasználó nem található.'
            });
        }
        res.status(200).json({
            status: 200,
            data: user
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            message: 'An error occurred while fetching the user.',
            üzenet: 'Hiba merült fel a felhasználó lekérése közben.'
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
        res.status(200).json({
            status: 200,
            data: achievements
        });
    } catch (error) {
        console.error('Error fetching user achievements:', error);
        res.status(500).json({
            status: 500,
            message: 'Failed to fetch achievements.',
            üzenet: 'Hiba merült fel az eredmények lekérése közben.'
        });
    }
};

const checkAndGrantAchievements = async (userId) => {
    try {
        const user = await Users.findOne({ where: { id: userId } });
        if (!user) return;

        const achievements = await Achievement.findAll();
        for (const achievement of achievements) {
            const prerequisites = JSON.parse(achievement.prerequisites || '{}');
            const { required, requiredAmount } = prerequisites;

            if (required && user[required] >= requiredAmount) {
                const alreadyEarned = await UserAchievement.findOne({
                    where: { user_id: userId, achievement_id: achievement.id }
                });

                if (!alreadyEarned) {
                    await UserAchievement.create({
                        user_id: userId,
                        achievement_id: achievement.id
                    });
                }
            }
        }
    } catch (error) {
        console.error('Error checking and granting achievements:', error);
    }
};

const signupUser = async (req, res) => {
    const transaction = await sequelize.transaction();

    try {
        const { firstName, lastName, email, password } = req.body;

        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({
                status: 400,
                message: 'All fields are required.',
                üzenet: 'Minden mező kitöltése kötelező.'
            });
        }

        const existingUser = await Users.findOne({ where: { email }, transaction });
        if (existingUser) {
            return res.status(409).json({
                status: 409,
                message: 'E-mail already in use.',
                üzenet: 'E-mail már használatban van.'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await Users.create({
            firstName,
            lastName,
            email,
            password: hashedPassword
        }, { transaction });

        console.log("New user created with ID:", newUser.id);

        await Exercises.create({
            userId: newUser.id,
            pushUps: 0,
            pullUps: 0,
            squats: 0,
            running: 0
        }, { transaction });

        // Commit the transaction
        await transaction.commit();

        res.status(201).json({
            status: 201,
            userId: newUser.id,
            message: 'User registered successfully!',
            üzenet: 'Felhasználó sikeresen regisztrálva!'
        });

    } catch (error) {
        console.error(error);
        if (transaction) await transaction.rollback();
        res.status(500).json({
            status: 500,
            message: 'An error occurred. Please try again later.',
            üzenet: 'Hiba merült fel. Kérjük, próbálja újra később.'
        });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            status: 400,
            message: 'Both email and password are required for login.',
            üzenet: 'E-mail és jelszó szükséges a bejelentkezéshez.'
        });
    }

    try {
        const user = await Users.findOne({ where: { email: email } });

        if (!user) {
            return res.status(401).json({
                status: 401,
                message: 'Invalid email or password.',
                üzenet: 'Nem megfelelő E-mail vagy jelszó.'
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                status: 401,
                message: 'Invalid email or password.',
                üzenet: 'Nem megfelelő E-mail vagy jelszó.'
            });
        }

        const loginTimestamp = new Date().toISOString();

        const token = jwt.sign(
            {
                userId: user.id,
                email: user.email,
                loginAt: loginTimestamp
            },
            SECRET_KEY,
            { expiresIn: '8h' }
        );

        console.log('Generated JWT Token:', token);

        const decodedToken = jwt.decode(token);
        console.log('Decoded Token:', decodedToken);

        res.status(200).json({
            status: 200,
            userId: user.id,
            token: token,
            loginAt: loginTimestamp,
            message: 'Login successful!',
            üzenet: 'Sikeres bejelentkezés!'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            message: 'An error occurred. Please try again later.',
            üzenet: 'Hiba merült fel. Kérjük, próbálja újra később.'
        });
    }
};

const gainXP = async (req, res) => {
    const { id: userId } = req.params; // User ID for admin updates
    const { email, password, xpAmount } = req.body;

    if (!xpAmount || typeof xpAmount !== 'number') {
        return res.status(400).json({
            status: 400,
            message: 'Invalid input data.',
            üzenet: 'Nem megfelelő bemenő adat.'
        });
    }

    try {
        let user;

        // Case 1: Admin updates XP by userId
        if (isAdmin(req)) {
            if (!userId) {
                return res.status(400).json({
                    status: 400,
                    message: 'User ID is required for admin operations.',
                    üzenet: 'Felhasználói azonosító szükséges az admin művelethez.'
                });
            }
            user = await Users.findOne({ where: { id: userId } });

            if (!user) {
                return res.status(404).json({
                    status: 404,
                    message: 'User not found.',
                    üzenet: 'A felhasználó nem található.'
                });
            }
        } 
        // Case 2: User updates their own XP using email-password
        else if (email && password) {
            user = await Users.findOne({ where: { email } });

            if (!user || !(await bcrypt.compare(password, user.password))) {
                return res.status(401).json({
                    status: 401,
                    message: 'Invalid email or password.',
                    üzenet: 'Nem megfelelő E-mail vagy jelszó.'
                });
            }
        } else {
            return res.status(403).json({
                status: 403,
                message: 'Unauthorized access. Admin credentials or valid email-password required.',
                üzenet: 'Hozzáférés megtagadva. Admin hitelesítés vagy érvényes E-mail-jelszó szükséges.'
            });
        }

        // Update XP and level
        const newXp = user.xp + xpAmount;
        let newLevel = user.level;

        const xpGain = 100;

        while (newXp >= xpGain * newLevel) {
            newLevel++;
        }

        await user.update({ xp: newXp, level: newLevel });

        res.status(200).json({
            status: 200,
            currentLevel: newLevel,
            currentXp: newXp,
            message: 'XP successfully added.',
            üzenet: 'XP sikeresen hozzáadva.'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            message: 'An error occurred. Please try again later.',
            üzenet: 'Hiba merült fel. Kérjük, próbálja újra később.'
        });
    }
};

const updateUser = async (req, res) => {
    const { email, password, newEmail, newPassword } = req.body;
    const userId = req.params.id;  // user id from URL params

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
                user = await Users.findOne({ where: { email } });
            } else if (userId) {
                user = await Users.findOne({ where: { id: userId } });
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
            const user = await Users.findOne({ where: { id: userId } });
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



const deleteUser = async (req, res) => {
    try {
        if (isAdmin(req)) {
            const { id, email } = req.body;

            if (email) {
                const user = await Users.findOne({ where: { email } });
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
            } else if (id) {
                const user = await Users.findOne({ where: { id } });
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
        } else {
            return res.status(403).json({
                status: 403,
                message: 'Unauthorized. Admin credentials required.',
                üzenet: 'Hozzáférés megtagadva. Admin jogosultság szükséges.'
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
    updateUser,
    deleteUser
};
