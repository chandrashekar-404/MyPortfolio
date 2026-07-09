const express = require('express');
const projectController = require('../controllers/projectController');
const bugController = require('../controllers/bugController');
const contactController = require('../controllers/contactController');
const adminController = require('../controllers/adminController');
const blogController = require('../controllers/blogController');
const visitorController = require('../controllers/visitorController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Admin / Auth Routes
router.post('/admin/login', adminController.login);
router.get('/admin/verify', protect, adminController.verifyToken);
router.get('/admin/analytics', protect, adminController.getAnalytics);

// Projects routes
router.route('/projects')
  .get(projectController.getAllProjects)
  .post(protect, projectController.createProject);

router.route('/projects/:id')
  .get(projectController.getProject)
  .patch(protect, projectController.updateProject)
  .delete(protect, projectController.deleteProject);

// Blogs routes
router.route('/blogs')
  .get(blogController.getAllBlogs)
  .post(protect, blogController.createBlog);

router.get('/admin/blogs', protect, blogController.getAdminBlogs);

router.route('/blogs/:id')
  .get(blogController.getBlog)
  .patch(protect, blogController.updateBlog)
  .delete(protect, blogController.deleteBlog);

// Visitor Tracking Routes
router.post('/visitors/track', visitorController.trackVisit);
router.get('/visitors/stats', protect, visitorController.getStats);

// Contact messages admin routes
router.route('/messages')
  .get(protect, contactController.getAllMessages);

router.route('/messages/:id')
  .delete(protect, contactController.deleteMessage);

// Bugs routes (Bug Journal)
router.route('/bugs')
  .get(bugController.getAllBugs)
  .post(bugController.createBug);

router.route('/bugs/:id')
  .patch(bugController.updateBug)
  .delete(bugController.deleteBug);

// Contact submissions
router.route('/contact')
  .post(contactController.submitContact);

module.exports = router;
