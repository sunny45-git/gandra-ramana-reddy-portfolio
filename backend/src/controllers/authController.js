const jwt = require('jsonwebtoken');
const AdminUser = require('../models/AdminUser');

const generateToken = (id) => {
  let secret = (process.env.JWT_SECRET || 'gandra_venkata_ramana_reddy_secret_key_2026_telangana_prod').trim();
  if (
    (secret.startsWith('"') && secret.endsWith('"')) ||
    (secret.startsWith("'") && secret.endsWith("'"))
  ) {
    secret = secret.slice(1, -1).trim();
  }
  return jwt.sign(
    { id },
    secret,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

// @desc    Admin login
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res, next) => {
  try {
    const rawIdentifier = req.body.email || req.body.username || '';
    const rawPassword = req.body.password || '';

    const inputIdentifier = rawIdentifier.toLowerCase().trim();
    const enteredPassword = rawPassword.trim();

    if (!inputIdentifier || !enteredPassword) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email/username and password',
      });
    }

    const mongoose = require('mongoose');
    const configuredEmail = (process.env.ADMIN_EMAIL || 'admin@gandrareddy.in').toLowerCase().trim();
    let configuredPassword = (process.env.ADMIN_PASSWORD || 'Admin@12345').trim();
    if (
      (configuredPassword.startsWith('"') && configuredPassword.endsWith('"')) ||
      (configuredPassword.startsWith("'") && configuredPassword.endsWith("'"))
    ) {
      configuredPassword = configuredPassword.slice(1, -1).trim();
    }

    // Check if input is shorthand username like 'admin', 'superadmin', 'gandra'
    const isShorthand = ['admin', 'superadmin', 'gandra', 'administrator'].includes(inputIdentifier);
    const searchEmail = isShorthand ? configuredEmail : inputIdentifier;

    const isDbOnline = mongoose.connection.readyState === 1;

    let user = null;
    if (isDbOnline) {
      try {
        user = await AdminUser.findOne({
          $or: [
            { email: searchEmail },
            { email: inputIdentifier },
            ...(isShorthand ? [{ role: 'superadmin' }] : []),
          ],
        });
      } catch (dbErr) {
        console.warn('DB query in login fallback check:', dbErr.message);
      }
    }

    // SCENARIO 1: User found in database
    if (user) {
      let isMatch = await user.matchPassword(enteredPassword);

      // Auto-heal password if entered matches the authoritative ADMIN_PASSWORD
      if (!isMatch && enteredPassword === configuredPassword) {
        user.password = enteredPassword;
        await user.save();
        isMatch = true;
      }

      if (isMatch) {
        user.lastLogin = new Date();
        await user.save();

        return res.json({
          success: true,
          token: generateToken(user._id),
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            lastLogin: user.lastLogin,
          },
        });
      }

      return res.status(401).json({
        success: false,
        message: 'Invalid credentials. Please verify your email and password.',
      });
    }

    // SCENARIO 2: Database is offline OR user not yet in database
    const matchesEmail = inputIdentifier === configuredEmail || isShorthand || inputIdentifier === 'admin';
    const matchesPassword = enteredPassword === configuredPassword;

    if (matchesEmail && matchesPassword) {
      let createdUserId = 'fallback-admin-id';
      if (isDbOnline) {
        try {
          const newUser = await AdminUser.create({
            name: 'Gandra Ramana Reddy Office Admin',
            email: configuredEmail,
            password: configuredPassword,
            role: 'superadmin',
          });
          createdUserId = newUser._id;
        } catch (createErr) {
          console.warn('Auto-create user on fallback match warning:', createErr.message);
        }
      }

      return res.json({
        success: true,
        token: generateToken(createdUserId),
        user: {
          id: createdUserId,
          name: 'Gandra Ramana Reddy Office Admin',
          email: configuredEmail,
          role: 'superadmin',
          lastLogin: new Date(),
        },
      });
    }

    return res.status(401).json({
      success: false,
      message: 'Invalid credentials. Please verify your email and password.',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get logged in admin info
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res, next) => {
  try {
    res.json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update admin password
// @route   PUT /api/auth/update-password
// @access  Private
const updatePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await AdminUser.findById(req.user._id);

    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Current password does not match.',
      });
    }

    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 6 characters.',
      });
    }

    user.password = newPassword;
    await user.save();

    res.json({
      success: true,
      message: 'Password updated successfully.',
      token: generateToken(user._id),
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { login, getMe, updatePassword };
