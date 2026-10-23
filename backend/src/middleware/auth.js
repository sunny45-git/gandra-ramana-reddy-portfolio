const jwt = require('jsonwebtoken');
const AdminUser = require('../models/AdminUser');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route, token missing',
    });
  }

  try {
    let secret = (process.env.JWT_SECRET || 'gandra_venkata_ramana_reddy_secret_key_2026_telangana_prod').trim();
    if (
      (secret.startsWith('"') && secret.endsWith('"')) ||
      (secret.startsWith("'") && secret.endsWith("'"))
    ) {
      secret = secret.slice(1, -1).trim();
    }

    const decoded = jwt.verify(token, secret);

    if (decoded.id === 'fallback-admin-id') {
      let adminEmail = (process.env.ADMIN_EMAIL || 'admin@gandrareddy.in').toLowerCase().trim();
      if (
        (adminEmail.startsWith('"') && adminEmail.endsWith('"')) ||
        (adminEmail.startsWith("'") && adminEmail.endsWith("'"))
      ) {
        adminEmail = adminEmail.slice(1, -1).trim();
      }
      req.user = {
        _id: 'fallback-admin-id',
        name: 'Gandra Ramana Reddy Office Admin',
        email: adminEmail,
        role: 'superadmin',
      };
      return next();
    }

    const mongoose = require('mongoose');
    if (mongoose.connection.readyState === 1) {
      try {
        req.user = await AdminUser.findById(decoded.id).select('-password');
      } catch (findErr) {
        console.warn('DB lookup error in auth middleware:', findErr.message);
      }
    }

    if (!req.user) {
      let adminEmail = (process.env.ADMIN_EMAIL || 'admin@gandrareddy.in').toLowerCase().trim();
      if (
        (adminEmail.startsWith('"') && adminEmail.endsWith('"')) ||
        (adminEmail.startsWith("'") && adminEmail.endsWith("'"))
      ) {
        adminEmail = adminEmail.slice(1, -1).trim();
      }
      req.user = {
        _id: decoded.id,
        name: 'Gandra Ramana Reddy Office Admin',
        email: adminEmail,
        role: 'superadmin',
      };
    }
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized, token invalid or expired',
    });
  }
};

module.exports = { protect };
