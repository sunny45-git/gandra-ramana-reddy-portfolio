const NewsArticle = require('../models/NewsArticle');
const mongoose = require('mongoose');
const { fallbackNews, fallbackJyothiNews } = require('../data/fallbackData');

const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .slice(0, 100);
};

// @desc    Get all published news (or all news for admin)
// @route   GET /api/news
// @access  Public
const getNews = async (req, res, next) => {
  try {
    const profileKey = req.query.profile || req.params.profile || 'gandra-venkata-ramana-reddy';
    const isJyothi = profileKey === 'gandra-jyothi';
    const defaultSet = isJyothi ? fallbackJyothiNews : fallbackNews;

    if (mongoose.connection.readyState !== 1) {
      return res.json({ success: true, count: defaultSet.length, data: defaultSet });
    }

    const { status, limit } = req.query;
    const filter = {
      profile: isJyothi ? 'gandra-jyothi' : { $in: ['gandra-venkata-ramana-reddy', null] },
    };

    if (status) {
      filter.isPublished = status === 'published';
    } else if (!req.user) {
      filter.isPublished = true;
    }

    const query = NewsArticle.find(filter).sort({ publishedAt: -1 });
    if (limit) {
      query.limit(parseInt(limit, 10));
    }

    const articles = await query;
    res.json({
      success: true,
      count: articles.length,
      data: articles.length > 0 ? articles : defaultSet,
    });
  } catch (error) {
    const profileKey = req.query?.profile || 'gandra-venkata-ramana-reddy';
    const defaultSet = profileKey === 'gandra-jyothi' ? fallbackJyothiNews : fallbackNews;
    res.json({ success: true, count: defaultSet.length, data: defaultSet });
  }
};

// @desc    Get single news article by slug or ID
// @route   GET /api/news/:slugOrId
// @access  Public
const getNewsBySlug = async (req, res, next) => {
  try {
    const { slugOrId } = req.params;
    let article;
    if (mongoose.connection.readyState === 1) {
      if (slugOrId.match(/^[0-9a-fA-F]{24}$/)) {
        article = await NewsArticle.findById(slugOrId);
      } else {
        article = await NewsArticle.findOne({ slug: slugOrId });
      }
    }

    if (!article) {
      article = fallbackNews.find((n) => n.slug === slugOrId || n._id === slugOrId);
    }

    if (!article) {
      return res.status(404).json({ success: false, message: 'Article not found' });
    }

    res.json({ success: true, data: article });
  } catch (error) {
    const fb = fallbackNews.find((n) => n.slug === req.params.slugOrId || n._id === req.params.slugOrId);
    if (fb) return res.json({ success: true, data: fb });
    next(error);
  }
};

// @desc    Create news article
// @route   POST /api/news
// @access  Private (Admin)
const createNews = async (req, res, next) => {
  try {
    const { title, summary, content, category, publishedAt, imageUrl, isPublished } = req.body;

    let slug = slugify(title.en || 'news-article');
    const exists = await NewsArticle.findOne({ slug });
    if (exists) {
      slug = `${slug}-${Date.now().toString().slice(-4)}`;
    }

    const article = await NewsArticle.create({
      title,
      slug,
      summary,
      content,
      category: category || { en: 'Press Statement', te: 'పత్రికా ప్రకటన' },
      publishedAt: publishedAt || Date.now(),
      imageUrl: imageUrl || '/images/gandra-ramana-reddy-portrait.png',
      isPublished: isPublished !== undefined ? isPublished : true,
      profile: req.body.profile || req.query.profile || 'gandra-venkata-ramana-reddy',
    });

    res.status(201).json({
      success: true,
      message: 'News announcement created successfully',
      data: article,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update news article
// @route   PUT /api/news/:id
// @access  Private (Admin)
const updateNews = async (req, res, next) => {
  try {
    const article = await NewsArticle.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!article) {
      return res.status(404).json({ success: false, message: 'Article not found' });
    }

    res.json({
      success: true,
      message: 'News article updated',
      data: article,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete news article
// @route   DELETE /api/news/:id
// @access  Private (Admin)
const deleteNews = async (req, res, next) => {
  try {
    const article = await NewsArticle.findByIdAndDelete(req.params.id);
    if (!article) {
      return res.status(404).json({ success: false, message: 'Article not found' });
    }
    res.json({
      success: true,
      message: 'News article deleted',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getNews,
  getNewsBySlug,
  createNews,
  updateNews,
  deleteNews,
};
