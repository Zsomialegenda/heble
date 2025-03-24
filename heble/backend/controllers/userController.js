const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {
  sequelize,
  User,
  Exercise,
  Achievement,
  UserExperience,
  Token,
  DeletedOrBannedUser,
  UserAchievement,
} = require("../models");
const {
  Code400,
  Code401,
  Code403,
  Code404,
  Code409,
  Code500,
} = require("../utils/statusCode");

let reason = []; // Hiba leezeésre

// TOKENHEZ
const SECRET_KEY = process.env.SECRET_KEY || "admin";

/** getAllUsers -- az összes felhasználó lekérdezése
 *
 * @param {*} req Nincs bemenet
 * @param {*} res Vissza adja az összes felhasználó adatát - 200
 * @returns Hibát küld vissza ha szerverhiba - 500
 */
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        { model: Exercise },
        { model: UserExperience },
        { model: UserAchievement },
      ],
    });

    return res.status(200).json(users);
  } catch (error) {
    return Code500(error, null, res, null, reason);
  }
};

/** getUserByID -- ID alapú lekérdezés egy felhasználóra
 *
 * @param {*} req userId
 * @param {*} res Válaszként visszaadja a felhasználó adatait - 200.
 * @returns Hibákat küld vissza:
 *              1. Az ID érvénytelen vagy nem szám - 400
 *              2. A felhasználó nem található - 404
 *              3. Szerverhiba - 500
 */
const getUserByID = async (req, res) => {
  const userId = parseInt(req.params.id, 10);

  if (isNaN(userId)) {
    reason = ["Invalid user ID.", "Érvénytelen felhasználói azonosító."];
    return Code400(null, null, res, null, reason);
  }

  try {
    const user = await User.findOne({
      where: { id: userId },
      include: [
        { model: Exercise },
        { model: UserExperience },
        { model: UserAchievement },
      ],
    });

    if (!user) {
      reason = ["User not found.", "A felhasználó nem található."];
      return Code404(null, null, res, null, reason);
    }

    return res.status(200).json(user);
  } catch (error) {
    return Code500(error, null, res, null, reason);
  }
};

/** getUserByEmail -- e-mail alapú lekérdezés egy felhasználóra
 *
 * @param {*} req email
 * @param {*} res Válaszként visszaadja a felhasználó adatait - 200.
 * @returns Hibákat küld vissza:
 *              1. Az e-mail nincs megadva - 400
 *              2. A felhasználó nem található - 404
 *              3. Szerverhiba - 500
 */
const getUserByEmail = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    reason = ["Email is required.", "Az email megadása kötelező."];
    return Code400(null, null, res, null, reason);
  }

  try {
    const user = await User.findOne({
      where: { email },
      include: [
        { model: Exercise },
        { model: UserExperience },
        { model: UserAchievement },
      ],
    });

    if (!user) {
      reason = ["User not found.", "Felhasználó nem található."];
      return Code404(null, null, res, null, reason);
    }

    return res.status(200).json(user);
  } catch (error) {
    return Code500(error, null, res, null, reason);
  }
};

/** signupUser -- felhasználó regisztrálása
 *
 * @param {*} req Az üzenetbe kerül a név, e-mail és jelszó
 * @param {*} res Válaszként vissza küldi hogy a felhasználó létre lett hozva - 201
 * @returns Hibákat küld vissza ha:
 *              1. nincs minden mező kitöltve - 400
 *              2. ki lett tiltva/törölve lett a fiók - 403
 *              3. az e-mail használatban van - 409
 *              4. szerver probléma - 500
 */
