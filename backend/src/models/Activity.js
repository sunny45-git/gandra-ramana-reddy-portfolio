const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema(
  {
    title: {
      en: { type: String, required: true },
      te: { type: String, required: true },
    },
    category: {
      type: String,
      enum: ['Welfare', 'Infrastructure', 'Constituency', 'Grievance', 'Community', 'Agriculture'],
      default: 'Community',
    },
    date: {
      type: Date,
      default: Date.now,
    },
    location: {
      en: { type: String, default: 'Bhupalpally, Telangana' },
      te: { type: String, default: 'భూపాలపల్లి, తెలంగాణ' },
    },
    description: {
      en: { type: String, required: true },
      te: { type: String, required: true },
    },
    imageUrl: {
      type: String,
      default: '/images/gandra-ramana-reddy-portrait.png',
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['Published', 'Draft'],
      default: 'Published',
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

module.exports = mongoose.model('Activity', ActivitySchema);
