const mongoose = require('mongoose');

const MilestoneSchema = new mongoose.Schema(
  {
    year: {
      type: String,
      required: true,
    },
    title: {
      en: { type: String, required: true },
      te: { type: String, required: true },
    },
    roleOrCategory: {
      en: { type: String, default: '' },
      te: { type: String, default: '' },
    },
    description: {
      en: { type: String, required: true },
      te: { type: String, required: true },
    },
    order: {
      type: Number,
      default: 0,
    },
    isVerified: {
      type: Boolean,
      default: true,
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

module.exports = mongoose.model('Milestone', MilestoneSchema);
