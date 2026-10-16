const Project = require('../models/Project');
const AppError = require('../utils/appError');

const catchAsync = fn => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

const initialProjects = [
  {
    title: 'CissanMart — Field to Family',
    description: 'A direct farmer-to-consumer agricultural marketplace and delivery platform eliminating intermediaries. Features dedicated Flutter mobile applications for buyers and farmers, alongside a responsive React web interface. Powered by an Express.js & MongoDB REST backend with JWT authentication, Cloudinary media handling, Socket.IO for real-time buyer-farmer communication, and Razorpay for online transactions.',
    tags: ['Flutter', 'MERN Stack', 'Ongoing', 'Featured'],
    technologies: ['Flutter', 'React.js', 'Node.js', 'Express.js', 'MongoDB', 'Socket.IO', 'Razorpay', 'JWT', 'Cloudinary'],
    githubLink: 'https://github.com/chandrashekar-404',
    liveLink: '',
    image: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&q=80&w=800',
    architecture: 'Dual Flutter mobile applications (Buyer & Farmer apps) with a React web management portal. Communicates via REST API and Socket.IO real-time channels with Express.js and MongoDB Atlas, integrated with Razorpay payment processing and Cloudinary media storage.',
    featured: true,
    features: [
      'Dedicated Flutter mobile app for buyers',
      'Dedicated Flutter mobile app for farmers',
      'React web portal for administration and catalog oversight',
      'Node.js & Express RESTful backend with MongoDB Atlas',
      'Secure JWT authentication and role-based access control',
      'Cloudinary media handling for farm crop listings',
      'Razorpay payment gateway integration for transactions',
      'Socket.IO real-time communication between farmers and buyers'
    ],
    architectureDiagram: `
+-----------------------------------+     +-----------------------------------+
|      Flutter Apps (Buyer/Farmer)  |     |     React Web Admin Portal        |
+-----------------+-----------------+     +-----------------+-----------------+
                  | (REST / WebSockets)                     | (REST API)
                  +--------------------+--------------------+
                                       |
                                       v
                        +------------------------------+
                        |     Node.js / Express API    |
                        |   (JWT, Socket.IO, Razorpay) |
                        +--------------+---------------+
                                       |
                         +-------------+-------------+
                         |                           |
                         v                           v
              +---------------------+     +---------------------+
              |  MongoDB Atlas DB   |     | Cloudinary Media    |
              +---------------------+     +---------------------+
    `,
    folderStructure: `
cissanmart/
├── client/          # React Web Interface
├── flutter_buyer/   # Flutter Buyer Mobile App
├── flutter_farmer/  # Flutter Farmer Mobile App
└── server/          # Node.js Express REST Backend & Socket.IO
    `,
    databaseSchema: `
MongoDB Collections:
1. users (id, name, email, phone, role [farmer, buyer, admin])
2. products (id, title, category, price, quantity, farmer_id, images)
3. orders (id, buyer_id, farmer_id, items, total, status, payment_id)
4. messages (id, sender_id, receiver_id, content, timestamp)
    `,
    challengesFaced: 'Coordinating synchronized real-time state between two separate Flutter mobile clients and a web management interface.',
    problemsSolved: 'Structured event-driven Socket.IO communication rooms paired with optimistic UI updates in Flutter for responsive buyer-farmer negotiations.',
    lessonsLearned: 'Cross-platform mobile state management, payment gateway lifecycle, and resilient backend routing.',
    timeline: 'Ongoing Development',
    futureImprovements: [
      'Implement agricultural demand analytics',
      'Add regional language localization for rural farmers'
    ]
  },
  {
    title: 'MONIC — My Own Neural Intelligence Comrade',
    description: 'A personal AI assistant project focused on automating everyday digital workflows through intelligent AI agents. Combines Python-driven automation logic and workflow routines with an intuitive Flutter Android mobile application serving as the primary user interface.',
    tags: ['Python', 'Flutter', 'AI Agents', 'Automation', 'Featured'],
    technologies: ['Python', 'Flutter', 'Android', 'AI Agents', 'Automation'],
    githubLink: 'https://github.com/chandrashekar-404',
    liveLink: '',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800',
    architecture: 'Python backend coordinating autonomous AI agent execution loops, connected via lightweight API endpoints to a cross-platform Flutter Android mobile application for real-time task triggers and status monitoring.',
    featured: true,
    features: [
      'Autonomous AI agent architecture for task execution',
      'Python-based automation engine managing background routines',
      'Cross-platform Flutter mobile UI for Android devices',
      'Task status monitoring and interactive chat controls',
      'Modular agent toolchains for extensible task expansion'
    ],
    architectureDiagram: `
+-----------------------------+
|   Flutter Android Client    |
|  (User Input & Monitoring)  |
+--------------+--------------+
               | (JSON API)
               v
+--------------+--------------+
|   Python Automation Core    |
|   (AI Agents & Toolchains)  |
+--------------+--------------+
               |
               v
+--------------+--------------+
|   OS / Services Execution   |
| (Task Automation Workflows) |
+-----------------------------+
    `,
    folderStructure: `
monic-ai/
├── flutter_app/    # Flutter Android UI
└── agent_core/     # Python AI Agent automation engine
    `,
    databaseSchema: `
Task State Store:
1. Tasks (id, prompt, agent_status, execution_steps, result, timestamp)
    `,
    challengesFaced: 'Handling asynchronous tool execution states without blocking the mobile UI polling cycle.',
    problemsSolved: 'Structured asynchronous job workers in Python paired with reactive state streams in Flutter.',
    lessonsLearned: 'Autonomous agent design, Python automation paradigms, and Flutter cross-platform architecture.',
    timeline: 'Completed Project',
    futureImprovements: [
      'Add voice-activated prompt triggers',
      'Incorporate offline local LLM quantization'
    ]
  },
  {
    title: 'Phantom SOS',
    description: 'A full-stack emergency distress application built with the MERN stack. Integrates digital media steganography techniques to embed critical SOS indicators and coordinate information covertly into media payloads, enabling discreet emergency signaling in high-risk environments.',
    tags: ['MERN Stack', 'Steganography', 'Security', 'Featured'],
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Steganography', 'JWT', 'REST API'],
    githubLink: 'https://github.com/chandrashekar-404',
    liveLink: '',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800',
    architecture: 'Full-stack MERN application incorporating image steganography algorithms. The React frontend encodes critical distress coordinates into image assets; Express server processes and validates distress events, persisting incident tracking records in MongoDB Atlas.',
    featured: true,
    features: [
      'Full-stack emergency SOS dispatch system using MERN',
      'Steganography encoding algorithms to securely hide distress data in media',
      'Real-time emergency incident logging and tracking',
      'Secure extraction and decoding pipeline for authorized responders',
      'JWT-authenticated responder dashboard with coordinate mapping',
      'Tamper-resistant distress event auditing'
    ],
    architectureDiagram: `
+-----------------------------+
|    React Client (Web/PWA)   |
|   (Stego Encoding Engine)   |
+--------------+--------------+
               | (Encrypted Image Payload)
               v
+--------------+--------------+
|     Express Web Server      |
|  (Stego Extraction & Auth)  |
+--------------+--------------+
               | (Mongoose)
               v
+--------------+--------------+
|      MongoDB Atlas DB       |
|    (Incident Audit Log)     |
+-----------------------------+
    `,
    folderStructure: `
phantom-sos/
├── client/
│   ├── src/components/
│   └── src/utils/stego.js
└── server/
    ├── controllers/sosController.js
    └── models/Incident.js
    `,
    databaseSchema: `
MongoDB Collections:
1. users (id, name, emergency_contacts, role)
2. incidents (id, user_id, coordinates, timestamp, payload_meta, status)
    `,
    challengesFaced: 'Maintaining lossless image payload integrity across HTTP transport layers without corrupting steganographic bitstreams.',
    problemsSolved: 'Implemented buffer-preserving stream handlers in Express and utilized canvas byte manipulation in the React client.',
    lessonsLearned: 'Cryptographic principles, digital steganography byte manipulation, and secure emergency alert workflows.',
    timeline: 'Completed Project',
    futureImprovements: [
      'Add offline SMS distress dispatch fallback',
      'Implement audio steganography modules'
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
