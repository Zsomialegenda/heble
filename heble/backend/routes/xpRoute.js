const express = require('express');
const router = express.Router();
const {
    getAllXP
} = require('../controllers/xpContrpller');

router.get('/xp', getAllXP);

module.exports = router;