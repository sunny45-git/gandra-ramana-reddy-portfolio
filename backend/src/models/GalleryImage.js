const mongoose = require('mongoose');

const GalleryImageSchema = new mongoose.Schema(
  {
    title: {
      en: { type: String, required: true },
      te: { type: String, required: true },
    },
    category: {
      type: String,
      enum: ['Public Engagements', 'State Affairs', 'Community Programs', 'Family & Leadership'],
      default: 'Public Engagements',
    },
    imageUrl: {
      type: String,
      required: true,
    },
    caption: {
      en: { type: String, default: '' },
      te: { type: String, default: '' },
    },
    date: {
      type: Date,
      default: Date.now,
    },
    displayOrder: {
      type: Number,
      default: 0,
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

module.exports = mongoose.model('GalleryImage', GalleryImageSchema);
