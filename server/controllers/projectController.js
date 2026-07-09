const Project = require('../models/Project');
const AppError = require('../utils/appError');

const catchAsync = fn => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

const initialProjects = [
  {
    title: 'CissanMart',
    description: 'A farm-to-community marketplace that directly connects farmers with buyers without intermediaries. Built with a scalable MERN architecture featuring real-time inventory, auctions, role-based dashboards, secure payments, and analytics.',
    tags: ['MERN Stack', 'Featured', 'Full Stack'],
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Socket.io', 'Razorpay', 'REST API', 'Android Java'],
    githubLink: 'https://github.com/chanduuu8971/cissanmart',
    liveLink: '',
    image: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&q=80&w=800',
    architecture: 'React Frontend integrated with Socket.io tunnels and Express.js REST API modules. Persisted using MongoDB Atlas and secured with JWT. Integrated Razorpay payment SDK.',
    featured: true,
    features: [
      'Buyer Dashboard',
      'Farmer Dashboard',
      'Admin Dashboard',
      'Daily Auction System',
      'Community Orders',
      'Real-Time Inventory',
      'Product Management',
      'Order Tracking',
      'Secure Authentication',
      'Payment Gateway',
      'Notifications',
      'Sales Reports'
    ],
    architectureDiagram: `
+-----------------------------+
|    React Client View (Vite) |
+-------+--------------+------+
        | (REST API)   | (WebSockets)
        v              v
+-------+--------------+------+
|     Express Web Server      |
|  (Razorpay SDK, Socket.io)  |
+--------------+--------------+
               | (Mongoose)
               v
+--------------+--------------+
|      MongoDB Atlas DB       |
+-----------------------------+
    `,
    folderStructure: `
cissanmart/
├── client/
│   ├── src/
│   │   ├── components/
│   │   └── pages/
└── server/
    ├── controllers/
    ├── models/
    └── server.js
    `,
    databaseSchema: `
Collections:
1. users (id, name, role [farmer, buyer, admin])
2. products (id, title, price, quantity, farmer_id)
3. auctions (id, product_id, current_bid, highest_bidder, end_time)
4. orders (id, buyer_id, total, status, pay_reference)
    `,
    challengesFaced: 'Enforcing real-time bidding synchronization across hundreds of buyers during high-intensity crop auctions.',
    problemsSolved: 'Swapped standard REST polling for Socket.io rooms, enabling immediate event broadcasting of updated auction bids with sub-50ms latency.',
    lessonsLearned: 'Mastered web sockets state management, secure payment flows, and role-based middleware structures.',
    timeline: 'Nov 2025 - Dec 2025',
    futureImprovements: [
      'Incorporate AI demand-forecasting models',
      'Implement SMS alerts for farmers'
    ]
  },
  {
    title: 'Restaurant POS & Billing System',
    description: 'An Android-based Restaurant Billing System supporting thermal printing, table management, inventory management, sales reporting, and complete restaurant operations.',
    tags: ['Android', 'Completed'],
    technologies: ['Java', 'Android Studio', 'Room Database', 'SQLite', 'Thermal Printer', 'Material Design'],
    githubLink: 'https://github.com/chanduuu8971/restaurant-pos',
    liveLink: '',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800',
    architecture: 'Native Android application built following MVVM patterns. Relies on SQLite local storage managed through Room schemas.',
    featured: false,
    features: [
      'Thermal Bill Printing',
      'Table Management',
      'Dine-In & Take Away',
      'Parcel Charges',
      'Sales Reports',
      'Inventory Management',
      'Daily Reports',
      'Payment Types'
    ],
    architectureDiagram: `
+-----------------------------+
|    UI / Activity Layer      |
|  (POS Tables & Billing)     |
+--------------+--------------+
               | (LiveData)
               v
+--------------+--------------+
|        ViewModel Layer      |
+--------------+--------------+
               | (Room DAO)
               v
+--------------+--------------+
|      SQLite Database        |
+-----------------------------+
    `,
    folderStructure: `
pos-app/
├── app/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/pos/
│   │   │   │   ├── database/
│   │   │   │   │   ├── RoomDB.java
│   │   │   │   │   └── ProductDao.java
│   │   │   │   ├── ui/
│   │   │   │   └── viewmodel/
│   │   │   └── res/layout/
    `,
    databaseSchema: `
SQLite Tables:
1. categories (id, name)
2. items (id, name, price, stock_quantity, category_id)
3. orders (id, total_amount, payment_mode, timestamp)
4. order_details (id, order_id, item_id, quantity, subtotal)
    `,
    challengesFaced: 'Interfacing with diverse Bluetooth Esc/Pos thermal billing devices and rendering clean layouts.',
    problemsSolved: 'Constructed custom byte-stream converters translating raw string receipts into formatted ESC commands for generic print drives.',
    lessonsLearned: 'Deepened knowledge of Android Room triggers, lifecycle-aware components, and Bluetooth stream queues.',
    timeline: 'Aug 2025 - Oct 2025',
    futureImprovements: [
      'Integrate cloud syncing endpoints',
      'Support UPI payment receipt scans'
    ]
  },
  {
    title: 'Phantom Net',
    description: 'AI-powered emergency communication platform using image steganography for secure SOS messaging and intelligent crisis detection.',
    tags: ['AI', 'Research Project'],
    technologies: ['Python', 'Machine Learning', 'Steganography', 'OpenCV', 'AI'],
    githubLink: 'https://github.com/chanduuu8971/phantom-net',
    liveLink: '',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800',
    architecture: 'Steganographic processing scripts written in Python, coupled with machine learning nodes to parsing SOS indicators.',
    featured: false,
    features: [
      'Hidden SOS Messages',
      'Image Encryption',
      'AI Detection',
      'Emergency Communication',
      'Crisis Alerts'
    ],
    architectureDiagram: `
+-----------------------------+
|    Distress Client Device   |
+--------------+--------------+
               | (Stego Image Payload)
               v
+--------------+--------------+
|     Phantom Net Decoder      |
|  (Stego Extraction & ML)    |
+--------------+--------------+
               v
+--------------+--------------+
|      Emergency Channels     |
+-----------------------------+
    `,
    folderStructure: `
phantom-net/
├── src/
│   ├── decoder/
│   │   └── stego.py
│   └── api.py
├── requirements.txt
└── README.md
    `,
    databaseSchema: `
Config details:
- Stego: LSB (Least Significant Bit) encryption.
- AI: Crisis image classification models.
    `,
    challengesFaced: 'Extracting clean bits streams from low-resolution images received over noisy RF frequencies.',
    problemsSolved: 'Applied OpenCV bilateral filters and median-blur algorithms to clean incoming payloads before decoding bit streams.',
    lessonsLearned: 'Enhanced understanding of cryptographic principles, digital signal processing, and steganography formats.',
    timeline: 'May 2025 - Jul 2025',
    futureImprovements: [
      'Add voice steganography support',
      'Deploy on Raspberry Pi off-grid nodes'
    ]
  },
  {
    title: 'DevOS Workstation',
    description: 'Cyberpunk operating-system-inspired portfolio featuring interactive terminal, futuristic UI, animated dashboards, and modern web technologies.',
    tags: ['Portfolio', 'Live'],
    technologies: ['React', 'Vite', 'JavaScript', 'Framer Motion', 'CSS'],
    githubLink: 'https://github.com/chanduuu8971/portfolio-mern',
    liveLink: 'http://localhost:5173',
    image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=800',
    architecture: 'React Single Page App using CSS variable overrides for theme toggles and Framer Motion layouts animations.',
    featured: false,
    features: [
      'Interactive Terminal',
      'Dynamic Typing',
      'Project Explorer',
      'Skills Dashboard',
      'Resume',
      'Contact Form'
    ],
    architectureDiagram: `
+-----------------------------+
|    React Client View (Vite) |
+--------------+--------------+
               | (Axios JSON API)
               v
+--------------+--------------+
|     Express Web Server      |
+-----------------------------+
    `,
    folderStructure: `
portfolio-mern/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── services/
└── server/
    `,
    databaseSchema: `
MongoDB Collections:
1. projects
2. bugs
3. visitors
4. contacts
    `,
    challengesFaced: 'Maintaining performance while executing complex Framer Motion layouts transitions.',
    problemsSolved: 'Utilized React lazy load code-splitting and CSS variable hardware-accelerated transitions.',
    lessonsLearned: 'Mastered CSS variables scoping, CSS theme bindings, and shell parsing trees.',
    timeline: 'Jul 2026',
    futureImprovements: [
      'Add fully functional terminal text editor',
      'Build real-time monitoring charts'
    ]
  },
  {
    title: 'Issue Tracker',
    description: 'Task and issue management platform supporting authentication, CRUD operations, project management, and dashboards.',
    tags: ['Full Stack', 'Completed'],
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT'],
    githubLink: 'https://github.com/chanduuu8971/issue-tracker',
    liveLink: '',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    architecture: 'Standard MERN routing architecture displaying metrics charts via Chart.js.',
    featured: false,
    features: [
      'Authentication',
      'CRUD Operations',
      'Dashboard',
      'User Management',
      'Status Tracking'
    ],
    challengesFaced: 'Orchestrating state updates when issues are reassigned across team workspaces.',
    problemsSolved: 'Constructed custom React context handlers that dispatch optimistic updates, decreasing perceived load lags.',
    lessonsLearned: 'Learned state synchronization patterns, user authorization rules, and CRUD layouts.',
    timeline: 'Dec 2024 - Jan 2025',
    futureImprovements: [
      'Integrate email warnings using SES',
      'Support automated PDF export logs'
    ]
  },
  {
    title: 'Sales Analytics Dashboard',
    description: 'Interactive dashboard displaying sales trends, product analytics, inventory insights, and revenue reports.',
    tags: ['Analytics', 'Completed'],
    technologies: ['React', 'Chart.js', 'MongoDB', 'Node.js'],
    githubLink: 'https://github.com/chanduuu8971/sales-analytics',
    liveLink: '',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    architecture: 'React SPA integrating dynamic Chart.js canvas elements to read telemetry feeds.',
    featured: false,
    features: [
      'Revenue Charts',
      'Inventory Reports',
      'Product Analytics',
      'Daily Reports',
      'Monthly Reports'
    ],
    challengesFaced: 'Rendering charts with thousands of transaction points without dropping frame rates.',
    problemsSolved: 'Written data pre-aggregations on the MongoDB database layer using aggregate pipelines, reducing response size by 85%.',
    lessonsLearned: 'Mastered MongoDB aggregations pipeline commands and performance layouts in ChartJS.',
    timeline: 'Sep 2024 - Nov 2024',
    futureImprovements: [
      'Add linear regression predictive sales algorithms',
      'Support Excel sheet downloads'
    ]
  },
  {
    title: 'Authentication System',
    description: 'Secure authentication system implementing JWT authentication, role-based access, password encryption, and authorization middleware.',
    tags: ['Backend', 'Completed'],
    technologies: ['Node.js', 'Express', 'MongoDB', 'JWT', 'bcrypt'],
    githubLink: 'https://github.com/chanduuu8971/auth-system',
    liveLink: '',
    image: 'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&q=80&w=800',
    architecture: 'Pure backend security model utilizing authorization middleware arrays in Express.',
    featured: false,
    features: [
      'Login',
      'Registration',
      'JWT Authentication',
      'Role Management',
      'Password Encryption'
    ],
    challengesFaced: 'Securing cookies against XSS (Cross Site Scripting) and CSRF hijack attempts.',
    problemsSolved: 'Configured tokens using HttpOnly, secure, and sameSite cookie configurations strictly enforced in CORS headers.',
    lessonsLearned: 'Mastered cryptographic hash routines, secure authentication patterns, and security headers.',
    timeline: 'Jul 2024 - Aug 2024',
    futureImprovements: [
      'Add Two Factor Authentication (2FA) support',
      'Support secure OAuth bindings'
    ]
  },
  {
    title: 'Real-Time Chat System',
    description: 'Socket.IO based real-time messaging platform supporting instant communication and notification delivery.',
    tags: ['Backend', 'Completed'],
    technologies: ['Socket.IO', 'Node.js', 'MongoDB', 'Express'],
    githubLink: 'https://github.com/chanduuu8971/chat-system',
    liveLink: '',
    image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=800',
    architecture: 'Full stack messaging server linking direct Socket.io event triggers to client stores.',
    featured: false,
    features: [
      'Live Chat',
      'Notifications',
      'Read Receipts',
      'Real-Time Messaging'
    ],
    challengesFaced: 'Maintaining connection counts under network disruptions.',
    problemsSolved: 'Implemented connection state recoveries on Socket.io, enabling users to fetch missed buffers upon re-entry.',
    lessonsLearned: 'Acquired core competencies in event-driven programming, real-time channels synchronization, and pub/sub hooks.',
    timeline: 'Feb 2025 - Apr 2025',
    futureImprovements: [
      'Add end-to-end encrypted messaging packages',
      'Support media file payloads sharing'
    ]
  },
  {
    title: 'AWS Cloud Demonstrations',
    description: 'Hands-on implementations of various AWS cloud services for deployment, storage, networking, and messaging.',
    tags: ['Cloud', 'Learning'],
    technologies: ['Amazon EC2', 'Amazon S3', 'CloudFront', 'SNS', 'SQS', 'Lambda', 'EBS', 'EFS', 'EKS'],
    githubLink: 'https://github.com/chanduuu8971/aws-demos',
    liveLink: '',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
    architecture: 'Cloud configuration models using AWS CLI scripts, S3 bindings, networking gateway, and EKS container configs.',
    featured: false,
    features: [
      'EC2 Instance Provisioning',
      'S3 Static Assets Storage Configuration',
      'CloudFront CDN Caching Rules',
      'Lambda Serverless API Handlers',
      'SQS Queuing Integrations'
    ],
    challengesFaced: 'Setting up VPC network bindings between private subnet EC2 containers and database servers.',
    problemsSolved: 'Configured custom security groups, elastic IP endpoints, and NAT gateways to secure database subnets.',
    lessonsLearned: 'Mastered cloud networking layouts, serverless architecture models, and secure asset caching.',
    timeline: 'Jan 2026 - Present',
    futureImprovements: [
      'Implement Terraform Infrastructure-as-Code modules',
      'Build fully automated CI/CD deployment runs'
    ]
  }
];

exports.getAllProjects = catchAsync(async (req, res, next) => {
  let projects = await Project.find().sort({ createdAt: -1 });

  // If no projects exist, seed the initial ones
  if (projects.length === 0) {
    projects = await Project.insertMany(initialProjects);
  }

  res.status(200).json({
    status: 'success',
    results: projects.length,
    data: { projects }
  });
});

exports.getProject = catchAsync(async (req, res, next) => {
  const project = await Project.findById(req.params.id);
  if (!project) {
    return next(new AppError('No project found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { project }
  });
});

exports.createProject = catchAsync(async (req, res, next) => {
  const newProject = await Project.create(req.body);
  res.status(201).json({
    status: 'success',
    data: { project: newProject }
  });
});

exports.updateProject = catchAsync(async (req, res, next) => {
  const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!updatedProject) {
    return next(new AppError('No project found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { project: updatedProject }
  });
});

exports.deleteProject = catchAsync(async (req, res, next) => {
  const project = await Project.findByIdAndDelete(req.params.id);

  if (!project) {
    return next(new AppError('No project found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});
