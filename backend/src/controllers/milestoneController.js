const Milestone = require('../models/Milestone');
const mongoose = require('mongoose');
const { fallbackMilestones, fallbackJyothiMilestones } = require('../data/fallbackData');

// @desc    Get all milestones
// @route   GET /api/milestones
// @access  Public
const getMilestones = async (req, res, next) => {
  try {
    const profileKey = req.query.profile || req.params.profile || 'gandra-venkata-ramana-reddy';
    const isJyothi = profileKey === 'gandra-jyothi';
    const defaultSet = isJyothi ? fallbackJyothiMilestones : fallbackMilestones;

    if (mongoose.connection.readyState !== 1) {
      return res.json({ success: true, count: defaultSet.length, data: defaultSet });
    }

    const filter = {
      profile: isJyothi ? 'gandra-jyothi' : { $in: ['gandra-venkata-ramana-reddy', null] },
    };

    const milestones = await Milestone.find(filter).sort({ order: 1, year: 1 });
    res.json({
      success: true,
      count: milestones.length,
      data: milestones.length > 0 ? milestones : defaultSet,
    });
  } catch (error) {
    const profileKey = req.query?.profile || 'gandra-venkata-ramana-reddy';
    const defaultSet = profileKey === 'gandra-jyothi' ? fallbackJyothiMilestones : fallbackMilestones;
    res.json({ success: true, count: defaultSet.length, data: defaultSet });
  }
};

// @desc    Create milestone
// @route   POST /api/milestones
// @access  Private (Admin)
const createMilestone = async (req, res, next) => {
  try {
    if (!req.body.profile) {
      req.body.profile = req.query.profile || 'gandra-venkata-ramana-reddy';
    }
    const milestone = await Milestone.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Milestone created successfully',
      data: milestone,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update milestone
// @route   PUT /api/milestones/:id
// @access  Private (Admin)
const updateMilestone = async (req, res, next) => {
  try {
    const milestone = await Milestone.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!milestone) {
      return res.status(404).json({ success: false, message: 'Milestone not found' });
    }
    res.json({
      success: true,
      message: 'Milestone updated successfully',
      data: milestone,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete milestone
// @route   DELETE /api/milestones/:id
// @access  Private (Admin)
const deleteMilestone = async (req, res, next) => {
  try {
    const milestone = await Milestone.findByIdAndDelete(req.params.id);
    if (!milestone) {
      return res.status(404).json({ success: false, message: 'Milestone not found' });
    }
    res.json({
      success: true,
      message: 'Milestone deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMilestones,
  createMilestone,
  updateMilestone,
  deleteMilestone,
};
