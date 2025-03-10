const bcrypt = require("bcrypt");
const User = require("../models/User");
const { Code400, Code401, Code404, Code500 } = require("../utils/statusCode");
let reason = [];

const checkUserSecureAnswer = async (req, res, next) => {
  try {
    const { email, secureAnswer } = req.body;

    if (!email || !secureAnswer) {
      reason = [
        "Email and secure answer are required.",
        "Az email és a biztonsági válasz megadása kötelező.",
      ];
      return Code400(null, req, res, next, reason);
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      reason = ["User not found.", "Felhasználó nem található."];
      return Code404(null, req, res, next, reason);
    }

    const hashedSecureAnswer = await bcrypt.hash(secureAnswer, 10);
    const isMatch = bcrypt.compare(hashedSecureAnswer, user.secureAnswer);

    if (!isMatch) {
      reason = ["Incorrect secure answer.", "Hibás biztonsági válasz."];
      return Code401(null, req, res, next, reason);
    }

    req.user = user;
    next();
  } catch (error) {
    reason = [
      "An error occurred while verifying the secure answer.",
      "Hiba történt a biztonsági válasz ellenőrzése közben.",
    ];
    return Code500(error, req, res, next, reason);
  }
};

module.exports = checkUserSecureAnswer;
