const express = require("express");
const router = express.Router();
const {
  getAllDelOrBanUsers,
  getDelOrBanUserByID,
  getDelOrBanUserByEmail,
} = require("../controllers/delOrBanUserController");

// GET metódusok
router.get("/", getAllDelOrBanUsers);
router.get('/email', getDelOrBanUserByEmail);
router.get("/:id?", getDelOrBanUserByID);

module.exports = router;
