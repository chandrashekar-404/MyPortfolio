const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const Project = require('../models/Project');
const Blog = require('../models/Blog');
const Contact = require('../models/Contact');
const Visitor = require('../models/Visitor');
const AppError = require('../utils/appError');

const catchAsync = fn => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'devos-super-secret-security-key', {
    expiresIn: process.env.JWT_EXPIRES_IN || '30d'
  });
};

// Check and seed default admin if none exist
const seedDefaultAdmin = async () => {
  const adminsCount = await Admin.countDocuments();
  if (adminsCount === 0) {
    const defaultPassword = 'admin_devos_2026';
    await Admin.create({
      username: 'admin',
      password: defaultPassword
    });
    console.log(`[SEED] Default admin created. Username: admin, Password: ${defaultPassword}`);
  }
};

// Invoke seeding
seedDefaultAdmin().catch(err => console.error('[SEED ERROR] Could not seed admin:', err));

exports.login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;

  // 1) Check if username and password exist
  if (!username || !password) {
    return next(new AppError('Please provide username and password!', 400));
  }

  // 2) Check if user exists & password is correct
  const admin = await Admin.findOne({ username: username.toLowerCase() });

  if (!admin || !(await admin.correctPassword(password, admin.password))) {
    return next(new AppError('Incorrect username or password', 401));
  }

  // 3) If everything ok, send token to client
  const token = signToken(admin._id);

  res.status(200).json({
    status: 'success',
    token,
    data: {
      admin: {
        id: admin._id,
        username: admin.username
      }
    }
  });
});

exports.verifyToken = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    data: {
      admin: {
        id: req.admin._id,
        username: req.admin.username
      }
    }
  });
});

// Admin Dashboard Analytics
exports.getAnalytics = catchAsync(async (req, res, next) => {
  const [
    totalProjects,
    totalBlogs,
    totalMessages,
    totalVisitors,
    recentMessages,
    recentVisitors
  ] = await Promise.all([
    Project.countDocuments(),
    Blog.countDocuments(),
    Contact.countDocuments(),
    Visitor.countDocuments(),
    Contact.find().sort({ createdAt: -1 }).limit(10),
    Visitor.find().sort({ timestamp: -1 }).limit(10)
  ]);

  // Group visits by date (last 7 days)
  const visitors7Days = await Visitor.aggregate([
    {
      $match: {
        timestamp: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
      }
    },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
        count: { $sum: 1 }
      }
    },
    { $sort: { _id: 1 } }
  ]);

  // Group visits by path
  const visitorsByPath = await Visitor.aggregate([
    {
      $group: {
        _id: "$path",
        count: { $sum: 1 }
      }
    },
    { $sort: { count: -1 } },
    { $limit: 5 }
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      counts: {
        projects: totalProjects,
        blogs: totalBlogs,
        messages: totalMessages,
        visitors: totalVisitors
      },
      recentMessages,
      recentVisitors,
      charts: {
        dailyVisits: visitors7Days,
        popularPaths: visitorsByPath
      }
    }
  });
});
