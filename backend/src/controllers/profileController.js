const Profile = require('../models/Profile');
const mongoose = require('mongoose');
const { fallbackProfile } = require('../data/fallbackData');

// @desc    Get public politician profile
// @route   GET /api/profile
// @access  Public
const getProfile = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json({ success: true, data: fallbackProfile });
    }
    let profile = await Profile.findOne();
    if (!profile) {
      profile = await Profile.create(fallbackProfile);
    }
    res.json({
      success: true,
      data: profile,
    });
  } catch (error) {
    // If DB is offline or in serverless cold start, serve fallback profile
    res.json({ success: true, data: fallbackProfile });
  }
};

// @desc    Update politician profile
// @route   PUT /api/profile
// @access  Private (Admin)
const updateProfile = async (req, res, next) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      profile = new Profile(req.body);
    } else {
      Object.assign(profile, req.body);
    }
    const updated = await profile.save();
    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get Gandra Jyothi profile specifically
// @route   GET /api/profile/gandra-jyothi or GET /api/gandra-jyothi/profile
// @access  Public
const getGandraJyothiProfile = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json({ success: true, data: fallbackProfile.gandraJyothi });
    }
    let profile = await Profile.findOne();
    if (!profile) {
      profile = await Profile.create(fallbackProfile);
    }
    res.json({
      success: true,
      data: profile.gandraJyothi || fallbackProfile.gandraJyothi,
    });
  } catch (error) {
    res.json({ success: true, data: fallbackProfile.gandraJyothi });
  }
};

// @desc    Update Gandra Jyothi section specifically
// @route   PUT /api/profile/gandra-jyothi or PUT /api/gandra-jyothi/profile
// @access  Private (Admin)
const updateGandraJyothi = async (req, res, next) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      profile = new Profile();
    }
    profile.gandraJyothi = {
      ...profile.gandraJyothi.toObject(),
      ...req.body,
    };
    const updated = await profile.save();
    res.json({
      success: true,
      message: 'Gandra Jyothi section updated successfully',
      data: updated.gandraJyothi,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update Educational Qualifications specifically
// @route   PUT /api/profile/education
// @access  Private (Admin)
const updateEducation = async (req, res, next) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      profile = new Profile();
    }
    const { educationalQualifications, educationVerificationStatus } = req.body;
    if (educationalQualifications !== undefined) {
      profile.educationalQualifications = educationalQualifications;
    }
    if (educationVerificationStatus !== undefined) {
      profile.educationVerificationStatus = {
        ...profile.educationVerificationStatus?.toObject?.() || {},
        ...educationVerificationStatus,
      };
    }
    const updated = await profile.save();
    res.json({
      success: true,
      message: 'Educational qualifications updated successfully',
      data: {
        educationalQualifications: updated.educationalQualifications,
        educationVerificationStatus: updated.educationVerificationStatus,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProfile,
  updateProfile,
  getGandraJyothiProfile,
  updateGandraJyothi,
  updateEducation,
};
