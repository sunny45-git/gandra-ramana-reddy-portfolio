const Activity = require('../models/Activity');
const mongoose = require('mongoose');
const { fallbackActivities, fallbackJyothiActivities } = require('../data/fallbackData');

// @desc    Get all public activities
// @route   GET /api/activities
// @access  Public
const getActivities = async (req, res, next) => {
  try {
    const profileKey = req.query.profile || req.params.profile || 'gandra-venkata-ramana-reddy';
    const isJyothi = profileKey === 'gandra-jyothi';
    const defaultSet = isJyothi ? fallbackJyothiActivities : fallbackActivities;

    if (mongoose.connection.readyState !== 1) {
      let filtered = [...defaultSet];
      if (req.query.category && req.query.category !== 'All') {
        filtered = filtered.filter((a) => a.category === req.query.category);
      }
      return res.json({ success: true, count: filtered.length, data: filtered });
    }

    const { category, search, status } = req.query;
    const filter = {
      profile: isJyothi ? 'gandra-jyothi' : { $in: ['gandra-venkata-ramana-reddy', null] },
    };

    if (status) {
      filter.status = status;
    } else if (!req.user) {
      filter.status = 'Published';
    }

    if (category && category !== 'All') {
      filter.category = category;
    }

    if (search) {
      filter.$or = [
        { 'title.en': { $regex: search, $options: 'i' } },
        { 'title.te': { $regex: search, $options: 'i' } },
        { 'description.en': { $regex: search, $options: 'i' } },
        { 'description.te': { $regex: search, $options: 'i' } },
        { 'location.en': { $regex: search, $options: 'i' } },
      ];
    }

    const activities = await Activity.find(filter).sort({ date: -1 });
    res.json({
      success: true,
      count: activities.length,
      data: activities.length > 0 ? activities : defaultSet,
    });
  } catch (error) {
    const profileKey = req.query?.profile || 'gandra-venkata-ramana-reddy';
    const defaultSet = profileKey === 'gandra-jyothi' ? fallbackJyothiActivities : fallbackActivities;
    res.json({ success: true, count: defaultSet.length, data: defaultSet });
  }
};

// @desc    Get single activity
// @route   GET /api/activities/:id
// @access  Public
const getActivityById = async (req, res, next) => {
  try {
    const activity = await Activity.findById(req.params.id);
    if (!activity) {
      const fb = fallbackActivities.find((a) => a._id === req.params.id);
      if (fb) return res.json({ success: true, data: fb });
      return res.status(404).json({ success: false, message: 'Activity not found' });
    }
    res.json({ success: true, data: activity });
  } catch (error) {
    const fb = fallbackActivities.find((a) => a._id === req.params.id);
    if (fb) return res.json({ success: true, data: fb });
    next(error);
  }
};

// @desc    Create activity
// @route   POST /api/activities
// @access  Private (Admin)
const createActivity = async (req, res, next) => {
  try {
    if (!req.body.profile) {
      req.body.profile = req.query.profile || 'gandra-venkata-ramana-reddy';
    }
    const activity = await Activity.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Public service activity added successfully',
      data: activity,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update activity
// @route   PUT /api/activities/:id
// @access  Private (Admin)
const updateActivity = async (req, res, next) => {
  try {
    const activity = await Activity.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!activity) {
      return res.status(404).json({ success: false, message: 'Activity not found' });
    }
    res.json({
      success: true,
      message: 'Activity updated successfully',
      data: activity,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete activity
// @route   DELETE /api/activities/:id
// @access  Private (Admin)
const deleteActivity = async (req, res, next) => {
  try {
    const activity = await Activity.findByIdAndDelete(req.params.id);
    if (!activity) {
      return res.status(404).json({ success: false, message: 'Activity not found' });
    }
    res.json({
      success: true,
      message: 'Activity removed successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getActivities,
  getActivityById,
  createActivity,
  updateActivity,
  deleteActivity,
};
