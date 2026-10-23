const express = require('express');
const router = express.Router();
const {
  getProfile,
  updateProfile,
  getGandraJyothiProfile,
  updateGandraJyothi,
  updateEducation,
} = require('../controllers/profileController');
const { protect } = require('../middleware/auth');

router.get('/', getProfile);
router.put('/', protect, updateProfile);
router.get('/gandra-jyothi', getGandraJyothiProfile);
router.put('/gandra-jyothi', protect, updateGandraJyothi);
router.put('/education', protect, updateEducation);

module.exports = router;
