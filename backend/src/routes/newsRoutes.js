const express = require('express');
const router = express.Router();
const {
  getNews,
  getNewsBySlug,
  createNews,
  updateNews,
  deleteNews,
} = require('../controllers/newsController');
const { protect } = require('../middleware/auth');

router.get('/', getNews);
router.get('/:slugOrId', getNewsBySlug);
router.post('/', protect, createNews);
router.put('/:id', protect, updateNews);
router.delete('/:id', protect, deleteNews);

module.exports = router;
