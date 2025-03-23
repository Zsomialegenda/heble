const jwt = require("jsonwebtoken");
const { Code404, Code403 } = require("../utils/statusCode");
let reason = [];

const SECRET_KEY = process.env.SECRET_KEY || "admin";

const authenticator = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    reason = ["Token not provided.", "A token nincs megadva."];
    return Code404(null, req, res, next, reason);
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      reason = ["Invalid or expired token.", "Érvénytelen vagy lejárt token."];
      return Code403(null, req, res, next, reason);
    }

    res.locals.user = decoded;
    next();
  });
};

module.exports = authenticator;
