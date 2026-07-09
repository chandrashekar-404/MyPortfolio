const Bug = require('../models/Bug');
const AppError = require('../utils/appError');

const catchAsync = fn => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

const initialBugs = [
  {
    title: 'Node.js Memory Leak on WebSocket Reconnections',
    description: 'During stress tests, memory usage spiked linearly with client connection cycles. Tracked down to event listeners on the socket manager object not being properly released on connection closure, causing GC to retain connection sockets.',
    severity: 'critical',
    status: 'resolved',
    resolution: 'Implemented socket-level cleanup routines. Swapped out inline anonymous event handlers in favor of named handlers, enabling complete event listener dereferencing during the disconnect sequence.',
    project: 'Real-time Metrics Dashboard'
  },
  {
    title: 'Hydration Mismatch in Server-Side React Components',
    description: 'Received warnings on client-side compilation regarding nested table structures. Server rendered dynamic data layout slightly differently from initial local client layout due to timezone variations.',
    severity: 'low',
    status: 'resolved',
    resolution: 'Forced rendering of dynamic timezone dependent modules inside a useEffect block, shifting the date translation to occur exclusively on client mount, resulting in clean hydration matching.',
    project: 'Developer Portfolio'
  },
  {
    title: 'MongoDB Connection Pools Saturation under Peak Load',
    description: 'API responsiveness degraded when concurrently processing database query bulk jobs. Investigated server logs and discovered connection exhaustion errors under heavy loads.',
    severity: 'high',
    status: 'resolved',
    resolution: 'Modified connection options to increase maxPoolSize. Integrated a job throttling queue in express middleware to spread batch processing and keep pool threads available for light API requests.',
    project: 'AI-Powered Code Refactoring Engine'
  }
];

exports.getAllBugs = catchAsync(async (req, res, next) => {
  let bugs = await Bug.find().sort({ createdAt: -1 });

  // Seed bugs if empty
  if (bugs.length === 0) {
    bugs = await Bug.insertMany(initialBugs);
  }

  res.status(200).json({
    status: 'success',
    results: bugs.length,
    data: { bugs }
  });
});

exports.createBug = catchAsync(async (req, res, next) => {
  const newBug = await Bug.create(req.body);
  res.status(201).json({
    status: 'success',
    data: { bug: newBug }
  });
});

exports.updateBug = catchAsync(async (req, res, next) => {
  const updatedBug = await Bug.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!updatedBug) {
    return next(new AppError('No bug found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { bug: updatedBug }
  });
});

exports.deleteBug = catchAsync(async (req, res, next) => {
  const bug = await Bug.findByIdAndDelete(req.params.id);

  if (!bug) {
    return next(new AppError('No bug found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});
