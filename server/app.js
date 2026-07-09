const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const apiRouter = require('./routes/api');
const errorHandler = require('./middleware/errorHandler');
const AppError = require('./utils/appError');

const app = express();

// 1. GLOBAL MIDDLEWARES

// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Implement IP rate limiting
const limiter = rateLimit({
  max: 300, // Limit each IP to 300 requests per 15 mins
  windowMs: 15 * 60 * 1000, // 15 minutes
  message: 'Too many requests from this IP, please try again in 15 minutes!'
});
app.use('/api', limiter);

// Implement CORS
const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

// 2. ROUTES
app.use('/api', apiRouter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Backend API is running smoothly',
    timestamp: new Date()
  });
});

// Handle unhandled routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// 3. GLOBAL ERROR HANDLING MIDDLEWARE
app.use(errorHandler);

module.exports = app;
