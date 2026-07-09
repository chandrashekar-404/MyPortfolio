const Visitor = require('../models/Visitor');

const catchAsync = fn => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

exports.trackVisit = catchAsync(async (req, res, next) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
  const userAgent = req.headers['user-agent'] || 'Unknown Browser';
  const { path } = req.body;

  // Avoid logging static asset hits, log page layouts
  await Visitor.create({
    ip,
    userAgent,
    path: path || '/'
  });

  const totalHits = await Visitor.countDocuments();

  res.status(201).json({
    status: 'success',
    data: {
      totalHits
    }
  });
});

exports.getStats = catchAsync(async (req, res, next) => {
  const total = await Visitor.countDocuments();
  const logs = await Visitor.find().sort({ timestamp: -1 }).limit(100);

  res.status(200).json({
    status: 'success',
    data: {
      total,
      logs
    }
  });
});
