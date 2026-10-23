const mongoose = require('mongoose');

const NewsArticleSchema = new mongoose.Schema(
  {
    title: {
      en: { type: String, required: true },
      te: { type: String, required: true },
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    summary: {
      en: { type: String, required: true },
      te: { type: String, required: true },
    },
    content: {
      en: { type: String, required: true },
      te: { type: String, required: true },
    },
    category: {
      en: { type: String, default: 'Public Statement' },
      te: { type: String, default: 'ప్రజా ప్రకటన' },
    },
    publishedAt: {
      type: Date,
      default: Date.now,
    },
    imageUrl: {
      type: String,
      default: '/images/gandra-ramana-reddy-portrait.png',
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    author: {
      type: String,
      default: 'Office of Gandra Venkata Ramana Reddy',
    },
    profile: {
      type: String,
      enum: ['gandra-venkata-ramana-reddy', 'gandra-jyothi'],
      default: 'gandra-venkata-ramana-reddy',
      index: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('NewsArticle', NewsArticleSchema);
