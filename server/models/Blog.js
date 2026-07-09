const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Blog title is required'],
    trim: true
  },
  content: {
    type: String,
    required: [true, 'Blog content is required']
  },
  summary: {
    type: String,
    trim: true
  },
  tags: {
    type: [String],
    default: []
  },
  image: {
    type: String,
    default: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=800'
  },
  author: {
    type: String,
    default: 'Chandrashekhar H R'
  },
  published: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Blog', BlogSchema);
