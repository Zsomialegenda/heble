const express = require("express");
const router = express.Router();
const {
  fetchAllTokens,
  fetchTokenById,
  fetchTokenByUserId,
  countToken,
} = require("../controllers/tokenController");

// GET metódusok
router.get("/", fetchAllTokens);
router.get("/:id", fetchTokenById);
router.get("/user/:id", fetchTokenByUserId);
router.get("/count", countToken);

module.exports = router;
