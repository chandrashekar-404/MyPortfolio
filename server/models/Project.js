const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Project description is required']
  },
  tags: {
    type: [String],
    default: []
  },
  githubLink: {
    type: String,
    trim: true
  },
  liveLink: {
    type: String,
    trim: true
  },
  image: {
    type: String,
    default: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c'
  },
  architecture: {
    type: String,
    default: 'MERN Stack'
  },
  featured: {
    type: Boolean,
    default: false
  },
  
  // Extended details for DevOS portfolio specifications
  features: {
    type: [String],
    default: []
  },
  technologies: {
    type: [String],
    default: []
  },
  architectureDiagram: {
    type: String,
    default: ''
  },
  folderStructure: {
    type: String,
    default: ''
  },
  databaseSchema: {
    type: String,
    default: ''
  },
  screenshots: {
    type: [String],
    default: []
  },
  challengesFaced: {
    type: String,
    default: ''
  },
  problemsSolved: {
    type: String,
    default: ''
  },
  lessonsLearned: {
    type: String,
    default: ''
  },
  timeline: {
    type: String,
    default: ''
  },
  futureImprovements: {
    type: [String],
    default: []
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Project', ProjectSchema);
