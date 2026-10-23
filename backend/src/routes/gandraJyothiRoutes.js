const express = require('express');
const router = express.Router();
const { getGandraJyothiProfile, updateGandraJyothi } = require('../controllers/profileController');
const { getActivities, createActivity, updateActivity, deleteActivity } = require('../controllers/activityController');
const { getGallery, createGalleryItem, updateGalleryItem, deleteGalleryItem } = require('../controllers/galleryController');
const { getMilestones, createMilestone, updateMilestone, deleteMilestone } = require('../controllers/milestoneController');
const { getNews, createNews, updateNews, deleteNews } = require('../controllers/newsController');
const { protect } = require('../middleware/auth');

// Middleware to ensure profile query & body are bound to 'gandra-jyothi'
const injectJyothiProfile = (req, res, next) => {
  req.query.profile = 'gandra-jyothi';
  if (req.body && typeof req.body === 'object' && !req.body.profile) {
    req.body.profile = 'gandra-jyothi';
  }
  next();
};

// Profile
router.get('/profile', getGandraJyothiProfile);
router.put('/profile', protect, updateGandraJyothi);

// Activities
router.get('/activities', injectJyothiProfile, getActivities);
router.post('/activities', protect, injectJyothiProfile, createActivity);
router.put('/activities/:id', protect, injectJyothiProfile, updateActivity);
router.delete('/activities/:id', protect, deleteActivity);

// Gallery
router.get('/gallery', injectJyothiProfile, getGallery);
router.post('/gallery', protect, injectJyothiProfile, createGalleryItem);
router.put('/gallery/:id', protect, injectJyothiProfile, updateGalleryItem);
router.delete('/gallery/:id', protect, deleteGalleryItem);

// Achievements and Milestones
router.get('/achievements', injectJyothiProfile, getMilestones);
router.get('/milestones', injectJyothiProfile, getMilestones);
router.post('/achievements', protect, injectJyothiProfile, createMilestone);
router.post('/milestones', protect, injectJyothiProfile, createMilestone);
router.put('/achievements/:id', protect, injectJyothiProfile, updateMilestone);
router.put('/milestones/:id', protect, injectJyothiProfile, updateMilestone);
router.delete('/achievements/:id', protect, deleteMilestone);
router.delete('/milestones/:id', protect, deleteMilestone);

// News
router.get('/news', injectJyothiProfile, getNews);
router.post('/news', protect, injectJyothiProfile, createNews);
router.put('/news/:id', protect, injectJyothiProfile, updateNews);
router.delete('/news/:id', protect, deleteNews);

module.exports = router;
