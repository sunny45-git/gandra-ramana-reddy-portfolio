const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { login, getMe, updatePassword } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

// Brute-force rate limiter for login
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // Limit each IP to 20 login requests per windowMs
  validate: { xForwardedForHeader: false, default: false },
  keyGenerator: (req) => {
    return (
      req.headers['x-nf-client-connection-ip'] ||
      req.headers['x-forwarded-for'] ||
      req.headers['client-ip'] ||
      req.ip ||
      'anonymous'
    );
  },
  message: {
    success: false,
    message: 'Too many login attempts from this IP, please try again after 15 minutes',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post('/login', loginLimiter, login);
router.get('/me', protect, getMe);
router.put('/update-password', protect, updatePassword);

module.exports = router;
