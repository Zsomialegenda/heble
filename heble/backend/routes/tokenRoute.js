const express = require('express');
const router = express.Router();
const {
    fetchAllTokens,
    fetchTokenById,
    fetchTokenByUserId,
} = require('../controllers/tokenController');

// GET Methods
router.get('/', fetchAllTokens);
router.get('/:id', fetchTokenById);
router.get('/user/:id', fetchTokenByUserId);

module.exports = router;