const signupUser = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { firstName, lastName, email, password, secureAnswer } = req.body;

    if (!firstName || !lastName || !email || !password || !secureAnswer) {
      reason = ["All fields are required.", "Minden mező kitöltése kötelező."];
      return Code400(null, null, res, null, reason);
    }

    const bannedOrDeletedUser = await DeletedOrBannedUser.findOne({
      where: { email },
    });

    if (bannedOrDeletedUser) {
      reason = [
        "You are banned or your account has been deleted.",
        "Ön ki lett tiltva vagy a fiókja törlésre került.",
      ];
      return Code403(null, null, res, null, reason);
    }

    const existingUser = await User.findOne({ where: { email }, transaction });

    if (existingUser) {
      reason = ["E-mail already in use.", "E-mail már használatban van."];
      return Code409(null, null, res, null, reason);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedSecureAnswer = await bcrypt.hash(secureAnswer, 10);

    const newUser = await User.create(
      {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        secureAnswer: hashedSecureAnswer,
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
      message: "User registered successfully!",
      üzenet: "Felhasználó sikeresen regisztrálva!",
    });
  } catch (error) {
    if (transaction) await transaction.rollback();
    return Code500(error, null, res, null, reason);
  }
};

/** loginUser -- felhasználó bejelentkezés
 *
 * @param {*} req email, password
 * @param {*} res Válaszként visszaadja a hitelesítési tokent és a bejelentkezés időpontját - 200
 * @returns Hibákat küld vissza:
 *              1. az e-mail vagy jelszó nincs megadva - 400
 *              2. admin hitelesítési hiba - 500
 *              3. hibás e-mail vagy jelszó - 401
 *              4. sszerverhiba - 500
 */
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin";

  if (!email || !password) {
    reason = [
      "Both email and password are required for login.",
      "E-mail és jelszó szükséges a bejelentkezéshez.",
    ];
    return Code400(null, null, res, null, reason);
  }

  if (email === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    try {
      const loginTimestamp = new Date().toISOString();
      const adminToken = jwt.sign(
        {
          username: ADMIN_USERNAME,
          role: "admin",
          isAdmin: true,
          loginAt: loginTimestamp,
        },
        SECRET_KEY,
        { expiresIn: "8h" }
      );

      return res.status(200).json({
        status: 200,
        token: adminToken,
        isAdmin: true,
        loginAt: loginTimestamp,
        message: "Admin login successful!",
        üzenet: "Sikeres admin bejelentkezés!",
      });
    } catch (error) {
      reason = [
        "An error occurred during admin login. Please try again.",
        "Hiba történt az admin bejelentkezés során. Kérjük, próbálja újra.",
      ];
      return Code500(error, null, res, null, reason);
    }
  }

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      reason = [
        "Invalid email or password.",
        "Nem megfelelő E-mail vagy jelszó.",
      ];
      return Code401(null, null, res, null, reason);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      reason = [
        "Invalid email or password.",
        "Nem megfelelő E-mail vagy jelszó.",
      ];
      return Code401(null, null, res, null, reason);
    }

    await Token.destroy({ where: { userId: user.id } });

    const loginTimestamp = new Date().toISOString();
    const userToken = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        isAdmin: user.isAdmin || false,
        loginAt: loginTimestamp,
      },
      SECRET_KEY,
      { expiresIn: "8h" }
    );

    const expiresAt = new Date(Date.now() + 8 * 60 * 60 * 1000);
    await Token.create({
      userId: user.id,
      token: userToken,
      loginAt: loginTimestamp,
      expiresAt,
    });

    return res.status(200).json({
      status: 200,
      userId: user.id,
      token: userToken,
      isAdmin: user.isAdmin || false,
      loginAt: loginTimestamp,
      message: "Login successful!",
      üzenet: "Sikeres bejelentkezés!",
    });
  } catch (error) {
    return Code500(error, null, res, null, reason);
  }
};

/** logoutUser -- felhasználó kijelentkezés
 *
 * @param {*} req token - fejléc
 * @param {*} res Kitörli a táblából a tokent és kijelentkeztet - 200
 * @returns Hibákat ad vissza ha:
 *          1. nincs token - 400
 *          2. nem található a token - 404
 *          3. szerver hiba - 500
 */
const logoutUser = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    reason = [
      "Token is required for logout.",
      "A kijelentkezéshez token szükséges.",
    ];
    return Code400(null, null, res, null, reason);
  }

  try {
    const tokenRecord = await Token.findOne({ where: { token } });

    if (!tokenRecord) {
      reason = ["Token not found.", "Token nem található."];
      return Code404(null, null, res, null, reason);
    }

    await tokenRecord.destroy();

    return res.status(200).json({
      status: 200,
      message: "Logout successful.",
      üzenet: "Sikeres kijelentkezés.",
    });
  } catch (error) {
    return Code500(error, null, res, null, reason);
  }
};

