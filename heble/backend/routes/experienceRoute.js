const express = require('express');
const {
  getAllExperiences,
  getUserExperience,
} = require('../controllers/experienceController');

const router = express.Router();

//GET metódusok
router.get('', getAllExperiences);
router.get('/:id', getUserExperience);

module.exports = router;