import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, Download, Mail, Github, Linkedin, Code, Server, Database, 
  Settings, Star, GitCommit, GitPullRequest, Laptop, Terminal, ChevronDown, Smartphone, BrainCircuit
} from 'lucide-react';
import { visitorService } from '../services/api';

// Typewriter Component
const Typewriter = ({ words, delay = 100 }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const activeWord = words[currentWordIndex];
    
    if (isDeleting) {
      timer = setTimeout(() => {
        setCurrentText(activeWord.substring(0, currentText.length - 1));
      }, delay / 2);
    } else {
      timer = setTimeout(() => {
        setCurrentText(activeWord.substring(0, currentText.length + 1));
      }, delay);
    }

    if (!isDeleting && currentText === activeWord) {
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, words, delay]);

  return (
    <span className="relative">
      <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent text-glow font-bold">{currentText}</span>
      <span className="absolute -right-1.5 top-1.5 w-[2px] h-[80%] bg-cyan-400 animate-pulse"></span>
    </span>
  );
};

// Magnetic Button Component
const MagneticButton = ({ children, className, onClick, variant = 'primary' }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef(null);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.25, y: y * 0.25 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const shadowColor = variant === 'primary' ? 'rgba(139,92,246,0.35)' :
                      variant === 'cyan' ? 'rgba(6,182,212,0.25)' : 'rgba(255,255,255,0.05)';

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`${className} cursor-pointer relative overflow-hidden transition-all duration-300`}
      style={{
        boxShadow: `0 0 15px ${shadowColor}`
      }}
    >
      {children}
    </motion.button>
  );
};

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
      <span className="text-[10px] text-gray-500 font-mono mt-1 block uppercase tracking-wider">{label}</span>
    </motion.div>
  );
};

// Terminal Status Monitor
const TerminalStatusPanel = () => {
  const lines = [
    'SYSTEM STATUS  : ACTIVE',
    'CURRENT ROLE   : MCA Student (BMSIT&M)',
    'SPECIALIZATION : Software Development & AI/ML',
    'PRIMARY STACKS : MERN Stack | Flutter | Java',
    'LOCATION       : Bengaluru, Karnataka',
    'AVAILABILITY   : Open for Opportunities'
  ];

  const [visibleLines, setVisibleLines] = useState([]);
  const [currentLineIdx, setCurrentLineIdx] = useState(0);
  const [typedText, setTypedText] = useState('');

  useEffect(() => {
    if (currentLineIdx < lines.length) {
      const fullText = lines[currentLineIdx];
      let charIdx = 0;
      setTypedText('');

      const interval = setInterval(() => {
        setTypedText(prev => prev + fullText[charIdx]);
        charIdx++;
        if (charIdx === fullText.length) {
          clearInterval(interval);
          setVisibleLines(prev => [...prev, fullText]);
          setTypedText('');
          setCurrentLineIdx(prev => prev + 1);
        }
      }, 20);

      return () => clearInterval(interval);
    }
  }, [currentLineIdx]);

  return (
    <div className="glass-card rounded-xl p-5 border border-gray-800/80 font-mono text-[11px] leading-relaxed flex flex-col justify-between h-full min-h-[190px]">
      <div className="flex items-center justify-between border-b border-gray-900 pb-2 mb-3">
        <span className="text-[10px] text-gray-400 uppercase tracking-wider flex items-center">
          <Terminal className="w-3.5 h-3.5 mr-1.5 text-violet-400" /> status_monitor.sh
        </span>
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
      </div>

      <div className="flex-1 space-y-1.5 text-left text-gray-300">
        {visibleLines.map((line, idx) => {
          const parts = line.split(':');
          return (
            <div key={idx}>
              <span className="text-gray-500">{parts[0]}:</span>
              <span className={parts[1].trim() === 'ACTIVE' || parts[1].trim() === 'Open for Opportunities' ? 'text-emerald-400 font-bold' : 'text-white'}>
                {parts[1]}
              </span>
            </div>
          );
        })}
        {currentLineIdx < lines.length && (
          <div>
            <span className="text-gray-500">{lines[currentLineIdx].split(':')[0]}:</span>
            <span className="text-white">{typedText}</span>
            <span className="inline-block w-1.5 h-3 ml-0.5 bg-cyan-400 animate-pulse"></span>
          </div>
        )}
      </div>

      <div className="text-[9px] text-gray-600 border-t border-gray-900/60 pt-2 mt-2">
        DevOS Shell check: verified profile telemetry
      </div>
    </div>
  );
};

