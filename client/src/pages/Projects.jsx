import React, { useState, useEffect } from 'react';
import { projectService } from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Github, ExternalLink, Code2, AlertCircle, X, 
  Layers, Database, FolderGit, Cpu, BookOpen, Sparkles, Search, Clock
} from 'lucide-react';

// Verified Fallback Projects Data directly from Resume Source of Truth (Exclusively 3 Projects)
const fallbackProjects = [
  {
    _id: 'proj-cissanmart',
    title: 'CissanMart — Field to Family',
    description: 'A direct farmer-to-consumer agricultural marketplace and delivery platform eliminating intermediaries. Features dedicated Flutter mobile applications for buyers and farmers alongside a responsive React web interface. Powered by an Express.js & MongoDB REST backend with JWT authentication, Cloudinary media handling, Socket.IO for real-time buyer-farmer communication, and Razorpay for online transactions.',
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
    _id: 'proj-monic-ai',
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
    _id: 'proj-phantom-sos',
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

// Stat Card Component
const StatCard = ({ label, value }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-card rounded-xl p-4 border border-gray-850 text-center flex flex-col justify-center select-none"
    >
      <span className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
        {value}
      </span>
      <span className="text-[9px] text-gray-500 font-mono mt-1 block uppercase tracking-wider">{label}</span>
    </motion.div>
  );
};

// 3D Tilt Card Component
const TiltCard = ({ project, onClick }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    
    setRotateX(-y * 10);
    setRotateY(x * 10);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const getStatusColor = (project) => {
    const tagString = project.tags.join(' ').toLowerCase();
    if (tagString.includes('ongoing')) return 'bg-amber-500/10 text-amber-400 border border-amber-500/25';
    return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/25';
  };

  const getStatusLabel = (project) => {
    const tagString = project.tags.join(' ').toLowerCase();
    if (tagString.includes('ongoing')) return 'ONGOING';
    return 'FEATURED';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.35 }}
      whileHover={{ y: -4 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
      }}
      onClick={onClick}
      className="glass-card rounded-2xl overflow-hidden border border-gray-850 flex flex-col h-full cursor-pointer relative transition-all duration-200 hover:shadow-violet-500/15 hover:shadow-xl group"
    >
      {/* Thumbnail */}
      <div className="relative h-44 overflow-hidden bg-gray-900 shrink-0">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
          loading="lazy"
        />
        {/* Status Badge */}
        <span className={`absolute top-3 right-3 px-2 py-0.5 rounded text-[8px] font-mono font-bold uppercase tracking-wider backdrop-blur-md ${getStatusColor(project)}`}>
          {getStatusLabel(project)}
        </span>
      </div>

      {/* Details Area */}
      <div className="p-5 flex flex-col justify-between flex-grow">
        <div>
          <h3 className="text-base font-bold text-white font-display mb-1 flex items-center justify-between">
            {project.title}
          </h3>
          <p className="text-[10px] text-violet-400 font-mono mb-3 uppercase tracking-wider">
            {project.timeline || 'Project'}
          </p>
          <p className="text-xs text-gray-400 leading-relaxed font-light mb-4 line-clamp-3">
            {project.description}
          </p>
        </div>

        <div>
          {/* Tech stack badges */}
          <div className="flex flex-wrap gap-1 mb-4 select-none">
            {project.technologies.slice(0, 4).map(tech => (
              <span key={tech} className="px-1.5 py-0.5 rounded bg-gray-950 border border-gray-900 text-[8px] font-mono text-cyan-400">
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="px-1.5 py-0.5 rounded bg-gray-950 border border-gray-900 text-[8px] font-mono text-gray-500">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>

          {/* Action indicator link */}
          <div className="flex items-center justify-between border-t border-gray-850/40 pt-3 text-[10px] font-mono text-gray-500 select-none group-hover:text-violet-400 transition-colors">
            <span>Explore Specifications</span>
            <Code2 className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await projectService.getAll();
      if (data && Array.isArray(data) && data.length > 0) {
        setProjects(data);
      } else {
        setProjects(fallbackProjects);
      }
    } catch (err) {
      // Graceful offline fallback to verified resume projects
      setProjects(fallbackProjects);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const filterCategories = [
    'All', 'Featured', 'Ongoing', 'MERN Stack', 'Flutter', 'Python', 'AI Agents'
  ];

  // Filtering Logic
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(search.toLowerCase()) ||
                          project.description.toLowerCase().includes(search.toLowerCase()) ||
                          project.technologies.some(tech => tech.toLowerCase().includes(search.toLowerCase()));

    if (activeFilter === 'All') return matchesSearch;
    if (activeFilter === 'Featured') {
      return matchesSearch && (project.featured || project.tags.some(t => t.toLowerCase() === 'featured'));
    }

    const filterVal = activeFilter.toLowerCase();
    const matchesFilter = project.tags.some(t => t.toLowerCase().includes(filterVal)) ||
                          project.technologies.some(tech => tech.toLowerCase().includes(filterVal)) ||
                          project.title.toLowerCase().includes(filterVal);

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Background glow */}
      <div className="glow-spot-2 bottom-20 left-10 opacity-70"></div>

      <div className="relative z-10">
        
        {/* Header */}
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-4xl font-extrabold font-display text-white tracking-tight sm:text-5xl">
            Technical{' '}
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Projects Showcase
            </span>
          </h1>
          <p className="mt-4 text-base text-gray-400 max-w-2xl font-light leading-relaxed">
            Verified software projects matching my active development work. Click any card to inspect architecture flows, database schemas, and technical implementation details.
          </p>
        </div>

        {/* Statistics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          <StatCard label="Featured Projects" value="3" />
          <StatCard label="Mobile Framework" value="Flutter SDK" />
          <StatCard label="Web Stack" value="MERN" />
          <StatCard label="Primary Status" value="Active / Ongoing" />
        </div>

        {/* Search & Filter Dock */}
        <div className="flex flex-col md:flex-row justify-between items-stretch gap-4 mb-10">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search projects by name or technology stack..."
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-gray-950 border border-gray-850 rounded-xl text-white focus:outline-none focus:border-violet-500 placeholder-gray-600 font-mono transition-colors"
            />
          </div>

          {/* Filter buttons */}
          <div className="flex flex-wrap gap-1.5 justify-start md:justify-end">
            {filterCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-[10px] font-mono tracking-wide cursor-pointer transition-all duration-300 ${
                  activeFilter === cat
                    ? 'bg-violet-600 text-white shadow-md shadow-violet-500/20'
                    : 'bg-gray-900/80 text-gray-400 hover:bg-gray-800 hover:text-white border border-gray-850'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(n => (
              <div key={n} className="h-96 rounded-2xl bg-gray-900/40 border border-gray-850 animate-pulse" />
            ))}
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-20 border border-gray-850 rounded-2xl bg-gray-950/40 font-mono text-sm text-gray-500">
            No projects found matching "{search}" or category "{activeFilter}".
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {filteredProjects.map(project => (
              <TiltCard
                key={project._id || project.title}
                project={project}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </div>
        )}

      </div>

      {/* Project Spec Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', duration: 0.35 }}
              className="glass-card rounded-2xl border border-gray-800 p-6 max-w-3xl w-full max-h-[85vh] overflow-y-auto z-10 shadow-2xl relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800/60 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="border-b border-gray-900 pb-4 mb-6">
                <span className="text-[10px] font-mono text-violet-400 uppercase tracking-widest block mb-1">
                  PROJECT SPECIFICATION // {selectedProject.timeline || 'VERIFIED'}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                  {selectedProject.title}
                </h3>
              </div>

              {/* Modal Content */}
              <div className="space-y-6 text-sm text-gray-300">
                <div>
                  <h4 className="text-xs font-mono font-semibold text-gray-500 uppercase tracking-wider mb-2">Overview</h4>
                  <p className="leading-relaxed text-gray-300 font-light">{selectedProject.description}</p>
                </div>

                {/* Features & Tech */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-gray-900 pt-6">
                  {selectedProject.features && selectedProject.features.length > 0 && (
                    <div>
                      <h4 className="text-xs font-mono font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center">
                        <Sparkles className="w-4 h-4 mr-1.5 text-violet-400" /> Key Features
                      </h4>
                      <ul className="space-y-2 text-xs font-mono text-gray-400">
                        {selectedProject.features.map((feat, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-violet-500 mr-2">&raquo;</span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selectedProject.technologies && selectedProject.technologies.length > 0 && (
                    <div>
                      <h4 className="text-xs font-mono font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center">
                        <Cpu className="w-4 h-4 mr-1.5 text-cyan-400" /> Technology Stack
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedProject.technologies.map(tech => (
                          <span 
                            key={tech} 
                            className="px-2.5 py-1 bg-gray-900 border border-gray-850 text-cyan-400 rounded font-mono text-[10px]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Diagrams & Schemas */}
                {(selectedProject.architectureDiagram || selectedProject.folderStructure || selectedProject.databaseSchema) && (
                  <div className="border-t border-gray-900 pt-6 space-y-6">
                    {selectedProject.architectureDiagram && (
                      <div>
                        <h4 className="text-xs font-mono font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center">
                          <Layers className="w-4 h-4 mr-1.5 text-violet-400" /> System Architecture
                        </h4>
                        <pre className="p-4 rounded-xl bg-gray-950 border border-gray-850 font-mono text-[10px] text-gray-400 overflow-x-auto whitespace-pre leading-relaxed">
                          {selectedProject.architectureDiagram.trim()}
                        </pre>
                      </div>
                    )}

                    {selectedProject.folderStructure && (
                      <div>
                        <h4 className="text-xs font-mono font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center">
                          <FolderGit className="w-4 h-4 mr-1.5 text-cyan-400" /> Project Structure
                        </h4>
                        <pre className="p-4 rounded-xl bg-gray-950 border border-gray-850 font-mono text-[10px] text-gray-400 overflow-x-auto whitespace-pre leading-relaxed">
                          {selectedProject.folderStructure.trim()}
                        </pre>
                      </div>
                    )}

                    {selectedProject.databaseSchema && (
                      <div>
                        <h4 className="text-xs font-mono font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center">
                          <Database className="w-4 h-4 mr-1.5 text-fuchsia-400" /> Database & State Models
                        </h4>
                        <pre className="p-4 rounded-xl bg-gray-950 border border-gray-850 font-mono text-[10px] text-gray-400 overflow-x-auto whitespace-pre leading-relaxed">
                          {selectedProject.databaseSchema.trim()}
                        </pre>
                      </div>
                    )}
                  </div>
                )}

                {/* Challenges & Solutions */}
                {(selectedProject.challengesFaced || selectedProject.problemsSolved) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-gray-900 pt-6">
                    {selectedProject.challengesFaced && (
                      <div>
                        <h4 className="text-xs font-mono font-semibold text-gray-500 uppercase tracking-wider mb-2">
                          Engineering Challenge
                        </h4>
                        <p className="text-xs text-gray-400 leading-relaxed font-light">{selectedProject.challengesFaced}</p>
                      </div>
                    )}

                    {selectedProject.problemsSolved && (
                      <div>
                        <h4 className="text-xs font-mono font-semibold text-gray-500 uppercase tracking-wider mb-2">
                          Solution Implemented
                        </h4>
                        <p className="text-xs text-emerald-400 leading-relaxed font-light">{selectedProject.problemsSolved}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Actions Footer */}
              <div className="flex items-center space-x-4 border-t border-gray-900 pt-4 mt-6">
                <a
                  href="https://github.com/chandrashekar-404"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-xs font-mono text-gray-400 hover:text-white transition-colors"
                >
                  <Github className="w-4 h-4 mr-1.5" /> View GitHub Profile
                </a>
                {selectedProject.liveLink && (
                  <a
                    href={selectedProject.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-xs font-mono text-gray-400 hover:text-violet-400 transition-colors ml-auto"
                  >
                    <ExternalLink className="w-4 h-4 mr-1.5" /> Live Demo
                  </a>
                )}
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Projects;
