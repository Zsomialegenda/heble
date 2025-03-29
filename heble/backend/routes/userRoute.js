const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUserByEmail,
  getUserByID,
  signupUser,
  loginUser,
  updateUser,
  logoutUser,
  deleteUser,
  countUsers,
  verifySecureAnswer,
  resetPassword,
} = require("../controllers/userController");
const authenticator = require("../utils/authenticator");

// GET metódusojk
router.get("/", getAllUsers);
router.get("/count", countUsers);
router.get("/:id?", getUserByID);

// PUT metódusojk
router.put("/forgot", verifySecureAnswer);
router.put("/forgot/reset", resetPassword);

// POST metódusojk
router.post("/email",authenticator, getUserByEmail);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/signup", signupUser);

// PATCH metódusok
router.patch("/update", authenticator, updateUser);

// DELETE metódusojk
router.delete("/delete/:id?", authenticator, deleteUser);

module.exports = router;