/** updateUser -- Felhasználó frissitése
 *
 * @param {*} req token - fejléc, newEmail, secureAnswer
 * @param {*} res Válaszként elküldi hogy sikeres a rissités - 200
 * @returns Hibát ad vissza ha:
 *            1. Nincs token - 401
 *            2. Nem található a felhasználó - 404
 *            3. Nem jó a biztonsági válasz - 400
 *            4. Nincs e-mail megadva - 400
 *            5. Szerver hiba - 500
 */
const updateUser = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  const { newEmail, secureAnswer } = req.body;

  if (!token) {
    const reason = [
      "Missing or invalid token.",
      "Hiányzó vagy érvénytelen token.",
    ];
    return Code401(null, null, res, null, reason);
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const userId = decoded.userId;

    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      const reason = ["User not found.", "Felhasználó nem található."];
      return Code404(null, null, res, null, reason);
    }

    const checkSecureAnswer = await bcrypt.compare(
      secureAnswer,
      user.secureAnswer
    );

    if (!secureAnswer || !checkSecureAnswer) {
      const reason = [
        "Invalid security answer.",
        "Érvénytelen biztonsági válasz.",
      ];
      return Code400(null, null, res, null, reason);
    }

    if (!newEmail) {
      const reason = ["No e-mail is provided.", "Nincs e-mail megadva."];
      return Code400(null, null, res, null, reason);
    }

    user.email = newEmail;

    await user.save();

    return res.status(200).json({
      status: 200,
      message: "User account updated successfully.",
      üzenet: "Felhasználói fiók sikeresen frissítve.",
    });
  } catch (error) {
    const reason = [
      "An error occurred while updating the user account.",
      "Hiba történt a felhasználói fiók frissítésekor.",
    ];
    return Code500(error, null, res, null, reason);
  }
};

/** verifySecureAnswer -- Biztonsági válasz ellenőrzése
 *
 * @param {*} req e-mail és  biztonsági válasz (`secureAnswer`)
 * @param {*} res Visszaadja az ellenőrzés sikerességét - 200
 *
 * @returns Hibákat ad vissza, ha:
 *          1. Hiányzó email vagy biztonsági válasz - 400
 *          2. A felhasználó nem található az adatbázisban - 404
 *          3. Hibás biztonsági válasz - 401
 *          4. Szerverhiba történt az ellenőrzés közben - 500
 */
const verifySecureAnswer = async (req, res, next) => {
  try {
    const { email, secureAnswer } = req.body;

    if (!email || !secureAnswer) {
      const reason = [
        "Email and secure answer are required.",
        "Az email és a biztonsági válasz megadása kötelező.",
      ];
      return Code400(null, req, res, next, reason);
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      const reason = ["User not found.", "Felhasználó nem található."];
      return Code404(null, req, res, next, reason);
    }

    const isMatch = await bcrypt.compare(secureAnswer, user.secureAnswer);
    if (!isMatch) {
      const reason = ["Incorrect secure answer.", "Hibás biztonsági válasz."];
      return Code401(null, req, res, next, reason);
    }

    return res.status(200).json({
      status: 200,
      message: "Secure answer verified successfully.",
      üzenet: "A biztonsági válasz ellenőrzése sikeres.",
    });
  } catch (error) {
    const reason = [
      "An error occurred while verifying the secure answer.",
      "Hiba történt a biztonsági válasz ellenőrzése közben.",
    ];
    return Code500(error, req, res, next, reason);
  }
};

/** resetPassword -- Felhasználói jelszó visszaállítása
 *
 * @param {*} req e-mail cím és új jelszó
 * @param {*} res Visszaadja a jelszó frissítésének sikerességét - 200
 *
 * @returns Hibákat ad vissza, ha:
 *          1. Az új jelszó nincs megadva - 400
 *          2. A felhasználó nem található az adatbázisban - 404
 *          3. Szerverhiba történt a jelszó frissítése közben - 500
 */
