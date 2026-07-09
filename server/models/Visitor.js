const mongoose = require('mongoose');

const VisitorSchema = new mongoose.Schema({
  ip: {
    type: String,
    default: '127.0.0.1'
  },
  userAgent: {
    type: String,
    default: 'Unknown browser'
  },
  path: {
    type: String,
    default: '/'
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Visitor', VisitorSchema);
