const Blog = require('../models/Blog');
const AppError = require('../utils/appError');

const catchAsync = fn => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

const initialBlogs = [
  {
    title: 'Securing MERN Applications: A DevOS Guide',
    summary: 'A deep dive into integrating Helmet headers, custom CORS controls, request body limiting, and Rate Limiting schemas to safeguard Express endpoints.',
    content: `Building secure production-grade web products requires planning at the entry point of your server layer. In this guide, we break down essential security practices for Express-based backend models.

### 1. Security Headers with Helmet
The \`helmet\` middleware integrates secure HTTP headers immediately upon requests. This restricts MIME-sniffing, disables \`X-Powered-By\` headers which reveal server engines, and sets strong Content Security Policies (CSP).

\`\`\`javascript
const express = require('express');
const helmet = require('helmet');
const app = express();
app.use(helmet());
\`\`\`

### 2. CORS (Cross-Origin Resource Sharing)
Ensure you set Origin constraints strictly to your frontend domain in production rather than leaving a wildcard (*).

\`\`\`javascript
const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'https://chandrashekhar.dev',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
\`\`\`

### 3. IP Rate Limiting
To defend against brute-force logins or spam messaging, install \`express-rate-limit\` to throttle incoming requests on critical auth routes.`,
    tags: ['Security', 'Express', 'MERN', 'Node.js'],
    image: 'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&q=80&w=800',
    author: 'Chandrashekhar H R'
  },
  {
    title: 'Building Interactive Terminal Dashboards in React',
    summary: 'An exploration into engineering terminal interfaces, blinking cursors, dynamic shell logs, and responsive layout architectures utilizing Framer Motion.',
    content: `Traditional grids of static summaries are common. Building an interactive developer console is a fun way to showcase command line competence and frontend capabilities in one project.

### The Shell Command Parser
At the core of the layout sits a command parser. It registers key triggers, matches commands (like \`help\`, \`projects\`, \`clear\`), updates a linear log array history, and dispatches route hooks.

\`\`\`javascript
const handleCommand = (input) => {
  const cmd = input.trim().toLowerCase();
  switch(cmd) {
    case 'help':
      log('Available commands: projects, about, clear');
      break;
    case 'projects':
      navigate('/projects');
      break;
    default:
      log(\`Command '\${cmd}' not found.\`);
  }
};
\`\`\`

Using Tailwind CSS v4 custom variables for colors (like cyberpunk neon yellows or deep greens) lets us switch between visual themes in real time.`,
    tags: ['React', 'TailwindCSS', 'Framer Motion', 'UI/UX'],
    image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=800',
    author: 'Chandrashekhar H R'
  }
];

exports.getAllBlogs = catchAsync(async (req, res, next) => {
  let blogs = await Blog.find({ published: true }).sort({ createdAt: -1 });

  // If no blogs, seed initial articles
  if (blogs.length === 0) {
    blogs = await Blog.insertMany(initialBlogs);
  }

  res.status(200).json({
    status: 'success',
    results: blogs.length,
    data: { blogs }
  });
});

exports.getAdminBlogs = catchAsync(async (req, res, next) => {
  // Admin sees published and unpublished
  const blogs = await Blog.find().sort({ createdAt: -1 });

  res.status(200).json({
    status: 'success',
    results: blogs.length,
    data: { blogs }
  });
});

exports.getBlog = catchAsync(async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    return next(new AppError('No blog found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { blog }
  });
});

exports.createBlog = catchAsync(async (req, res, next) => {
  const newBlog = await Blog.create(req.body);
  res.status(201).json({
    status: 'success',
    data: { blog: newBlog }
  });
});

exports.updateBlog = catchAsync(async (req, res, next) => {
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!updatedBlog) {
    return next(new AppError('No blog found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { blog: updatedBlog }
  });
});

exports.deleteBlog = catchAsync(async (req, res, next) => {
  const blog = await Blog.findByIdAndDelete(req.params.id);

  if (!blog) {
    return next(new AppError('No blog found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});
