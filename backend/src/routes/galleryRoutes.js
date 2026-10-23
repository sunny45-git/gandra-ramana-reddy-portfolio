const express = require('express');
const router = express.Router();
const {
  getGallery,
  uploadImageFile,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
} = require('../controllers/galleryController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', getGallery);
router.post('/upload', protect, upload.single('image'), uploadImageFile);
router.post('/', protect, createGalleryItem);
router.put('/:id', protect, updateGalleryItem);
router.delete('/:id', protect, deleteGalleryItem);

module.exports = router;
