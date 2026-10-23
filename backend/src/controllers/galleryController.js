const GalleryImage = require('../models/GalleryImage');
const mongoose = require('mongoose');
const { fallbackGallery, fallbackJyothiGallery } = require('../data/fallbackData');

// @desc    Get gallery images
// @route   GET /api/gallery
// @access  Public
const getGallery = async (req, res, next) => {
  try {
    const profileKey = req.query.profile || req.params.profile || 'gandra-venkata-ramana-reddy';
    const isJyothi = profileKey === 'gandra-jyothi';
    const defaultSet = isJyothi ? fallbackJyothiGallery : fallbackGallery;

    if (mongoose.connection.readyState !== 1) {
      let filtered = [...defaultSet];
      if (req.query.category && req.query.category !== 'All') {
        filtered = filtered.filter((g) => g.category === req.query.category);
      }
      return res.json({ success: true, count: filtered.length, data: filtered });
    }

    const { category } = req.query;
    const filter = {
      profile: isJyothi ? 'gandra-jyothi' : { $in: ['gandra-venkata-ramana-reddy', null] },
    };

    if (category && category !== 'All') {
      filter.category = category;
    }

    const images = await GalleryImage.find(filter).sort({ displayOrder: 1, createdAt: -1 });
    res.json({
      success: true,
      count: images.length,
      data: images.length > 0 ? images : defaultSet,
    });
  } catch (error) {
    const profileKey = req.query?.profile || 'gandra-venkata-ramana-reddy';
    const defaultSet = profileKey === 'gandra-jyothi' ? fallbackJyothiGallery : fallbackGallery;
    res.json({ success: true, count: defaultSet.length, data: defaultSet });
  }
};

// @desc    Upload image file
// @route   POST /api/gallery/upload
// @access  Private (Admin)
const uploadImageFile = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'Please select an image file to upload' });
  }
  const fileUrl = `/uploads/${req.file.filename}`;
  res.status(201).json({
    success: true,
    message: 'Image uploaded successfully',
    url: fileUrl,
    filename: req.file.filename,
  });
};

// @desc    Create gallery image entry
// @route   POST /api/gallery
// @access  Private (Admin)
const createGalleryItem = async (req, res, next) => {
  try {
    if (!req.body.profile) {
      req.body.profile = req.query.profile || 'gandra-venkata-ramana-reddy';
    }
    const image = await GalleryImage.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Image item added to gallery',
      data: image,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update gallery image entry
// @route   PUT /api/gallery/:id
// @access  Private (Admin)
const updateGalleryItem = async (req, res, next) => {
  try {
    const image = await GalleryImage.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!image) {
      return res.status(404).json({ success: false, message: 'Gallery image not found' });
    }
    res.json({
      success: true,
      message: 'Gallery item updated',
      data: image,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete gallery image entry
// @route   DELETE /api/gallery/:id
// @access  Private (Admin)
const deleteGalleryItem = async (req, res, next) => {
  try {
    const image = await GalleryImage.findByIdAndDelete(req.params.id);
    if (!image) {
      return res.status(404).json({ success: false, message: 'Gallery image not found' });
    }
    res.json({
      success: true,
      message: 'Gallery item removed',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getGallery,
  uploadImageFile,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
};
