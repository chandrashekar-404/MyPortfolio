const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const AppError = require('../utils/appError');

const catchAsync = fn => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

exports.protect = catchAsync(async (req, res, next) => {
  // 1. Getting token and check if it's there
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('You are not logged in! Please login to get access.', 401));
  }

  // 2. Verification of token
  const decoded = jwt.verify(token, process.env.JWT_SECRET || 'devos-super-secret-security-key');

  // 3. Check if user still exists
  const currentAdmin = await Admin.findById(decoded.id);
  if (!currentAdmin) {
    return next(new AppError('The administrator belonging to this token no longer exists.', 401));
  }

  // Grant access to protected route
  req.admin = currentAdmin;
  next();
});