const resetPassword = async (req, res, next) => {
  try {
    const { email, newPassword } = req.body;

    if (!newPassword) {
      const reason = [
        "Both email and the new password is required.",
        "Az email és új jelszó megadása kötelező.",
      ];
      return Code400(null, req, res, next, reason);
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      const reason = ["User not found.", "Felhasználó nem található."];
      return Code404(null, req, res, next, reason);
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();

    return res.status(200).json({
      status: 200,
      message: "Password updated successfully.",
      üzenet: "Jelszó sikeresen frissítve.",
    });
  } catch (error) {
    const reason = [
      "An error occurred while updating the password.",
      "Hiba történt a jelszó frissítése közben.",
    ];
    return Code500(error, req, res, next, reason);
  }
};

/** deleteUser -- Felhasználó törlése
 *
 * @param {*} req Tartalmazza az Authorization tokent a fejlécben | Admin esetén az e-mail cím is megadható a törlendő felhasználó azonosításához
 * @param {*} res Visszajelzést ad a törlés sikerességéről - 200
 * @returns Hibbákat ad vissza ha:
 *          1. Hiányzik a token - 401
 *          2. Ha hiányzóak a bemenő adatok - 400
 *          3. A felhasználó nem található - 404
 *          4. Érvénytelen a token - 401
 *          5. Szerverhiba - 500
 */
const deleteUser = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    reason = [
      "Authorization token required.",
      "Engedélyezési token szükséges.",
    ];
    return Code401(null, null, res, null, reason);
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const isAdmin = decoded.isAdmin || false;

    const { email, password, secureAnswer } = req.body;

    if (!isAdmin) {
      reason = [
        "Only admins can delete users.",
        "Csak adminok törölhetnek felhasználókat.",
      ];
      return Code403(null, null, res, null, reason);
    }

    if (!email || !password || !secureAnswer) {
      reason = [
        "Email, password, and secure answer are required.",
        "E-mail, jelszó és biztonsági válasz szükséges.",
      ];
      return Code400(null, null, res, null, reason);
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      reason = ["User not found.", "A felhasználó nem található."];
      return Code404(null, null, res, null, reason);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    const isSecureAnswerValid = await bcrypt.compare(
      secureAnswer,
      user.secureAnswer
    );

    if (
      !(password === process.env.ADMIN_PASSWORD && secureAnswer === "heble") &&
      (!isPasswordValid || !isSecureAnswerValid)
    ) {
      reason = [
        "Invalid password or secure answer.",
        "Érvénytelen jelszó vagy biztonsági válasz.",
      ];
      return Code401(null, null, res, null, reason);
    }

    await DeletedOrBannedUser.create({
      userId: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      reason: "deleted",
      deletedAt: new Date(),
    });

    await user.destroy();

    return res.status(200).json({
      status: 200,
      message: "User deleted successfully and archived.",
      üzenet: "Felhasználó sikeresen törölve és archiválva.",
    });
  } catch (error) {
    reason = [
      "An error occurred while deleting the user.",
      "Hiba merült fel a felhasználó törlése közben.",
    ];
    return Code500(error, null, res, null, reason);
  }
};

/** countUsers -- felhasználók megszámlálása
 *
 * @param {*} req Nem vár bemenetet
 * @param {*} res Vissza küldi a felhasználók számát statisztikai célokra - 200
 * @returns Hibát küld vissza (szerverhiba) - 500
 */
const countUsers = async (req, res) => {
  try {
    const userCount = await User.count();
    return res.status(200).json({
      status: 200,
      message: "User count fetched successfully.",
      üzenet: "Felhasználók száma sikeresen lekérve.",
      userCount,
    });
  } catch (error) {
    reason = [
      "Error fetching user count.",
      "Hiba történt a felhasználók számának lekérése közben.",
    ];
    return Code500(error, null, res, null, reason);
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
  verifySecureAnswer,
  resetPassword,
  deleteUser,
};
