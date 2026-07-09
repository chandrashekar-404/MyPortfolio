const mongoose = require('mongoose');

const BugSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Bug title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Bug description is required']
  },
  severity: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium'
  },
  status: {
    type: String,
    enum: ['open', 'investigating', 'resolved'],
    default: 'open'
  },
  resolution: {
    type: String,
    default: ''
  },
  project: {
    type: String,
    required: [true, 'Project name is required'],
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Bug', BugSchema);