const Home = () => {
  const navigate = useNavigate();
  const [visitorCount, setVisitorCount] = useState(null);

  useEffect(() => {
    const recordPageView = async () => {
      try {
        const stats = await visitorService.track('/');
        if (stats && stats.totalHits) {
          setVisitorCount(stats.totalHits);
        }
      } catch (err) {
        // Silently handle if backend is not active
      }
    };
    recordPageView();
  }, []);

  const typewriterWords = [
    'MCA Student @ BMSIT&M',
    'Software Developer',
    'MERN Stack & Flutter Builder',
    'Targeting Data Science & AI/ML',
    'Problem Solver'
  ];

  const profileTelemetry = [
    { label: 'GitHub Handle', value: '@chandrashekar-404', icon: <Github className="w-4 h-4 text-violet-400" /> },
    { label: 'Academic Standing', value: 'MCA (2025-27)', icon: <Laptop className="w-4 h-4 text-cyan-400" /> },
    { label: 'Undergrad CGPA', value: '7.89 BCA', icon: <Star className="w-4 h-4 text-amber-400" /> },
    { label: 'Base Location', value: 'Bengaluru, KA', icon: <Code className="w-4 h-4 text-emerald-400" /> }
  ];

  const techCards = [
    { name: 'MERN Stack', category: 'MongoDB, Express, React, Node', icon: <Server className="w-4 h-4 text-violet-400" /> },
    { name: 'Flutter SDK & Dio', category: 'Cross-Platform Mobile Apps', icon: <Smartphone className="w-4 h-4 text-cyan-400" /> },
    { name: 'Java & OOP', category: 'Core & Enterprise Architecture', icon: <Code className="w-4 h-4 text-emerald-400" /> },
    { name: 'Python & AI Agents', category: 'Automation & Data Science', icon: <BrainCircuit className="w-4 h-4 text-amber-400" /> }
  ];

  const quickStats = [
    { label: 'Featured Projects', value: '3' },
    { label: 'Certifications', value: '4' },
    { label: 'Degree Track', value: 'MCA (VTU)' },
    { label: 'Undergrad CGPA', value: '7.89' },
    { label: 'Primary Stacks', value: 'MERN & Flutter' }
  ];

  const staticParticles = [
    { size: 6, left: '10%', top: '20%', delay: '0s', duration: '22s' },
    { size: 10, left: '80%', top: '15%', delay: '2s', duration: '28s' },
    { size: 4, left: '45%', top: '75%', delay: '4s', duration: '18s' },
    { size: 8, left: '20%', top: '60%', delay: '1s', duration: '25s' },
    { size: 5, left: '85%', top: '80%', delay: '3s', duration: '20s' },
    { size: 7, left: '60%', top: '30%', delay: '5s', duration: '30s' }
  ];

  return (
    <div className="relative min-h-[calc(100vh-80px)] flex flex-col items-center justify-between py-12 px-4 overflow-hidden mesh-gradient-bg tech-grid rounded-2xl border border-gray-900 shadow-2xl">
      
      {/* Background Floating Particles */}
      {staticParticles.map((p, idx) => (
        <div
          key={idx}
          className="particle"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: p.left,
            top: p.top,
            animationDelay: p.delay,
            animationDuration: p.duration
          }}
        />
      ))}

      {/* Glow overlays */}
      <div className="absolute top-10 left-10 glow-spot-1 opacity-40"></div>
      <div className="absolute bottom-10 right-10 glow-spot-2 opacity-30"></div>

      <div className="max-w-4xl mx-auto w-full relative z-10 flex-1 flex flex-col justify-center">
        
        {/* Brand/Status Indicator */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-2 mb-6"
        >
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full border border-violet-500/20 bg-violet-950/20 text-violet-400 text-xs font-mono tracking-wider uppercase select-none">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
            </span>
            <span>STATUS: ACTIVE MCA STUDENT</span>
          </div>

          {visitorCount !== null && (
            <div className="inline-flex items-center px-3 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-950/20 text-cyan-400 text-xs font-mono tracking-wider select-none">
              <span>VISITORS: {visitorCount}</span>
            </div>
          )}
        </motion.div>

        {/* Main Hero Header */}
        <div className="text-center mb-8">
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl font-extrabold font-display tracking-tight text-white mb-4 select-none"
          >
            Hi, I'm <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent text-glow">Chandrashekhar H R</span>
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-2xl font-mono text-gray-400 h-8 flex items-center justify-center select-none"
          >
            <span className="text-gray-500 mr-2 shrink-0">&gt;_</span>
            <Typewriter words={typewriterWords} />
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xs sm:text-sm text-gray-300 max-w-2xl mx-auto mt-6 leading-relaxed font-light"
          >
            MCA student at BMS Institute of Technology and Management, Bengaluru, with a strong foundation in programming, data structures, DBMS, and OOP. Developing real-world applications across Flutter, MERN stack, Java, and Python, while actively exploring opportunities in Data Science, AI/ML, and Software Development.
          </motion.p>
        </div>

        {/* Action Button Row */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-10"
        >
          <MagneticButton 
            onClick={() => navigate('/projects')}
            className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 border border-transparent text-xs font-mono font-semibold rounded-lg text-white bg-violet-600 hover:bg-violet-750"
            variant="primary"
          >
            View Projects
            <ArrowRight className="w-3.5 h-3.5 ml-2" />
          </MagneticButton>
          
          <MagneticButton 
            onClick={() => navigate('/resume')}
            className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 border border-gray-800 text-xs font-mono font-semibold rounded-lg text-gray-300 hover:text-white bg-gray-950/60 hover:bg-gray-900/60"
            variant="default"
          >
            Resume
          </MagneticButton>

          <MagneticButton 
            onClick={() => navigate('/contact')}
            className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 border border-cyan-800/40 text-xs font-mono font-semibold rounded-lg text-cyan-400 hover:text-white bg-cyan-950/10 hover:bg-cyan-950/30"
            variant="cyan"
          >
            Contact
          </MagneticButton>

          <a 
            href="https://github.com/chandrashekar-404" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2.5 rounded-lg border border-gray-800 text-gray-400 hover:text-white bg-gray-950/60 hover:bg-gray-900 transition-colors"
            aria-label="GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </a>

          <a 
            href="https://www.linkedin.com/in/chandra-shekhar-131064288/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2.5 rounded-lg border border-gray-800 text-gray-400 hover:text-cyan-400 bg-gray-950/60 hover:bg-gray-900 transition-colors"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4" />
          </a>
        </motion.div>

        {/* Quick Stats Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5 mb-10">
          {quickStats.map((stat, idx) => (
            <StatCard key={idx} label={stat.label} value={stat.value} />
          ))}
        </div>

        {/* Dashboard Grid (Telemetry + Status + Tech) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Telemetry card */}
          <motion.div 
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="glass-card rounded-xl p-5 border border-gray-800/80 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-4 border-b border-gray-900 pb-2">
              <span className="text-[10px] font-mono font-semibold text-gray-400 uppercase tracking-wider flex items-center">
                <Github className="w-3.5 h-3.5 mr-1.5" /> developer_profile.log
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>
            
            <div className="grid grid-cols-2 gap-3.5 my-2 select-none">
              {profileTelemetry.map((stat, index) => (
                <div key={index} className="bg-gray-950/50 p-2.5 rounded-lg border border-gray-900/50 font-mono">
                  <div className="flex items-center space-x-1.5 text-[9px] text-gray-500 mb-0.5">
                    {stat.icon}
                    <span>{stat.label.split(' ')[0]}</span>
                  </div>
                  <span className="text-xs font-bold text-white tracking-tight">{stat.value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Terminal Status Panel */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <TerminalStatusPanel />
          </motion.div>

          {/* Technology Cards */}
          <motion.div 
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="glass-card rounded-xl p-5 border border-gray-800/80 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-4 border-b border-gray-900 pb-2">
              <span className="text-[10px] font-mono font-semibold text-gray-400 uppercase tracking-wider flex items-center">
                <Code className="w-3.5 h-3.5 mr-1.5 text-cyan-400" /> core_ecosystem.json
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 my-1 select-none">
              {techCards.map((tech, index) => (
                <div key={index} className="flex items-center space-x-2 bg-gray-950/40 p-2 rounded-lg border border-gray-900/60 font-mono text-[9px]">
                  <span className="p-1 rounded bg-gray-900 border border-gray-850 shrink-0">
                    {tech.icon}
                  </span>
                  <div className="truncate">
                    <span className="block text-gray-300 font-semibold leading-tight truncate">{tech.name}</span>
                    <span className="text-gray-500 block text-[7px] leading-tight truncate">{tech.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>

      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1 }}
        className="relative z-10 flex flex-col items-center mt-8 text-gray-600 font-mono text-[9px] uppercase tracking-widest select-none cursor-pointer"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <span className="mb-1.5">Interactive Console Workspace</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </motion.div>
      </motion.div>

    </div>
  );
};

export default Home;
