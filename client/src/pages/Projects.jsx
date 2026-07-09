import React, { useState, useEffect } from 'react';
import { projectService } from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Github, ExternalLink, Code2, AlertCircle, X, 
  Layers, Database, FolderGit, Cpu, BookOpen, Sparkles, Search
} from 'lucide-react';

// Stat Number Counter Component
const StatNumber = ({ value }) => {
  const [count, setCount] = useState(0);
  const target = parseInt(value);
  const isPercent = value.includes('%');
  const isPlus = value.includes('+');

  useEffect(() => {
    let start = 0;
    const end = target;
    if (start === end) return;

    let totalDuration = 1000;
    let incrementTime = Math.abs(Math.floor(totalDuration / end));
    if (incrementTime < 10) incrementTime = 10;

    const timer = setInterval(() => {
      start += Math.ceil(end / 80);
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [target]);

  return (
    <span>
      {count}
      {isPercent ? '%' : isPlus ? '+' : ''}
    </span>
  );
};

// Stat Card Component
const StatCard = ({ label, value }) => {
  const [active, setActive] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onViewportEnter={() => setActive(true)}
      className="glass-card rounded-xl p-4 border border-gray-850 text-center flex flex-col justify-center select-none"
    >
      <span className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
        {active ? <StatNumber value={value} /> : '0'}
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
    
    setRotateX(-y * 12);
    setRotateY(x * 12);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const getStatusColor = (project) => {
    const isFeatured = project.featured || project.tags.some(t => t.toLowerCase() === 'featured');
    if (isFeatured) return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/25';
    
    const tagString = project.tags.join(' ').toLowerCase();
    if (tagString.includes('research')) return 'bg-violet-500/10 text-violet-400 border border-violet-500/25';
    if (tagString.includes('live')) return 'bg-pink-500/10 text-pink-400 border border-pink-500/25';
    return 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/25';
  };

  const getStatusLabel = (project) => {
    const isFeatured = project.featured || project.tags.some(t => t.toLowerCase() === 'featured');
    if (isFeatured) return 'FEATURED';
    
    // Find live/research tag or return completed
    const match = project.tags.find(t => t.toLowerCase() === 'live' || t.toLowerCase() === 'research project' || t.toLowerCase() === 'learning');
    return match ? match.toUpperCase() : 'COMPLETED';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -5 }}
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
        />
        {/* Status Badge */}
        <span className={`absolute top-3 right-3 px-2 py-0.5 rounded text-[8px] font-mono font-bold uppercase tracking-wider ${getStatusColor(project)}`}>
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
            Category: {project.tags.find(t => t.toLowerCase() !== 'featured' && t.toLowerCase() !== 'completed' && t.toLowerCase() !== 'live' && t.toLowerCase() !== 'learning' && t.toLowerCase() !== 'research project') || 'Systems'}
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
      
      // Sort projects to match custom priority
      const priorityOrder = [
        'cissanmart',
        'restaurant pos & billing system',
        'phantom net',
        'devos workstation',
        'issue tracker',
        'sales analytics dashboard',
        'authentication system',
        'real-time chat system',
        'aws cloud demonstrations'
      ];

      const sortedData = [...data].sort((a, b) => {
        const indexA = priorityOrder.indexOf(a.title.toLowerCase());
        const indexB = priorityOrder.indexOf(b.title.toLowerCase());
        
        if (indexA === -1 && indexB === -1) return 0;
        if (indexA === -1) return 1;
        if (indexB === -1) return -1;
        return indexA - indexB;
      });

      setProjects(sortedData);
    } catch (err) {
      console.error(err);
      setError('Could not retrieve projects from database. Please ensure MongoDB is running or check console logs.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const filterCategories = [
    'All', 'Featured', 'Full Stack', 'Android', 'AI', 'Cloud', 'Backend', 'Analytics', 'Portfolio'
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
    
    // Check tags, technologies or title mapping
    const matchesFilter = project.tags.some(t => t.toLowerCase().includes(filterVal)) ||
                          project.technologies.some(tech => tech.toLowerCase().includes(filterVal)) ||
                          project.title.toLowerCase().includes(filterVal) ||
                          (filterVal === 'full stack' && project.tags.some(t => t.toLowerCase() === 'mern stack'));

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
            My{' '}
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Projects Showcase
            </span>
          </h1>
          <p className="mt-4 text-base text-gray-400 max-w-2xl font-light leading-relaxed">
            Browse through my systems engineering projects compiled dynamically. Click any register block to access the detailed model specifications, databases configurations, and folder paths.
          </p>
        </div>

        {/* Statistics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          <StatCard label="Completed Projects" value="15+" />
          <StatCard label="Core Technologies" value="10+" />
          <StatCard label="Major Applications" value="3" />
          <StatCard label="Hours of Coding" value="1000+" />
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

          {/* Filter dropdown for smaller screens, buttons for large */}
          <div className="flex flex-wrap gap-1.5 justify-start md:justify-end">
            {filterCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-[10px] font-mono tracking-wide cursor-pointer transition-all duration-300 ${
                  activeFilter === cat
                    ? 'bg-violet-600 text-white shadow-md shadow-violet-500/20'
                    : 'bg-gray-900/80 text-gray-450 hover:bg-gray-800 hover:text-white border border-gray-850'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Error Alert fallback */}
        {error && (
          <div className="mb-8 p-4 rounded-xl border border-red-500/20 bg-red-600/5 text-red-400 flex items-center space-x-3 text-sm">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Loading / Grid rendering */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(n => (
              <div key={n} className="glass-card rounded-2xl p-6 border border-gray-800 animate-pulse h-96 flex flex-col justify-between">
                <div className="w-full h-44 bg-gray-900 rounded-xl mb-4"></div>
                <div className="h-6 bg-gray-950 w-3/4 rounded mb-2"></div>
                <div className="h-4 bg-gray-950 w-1/2 rounded"></div>
              </div>
            ))}
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-20 bg-gray-950/20 border border-gray-900 rounded-2xl">
            <Code2 className="w-12 h-12 text-gray-650 mx-auto mb-4" />
            <p className="text-gray-500 font-mono text-xs">No active records match the query parameter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map(project => (
              <TiltCard 
                key={project._id} 
                project={project} 
                onClick={() => setSelectedProject(project)} 
              />
            ))}
          </div>
        )}

      </div>

      {/* DETAILED PROJECT MODAL SYSTEM */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="w-full max-w-3xl bg-gray-950 border border-gray-850 rounded-2xl shadow-2xl p-6 relative my-8"
            >
              {/* Top gradient border */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 to-cyan-500" />
              
              {/* Title bar */}
              <div className="flex justify-between items-start mb-6 gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-white font-display">{selectedProject.title}</h2>
                  <p className="text-xs text-violet-400 font-mono mt-1">Arch Layer: {selectedProject.architecture}</p>
                </div>
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Container */}
              <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2 text-sm font-light text-gray-300 no-scrollbar">
                
                {/* Description */}
                <div>
                  <h4 className="text-xs font-mono font-semibold text-gray-500 uppercase tracking-wider mb-2">Overview</h4>
                  <p className="leading-relaxed text-gray-300 font-light">{selectedProject.description}</p>
                </div>

                {/* Grid details (features + technologies) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-gray-900 pt-6">
                  {/* Features */}
                  {selectedProject.features && selectedProject.features.length > 0 && (
                    <div>
                      <h4 className="text-xs font-mono font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center">
                        <Sparkles className="w-4 h-4 mr-1.5 text-violet-400" /> Core Capabilities
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

                  {/* Tech stack */}
                  {selectedProject.technologies && selectedProject.technologies.length > 0 && (
                    <div>
                      <h4 className="text-xs font-mono font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center">
                        <Cpu className="w-4 h-4 mr-1.5 text-cyan-400" /> Technology Matrix
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

                {/* Diagrams & Structures codeblocks (Architecture, Folder Structure, Database Schema) */}
                {(selectedProject.architectureDiagram || selectedProject.folderStructure || selectedProject.databaseSchema) && (
                  <div className="border-t border-gray-900 pt-6 space-y-6">
                    
                    {/* Architecture diagram */}
                    {selectedProject.architectureDiagram && (
                      <div>
                        <h4 className="text-xs font-mono font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center">
                          <Layers className="w-4 h-4 mr-1.5 text-violet-400" /> Pipeline Flow Diagram
                        </h4>
                        <pre className="p-4 rounded-xl bg-gray-950 border border-gray-850 font-mono text-[10px] text-gray-400 overflow-x-auto whitespace-pre leading-relaxed">
                          {selectedProject.architectureDiagram.trim()}
                        </pre>
                      </div>
                    )}

                    {/* Folder Structure */}
                    {selectedProject.folderStructure && (
                      <div>
                        <h4 className="text-xs font-mono font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center">
                          <FolderGit className="w-4 h-4 mr-1.5 text-cyan-400" /> Folder Layout Registry
                        </h4>
                        <pre className="p-4 rounded-xl bg-gray-950 border border-gray-850 font-mono text-[10px] text-gray-400 overflow-x-auto whitespace-pre leading-relaxed">
                          {selectedProject.folderStructure.trim()}
                        </pre>
                      </div>
                    )}

                    {/* Database Schema */}
                    {selectedProject.databaseSchema && (
                      <div>
                        <h4 className="text-xs font-mono font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center">
                          <Database className="w-4 h-4 mr-1.5 text-fuchsia-400" /> Database Schema Tables Mapping
                        </h4>
                        <pre className="p-4 rounded-xl bg-gray-950 border border-gray-850 font-mono text-[10px] text-gray-400 overflow-x-auto whitespace-pre leading-relaxed">
                          {selectedProject.databaseSchema.trim()}
                        </pre>
                      </div>
                    )}

                  </div>
                )}

                {/* Challenges & Solutions */}
                {(selectedProject.challengesFaced || selectedProject.problemsSolved || selectedProject.lessonsLearned) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-gray-900 pt-6">
                    {/* Challenges */}
                    {selectedProject.challengesFaced && (
                      <div>
                        <h4 className="text-xs font-mono font-semibold text-gray-500 uppercase tracking-wider mb-2 flex items-center">
                          Challenges Faced
                        </h4>
                        <p className="text-xs text-gray-450 leading-relaxed font-light">{selectedProject.challengesFaced}</p>
                      </div>
                    )}

                    {/* Problems solved */}
                    {selectedProject.problemsSolved && (
                      <div>
                        <h4 className="text-xs font-mono font-semibold text-gray-500 uppercase tracking-wider mb-2 flex items-center">
                          Solutions Applied
                        </h4>
                        <p className="text-xs text-emerald-400 leading-relaxed font-light">{selectedProject.problemsSolved}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Future improvements */}
                {selectedProject.futureImprovements && selectedProject.futureImprovements.length > 0 && (
                  <div className="border-t border-gray-900 pt-6">
                    <h4 className="text-xs font-mono font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center">
                      <BookOpen className="w-4 h-4 mr-1.5 text-violet-400" /> Future Improvements Roadmap
                    </h4>
                    <ul className="space-y-1.5 text-xs font-mono text-gray-400">
                      {selectedProject.futureImprovements.map((imp, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-violet-500 mr-2">&raquo;</span>
                          <span>{imp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              </div>

              {/* Actions Footer */}
              <div className="flex items-center space-x-4 border-t border-gray-900 pt-4 mt-6">
                {selectedProject.githubLink && (
                  <a
                    href={selectedProject.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-xs font-mono text-gray-400 hover:text-white transition-colors"
                  >
                    <Github className="w-4 h-4 mr-1.5" /> Source Code
                  </a>
                )}
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
