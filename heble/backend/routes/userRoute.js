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
  updateAccount,
  verifySecureAnswer,
  resetPassword,
} = require("../controllers/userController");


const { generateUsers } = require("../utils/generator");

// GET metódusojk
router.get("/", getAllUsers);
router.get("/:id", getUserByID);
router.get("/email", getUserByEmail);
router.get("/count", countUsers);

// PUT metódusojk
router.put("/signup", signupUser);
router.put("/generate", generateUsers);

// POST metódusojk
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/forgot", verifySecureAnswer);
router.post("/forgot/reset", resetPassword);

// PATCH metódusojk
router.patch("/update", updateAccount);

// DELETE metódusojk
router.delete("/delete/:id?", deleteUser);

module.exports = router;
