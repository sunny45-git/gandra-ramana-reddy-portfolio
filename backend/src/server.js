const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '../.env') });

const { connectDB } = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Route imports
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const activityRoutes = require('./routes/activityRoutes');
const milestoneRoutes = require('./routes/milestoneRoutes');
const galleryRoutes = require('./routes/galleryRoutes');
const newsRoutes = require('./routes/newsRoutes');
const contactRoutes = require('./routes/contactRoutes');
const gandraJyothiRoutes = require('./routes/gandraJyothiRoutes');

const AdminUser = require('./models/AdminUser');
const seedData = require('./seed');

const app = express();

// Trust proxy for reverse proxies and Netlify Serverless
app.set('trust proxy', 1);

// Security middleware
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);

// CORS configuration
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  process.env.CLIENT_ORIGIN,
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl, or server-to-server)
      if (!origin) return callback(null, true);
      if (
        allowedOrigins.indexOf(origin) !== -1 ||
        origin.endsWith('.netlify.app') ||
        process.env.NODE_ENV !== 'production'
      ) {
        return callback(null, true);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);
app.options('*', cors());

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Static files (Uploads & Images directories)
const uploadsDir = path.join(__dirname, '../uploads');
const frontendImagesDir = path.join(__dirname, '../../frontend/public/images');

app.use('/uploads', express.static(uploadsDir));
app.use('/images', express.static(uploadsDir));
if (require('fs').existsSync(frontendImagesDir)) {
  app.use('/images', express.static(frontendImagesDir));
}

// Central API Router
const apiRouter = express.Router();

// Health check endpoint
const healthHandler = (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'Gandra Venkata Ramana Reddy Portfolio API',
    version: '1.0.0',
    mode: process.env.NETLIFY ? 'Netlify Serverless' : 'Node Express',
  });
};

apiRouter.get('/', healthHandler);
apiRouter.get('/health', healthHandler);

// Mount routes on API router
apiRouter.use('/auth', authRoutes);
apiRouter.use('/profile', profileRoutes);
apiRouter.use('/activities', activityRoutes);
apiRouter.use('/milestones', milestoneRoutes);
apiRouter.use('/gallery', galleryRoutes);
apiRouter.use('/news', newsRoutes);
apiRouter.use('/contact', contactRoutes);
apiRouter.use('/gandra-jyothi', gandraJyothiRoutes);

// Mount router on standard /api as well as Netlify function path
app.use('/api', apiRouter);
app.use('/.netlify/functions/api', apiRouter);

// Serve built frontend if exists
const frontendDist = path.join(__dirname, '../../frontend/dist');
const fs = require('fs');

if (fs.existsSync(frontendDist)) {
  app.use(express.static(frontendDist));
  app.get('*', (req, res, next) => {
    if (req.originalUrl.startsWith('/api') || req.originalUrl.startsWith('/uploads')) {
      return next();
    }
    res.sendFile(path.join(frontendDist, 'index.html'));
  });
}

// 404 handler for unknown API routes
app.use(['/api/*', '/.netlify/functions/api/*'], (req, res) => {
  res.status(404).json({
    success: false,
    message: `API endpoint ${req.originalUrl} not found`,
  });
});

// Centralized error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Connect to DB and start server
const startServer = async () => {
  try {
    await connectDB();

    // Auto seed if empty
    const adminCount = await AdminUser.countDocuments();
    if (adminCount === 0) {
      console.log('No admin user found. Running initial data seeding...');
      await seedData();
    }

    const server = app.listen(PORT, () => {
      console.log(`====================================================`);
      console.log(`🚀 Political Portfolio Backend is running!`);
      console.log(`📡 URL: http://localhost:${PORT}`);
      console.log(`🛡️  Admin API ready with JWT authentication`);
      console.log(`====================================================`);
    });

    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.error(`\n❌ PORT CONFLICT: Port ${PORT} is already in use by another running backend process.`);
        console.error(`👉 Run the following in PowerShell to free port ${PORT}:`);
        console.error(`   Stop-Process -Id (Get-NetTCPConnection -LocalPort ${PORT}).OwningProcess -Force\n`);
      } else {
        console.error('Server error:', err);
      }
      process.exit(1);
    });

    return server;
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

if (require.main === module) {
  startServer();
}

module.exports = { app, startServer };
