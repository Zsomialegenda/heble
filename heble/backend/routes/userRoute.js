const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUserByEmail,
  getUserByID,
  signupUser,
  loginUser,
  logoutUser,
  deleteUser,
  countUsers,
  verifySecureAnswer,
  resetPassword,
} = require("../controllers/userController");

// GET metódusojk
router.get("/", getAllUsers);
router.get("/count", countUsers);
router.get("/:id", getUserByID);

// PUT metódusojk
router.put("/forgot", verifySecureAnswer);
router.put("/forgot/reset", resetPassword);

// POST metódusojk
router.post("/email", getUserByEmail);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/signup", signupUser);

// DELETE metódusojk
router.delete("/delete/:id?", deleteUser);

module.exports = router;
