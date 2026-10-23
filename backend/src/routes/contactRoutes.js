const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const {
  submitContact,
  getContactMessages,
  updateContactStatus,
  deleteContactMessage,
} = require('../controllers/contactController');
const { protect } = require('../middleware/auth');

// Rate limiter for citizen submissions to prevent abuse
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // 10 submissions per IP per hour
  message: {
    success: false,
    message: 'Too many messages sent from this IP address, please try again in an hour',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post('/', contactLimiter, submitContact);
router.get('/', protect, getContactMessages);
router.put('/:id', protect, updateContactStatus);
router.delete('/:id', protect, deleteContactMessage);

module.exports = router;
