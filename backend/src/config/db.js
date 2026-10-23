const mongoose = require('mongoose');

let mongodInstance = null;
let cachedPromise = null;

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (cachedPromise) {
    return cachedPromise;
  }

  cachedPromise = (async () => {
    let uri = process.env.MONGODB_URI ? process.env.MONGODB_URI.trim() : '';
    if (
      (uri.startsWith('"') && uri.endsWith('"')) ||
      (uri.startsWith("'") && uri.endsWith("'"))
    ) {
      uri = uri.slice(1, -1).trim();
    }

    if (uri && uri !== '') {
      try {
        console.log('Connecting to configured MongoDB (Atlas / Remote)...');
        const conn = await mongoose.connect(uri, {
          serverSelectionTimeoutMS: 5000,
          maxPoolSize: 10,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        await ensureInitialData();
        return conn;
      } catch (error) {
        console.warn(`Could not connect to external MongoDB: ${error.message}`);
      }
    }

    // If in Netlify / Lambda serverless environment and no URI provided or connection failed
    if (process.env.NETLIFY || process.env.AWS_LAMBDA_FUNCTION_NAME) {
      console.log(
        'Netlify Serverless mode: Running with verified fallback data. Provide MONGODB_URI in Netlify Environment Variables for live MongoDB Atlas persistence.'
      );
      return null;
    }

    // Fallback to MongoMemoryServer for immediate zero-config local run
    try {
      if (!mongodInstance) {
        const { MongoMemoryServer } = require('mongodb-memory-server');
        mongodInstance = await MongoMemoryServer.create({
          instance: {
            dbName: 'gandra_reddy_db',
          },
        });
      }
      const memoryUri = mongodInstance.getUri();
      console.log(`Starting embedded MongoDB instance for seamless local operation...`);
      const conn = await mongoose.connect(memoryUri);
      console.log(`Embedded MongoDB Connected: ${conn.connection.host}`);
      await ensureInitialData();
      return conn;
    } catch (memErr) {
      console.warn('Memory MongoDB initialization skipped:', memErr.message);
      return null;
    }
  })();

  try {
    const res = await cachedPromise;
    return res;
  } catch (err) {
    cachedPromise = null;
    throw err;
  }
};

const ensureInitialData = async () => {
  try {
    if (mongoose.connection.readyState !== 1) return;

    const AdminUser = require('../models/AdminUser');
    const adminCount = await AdminUser.countDocuments();

    let adminEmail = (process.env.ADMIN_EMAIL || 'admin@gandrareddy.in').toLowerCase().trim();
    if (
      (adminEmail.startsWith('"') && adminEmail.endsWith('"')) ||
      (adminEmail.startsWith("'") && adminEmail.endsWith("'"))
    ) {
      adminEmail = adminEmail.slice(1, -1).trim();
    }
    let adminPassword = (process.env.ADMIN_PASSWORD || 'Admin@12345').trim();
    if (
      (adminPassword.startsWith('"') && adminPassword.endsWith('"')) ||
      (adminPassword.startsWith("'") && adminPassword.endsWith("'"))
    ) {
      adminPassword = adminPassword.slice(1, -1).trim();
    }

    if (adminCount === 0) {
      await AdminUser.create({
        name: 'Gandra Ramana Reddy Office Admin',
        email: adminEmail,
        password: adminPassword,
        role: 'superadmin',
      });
      console.log(`Auto-seeded initial admin user for production DB: ${adminEmail}`);
    }

    const Profile = require('../models/Profile');
    const profileCount = await Profile.countDocuments();
    if (profileCount === 0) {
      const { fallbackProfile } = require('../data/fallbackData');
      await Profile.create(fallbackProfile);
      console.log('Auto-seeded default profile in production DB');
    }
  } catch (err) {
    console.warn('Initial data seeding check warning:', err.message);
  }
};

const disconnectDB = async () => {
  cachedPromise = null;
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
  if (mongodInstance) {
    await mongodInstance.stop();
  }
};

module.exports = { connectDB, ensureInitialData, disconnectDB };
