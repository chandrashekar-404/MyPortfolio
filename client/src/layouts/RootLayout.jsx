import React, { useState, useEffect, useRef } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, User, Cpu, Folder, GitBranch, Bug, Github,
  FileText, Mail, Terminal, Search, X, RefreshCw, 
  Check, ChevronRight, Activity, Database, AlertCircle, Settings, Menu
} from 'lucide-react';
import LoadingScreen from '../components/LoadingScreen';
import Footer from '../components/Footer';
import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const RootLayout = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [terminalOpen, setTerminalOpen] = useState(true);
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const { theme, changeTheme } = useTheme();

  const [terminalHistory, setTerminalHistory] = useState([
    { text: 'DevOS v1.0.4 Shell Initialized.', type: 'info' },
    { text: "Type 'help' to view all available commands.", type: 'success' }
  ]);
  const [terminalInput, setTerminalInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('Home.jsx');

  const location = useLocation();
  const navigate = useNavigate();
  const terminalEndRef = useRef(null);
  const terminalInputRef = useRef(null);

  // Map routes to tab names
  const routeToTabMap = {
    '/': 'Home.jsx',
    '/about': 'About.jsx',
    '/skills': 'Skills.jsx',
    '/projects': 'Projects.jsx',
    '/architecture': 'Architecture.jsx',
    '/bugs': 'BugJournal.jsx',
    '/github': 'GitHub.jsx',
    '/resume': 'Resume.jsx',
    '/contact': 'Contact.jsx',
    '/admin': 'AdminDashboard.jsx'
  };

  // Map tab names to routes
  const tabToRouteMap = {
    'Home.jsx': '/',
    'About.jsx': '/about',
    'Skills.jsx': '/skills',
    'Projects.jsx': '/projects',
    'Architecture.jsx': '/architecture',
    'BugJournal.jsx': '/bugs',
    'GitHub.jsx': '/github',
    'Resume.jsx': '/resume',
    'Contact.jsx': '/contact',
    'AdminDashboard.jsx': '/admin'
  };

  const navItems = [
    { name: 'Home', path: '/', icon: <Home className="w-5 h-5" />, filename: 'Home.jsx' },
    { name: 'About', path: '/about', icon: <User className="w-5 h-5" />, filename: 'About.jsx' },
    { name: 'Skills', path: '/skills', icon: <Cpu className="w-5 h-5" />, filename: 'Skills.jsx' },
    { name: 'Projects', path: '/projects', icon: <Folder className="w-5 h-5" />, filename: 'Projects.jsx' },
    { name: 'Architecture', path: '/architecture', icon: <Activity className="w-5 h-5" />, filename: 'Architecture.jsx' },
    { name: 'Bug Journal', path: '/bugs', icon: <Bug className="w-5 h-5" />, filename: 'BugJournal.jsx' },
    { name: 'GitHub', path: '/github', icon: <Github className="w-5 h-5" />, filename: 'GitHub.jsx' },
    { name: 'Resume', path: '/resume', icon: <FileText className="w-5 h-5" />, filename: 'Resume.jsx' },
    { name: 'Contact', path: '/contact', icon: <Mail className="w-5 h-5" />, filename: 'Contact.jsx' },
    { name: 'Admin', path: '/admin', icon: <Settings className="w-5 h-5 animate-pulse" />, filename: 'AdminDashboard.jsx' }
  ];

  // Sync active tab with URL path
  useEffect(() => {
    const currentTab = routeToTabMap[location.pathname];
    if (currentTab) {
      setActiveTab(currentTab);
    }
  }, [location.pathname]);

  // Scroll terminal to bottom when history changes
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalHistory]);

  // Command Palette Ctrl+K Listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    const command = terminalInput.trim().toLowerCase();
    if (!command) return;

    const newHistory = [...terminalHistory, { text: `visitor@devos:~$ ${terminalInput}`, type: 'input' }];
    
    // Command switching and parsing
    if (command.startsWith('theme')) {
      const parts = command.split(' ');
      if (parts.length > 1) {
        const targetTheme = parts[1];
        const resTheme = changeTheme(targetTheme);
        if (resTheme) {
          newHistory.push({ text: `Theme changed successfully to: ${targetTheme}`, type: 'success' });
        } else {
          newHistory.push({ text: `Unknown theme: "${targetTheme}". Select: dark, light, terminal, cyberpunk.`, type: 'error' });
        }
      } else {
        newHistory.push({ text: `Current theme: ${theme.replace('theme-', '')}. Use 'theme <dark/light/terminal/cyberpunk>' to switch.`, type: 'info' });
      }
      setTerminalHistory(newHistory);
      setTerminalInput('');
      return;
    }

    switch (command) {
      case 'help':
        newHistory.push({
          text: `Available commands:
  help        - Display all available shell commands
  about       - Load developer profile information
  skills      - Show interactive skills technology tree
  projects    - List registered portfolio applications
  education   - Render academic background timeline
  experience  - Show engineering timeline details
  resume      - Access and download PDF resume file
  contact     - Scroll viewport to Contact forms
  github      - Open GitHub profile channel link
  linkedin    - Open LinkedIn connector gateway
  clear       - Flush terminal stdout logs history`,
          type: 'info'
        });
        break;
      case 'about':
        newHistory.push({ text: 'Opening presenting layer for About details...', type: 'success' });
        navigate('/about');
        break;
      case 'projects':
        newHistory.push({
          text: `Verified Technical Projects:
├── CissanMart — Field to Family (Farmer-to-Consumer Delivery App, MERN Stack & Flutter, Ongoing)
├── MONIC — My Own Neural Intelligence Comrade (Personal AI Assistant, Python & Flutter)
└── Phantom SOS (Full-Stack Emergency SOS with Steganography, MERN Stack)`,
          type: 'info'
        });
        navigate('/projects');
        break;
      case 'skills':
        newHistory.push({
          text: `Verified Technology Stack:
├── Programming : C, C++, Python, Java, JavaScript
├── CS Concepts : OOP, Data Structures & Algorithms (DSA), DBMS
├── Frameworks  : Spring Boot, React.js, MongoDB, Flutter SDK, Dio
├── Development : MERN, LAMP, Flutter, Android using Java
└── Soft Skills : Good Communication Skills, Problem Solving Techniques`,
          type: 'info'
        });
        navigate('/skills');
        break;
      case 'education':
        newHistory.push({
          text: `Education Milestones:
├── MCA  : BMS Institute of Technology & Management, Bengaluru (VTU) [2025–2027]
├── BCA  : North University, Chikkaballapura [2021–2024, CGPA: 7.89]
├── PUC  : AES National PU College, Gauribidanuru [2019–2021, 79.5%]
└── SSLC : Govt. High School, Gauribidanuru [2009–2019, 84%]`,
          type: 'info'
        });
        navigate('/resume');
        break;
      case 'experience':
        newHistory.push({
          text: `Technical Project Implementations:
├── CissanMart — Field to Family (Farmer-to-Consumer Delivery App, MERN & Flutter, Ongoing)
├── MONIC — My Own Neural Intelligence Comrade (Personal AI Assistant, Python & Flutter)
└── Phantom SOS (Full-Stack Emergency SOS with Steganography, MERN Stack)`,
          type: 'info'
        });
        navigate('/projects');
        break;
      case 'resume':
        newHistory.push({ text: 'Accessing verified ChandrashekharHR.pdf curriculum vitae...', type: 'success' });
        window.open('/ChandrashekharHR.pdf', '_blank');
        navigate('/resume');
        break;
      case 'github':
        newHistory.push({ text: 'Accessing verified GitHub profile: github.com/chandrashekar-404...', type: 'success' });
        window.open('https://github.com/chandrashekar-404', '_blank');
        navigate('/github');
        break;
      case 'linkedin':
        newHistory.push({ text: 'Opening verified LinkedIn profile: linkedin.com/in/chandra-shekhar-131064288...', type: 'success' });
        window.open('https://www.linkedin.com/in/chandra-shekhar-131064288/', '_blank');
        break;
      case 'contact':
        newHistory.push({ text: 'Redirecting view to Contact channels page...', type: 'success' });
        navigate('/contact');
        break;
      case 'clear':
        setTerminalHistory([]);
        setTerminalInput('');
        return;
      default:
        newHistory.push({ text: `shell: command not found: "${command}". Type "help" to view options.`, type: 'error' });
    }

    setTerminalHistory(newHistory);
    setTerminalInput('');
  };

  const filteredCommands = navItems.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.filename.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePaletteSelect = (path) => {
    navigate(path);
    setCommandPaletteOpen(false);
    setSearchQuery('');
  };

  const handleBootComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loader" onComplete={handleBootComplete} />}
      </AnimatePresence>

      <div className={`flex flex-col h-screen overflow-hidden bg-[#08090d] text-gray-300 font-sans transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        
        {/* Top Control Header */}
        <header className="h-11 bg-gray-950/80 border-b border-gray-900 flex items-center justify-between px-4 backdrop-blur-md relative z-30 select-none">
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setSidebarExpanded(!sidebarExpanded)}
              className="p-1 hover:bg-gray-900 rounded text-gray-400 hover:text-white transition-colors cursor-pointer mr-2 lg:hidden"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="w-3 h-3 rounded-full bg-violet-600/30 flex items-center justify-center border border-violet-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400"></span>
            </span>
            <span className="font-display font-black text-xs tracking-widest text-white">DEV_OS // WORKSTATION</span>
          </div>

          {/* Raycast Trigger input bar */}
          <div 
            onClick={() => setCommandPaletteOpen(true)}
            className="hidden md:flex items-center space-x-2 px-3 py-1 rounded bg-gray-900 hover:bg-gray-850 border border-gray-850 hover:border-gray-800 text-xs text-gray-500 cursor-pointer w-80 justify-between transition-all"
          >
            <span className="flex items-center"><Search className="w-3.5 h-3.5 mr-2 text-gray-500" /> Search commands (Ctrl+K)...</span>
            <kbd className="bg-gray-950 px-1.5 py-0.5 rounded text-[10px] text-gray-400 font-mono">⌘K</kbd>
          </div>

          <div className="flex items-center space-x-3 text-xs text-gray-500 font-mono">
            <span> chandrashekhar@devos </span>
          </div>
        </header>

        {/* Outer Workspace Grid */}
        <div className="flex flex-1 overflow-hidden relative">
          
          {/* LEFT SIDEBAR (VS Code Activity Bar) */}
          <aside className={`bg-gray-950/60 border-r border-gray-900 flex flex-col justify-between py-4 backdrop-blur-md z-20 select-none transition-all duration-300 ${
            sidebarExpanded ? 'w-48 px-3' : 'w-16 items-center'
          } hidden lg:flex`}>
            <div className="flex flex-col space-y-2 w-full overflow-y-auto no-scrollbar">
              {navItems.map((item) => {
                const isActive = routeToTabMap[location.pathname] === item.filename;
                return (
                  <button
                    key={item.name}
                    onClick={() => navigate(item.path)}
                    title={sidebarExpanded ? '' : item.name}
                    className={`relative p-3 rounded-xl transition-all cursor-pointer group shrink-0 flex items-center ${
                      sidebarExpanded ? 'space-x-3 w-full justify-start' : 'justify-center'
                    } ${
                      isActive 
                        ? 'text-violet-400 bg-violet-600/5 border border-violet-500/20' 
                        : 'text-gray-500 hover:text-gray-300 hover:bg-gray-900/60 border border-transparent'
                    }`}
                  >
                    {item.icon}
                    {sidebarExpanded && (
                      <span className="text-xs font-mono font-medium">{item.name}</span>
                    )}
                    {isActive && !sidebarExpanded && (
                      <motion.div 
                        layoutId="sidebarActiveLine" 
                        className="absolute left-0 top-1/4 bottom-1/4 w-[3px] bg-gradient-to-b from-violet-500 to-cyan-500 rounded-r-full"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="flex flex-col space-y-2 w-full pt-4 border-t border-gray-900/40">
              <button
                onClick={() => setSidebarExpanded(!sidebarExpanded)}
                className={`p-3 rounded-xl hover:bg-gray-900/65 text-gray-500 hover:text-white transition-all cursor-pointer flex items-center ${
                  sidebarExpanded ? 'space-x-3 w-full justify-start' : 'justify-center'
                }`}
              >
                <Settings className="w-5 h-5" />
                {sidebarExpanded && <span className="text-xs font-mono">Collapse Menu</span>}
              </button>

              <button
                onClick={() => setTerminalOpen(!terminalOpen)}
                title="Toggle Terminal Panel"
                className={`p-3 rounded-xl transition-all cursor-pointer flex items-center ${
                  sidebarExpanded ? 'space-x-3 w-full justify-start' : 'justify-center'
                } ${
                  terminalOpen 
                    ? 'text-cyan-400 bg-cyan-600/5 border border-cyan-500/20' 
                    : 'text-gray-500 hover:text-gray-300 hover:bg-gray-900/60 border border-transparent'
                }`}
              >
                <Terminal className="w-5 h-5" />
                {sidebarExpanded && <span className="text-xs font-mono">Toggle Terminal</span>}
              </button>
            </div>
          </aside>

          {/* MOBILE RESPONSIVE SIDEBAR OVERLAY */}
          <AnimatePresence>
            {sidebarExpanded && (
              <div className="fixed inset-0 z-40 lg:hidden flex">
                <div 
                  className="fixed inset-0 bg-black/60 backdrop-blur-xs" 
                  onClick={() => setSidebarExpanded(false)}
                />
                <motion.aside 
                  initial={{ x: -200 }}
                  animate={{ x: 0 }}
                  exit={{ x: -200 }}
                  className="w-48 bg-gray-950 border-r border-gray-900 p-4 flex flex-col justify-between relative z-50 h-full"
                >
                  <div className="space-y-2 overflow-y-auto no-scrollbar">
                    <div className="flex justify-between items-center pb-4 mb-4 border-b border-gray-900">
                      <span className="font-display text-xs text-white tracking-widest font-black">DEV_OS NAV</span>
                      <button onClick={() => setSidebarExpanded(false)} className="text-gray-400 hover:text-white">
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {navItems.map((item) => {
                      const isActive = routeToTabMap[location.pathname] === item.filename;
                      return (
                        <button
                          key={item.name}
                          onClick={() => {
                            navigate(item.path);
                            setSidebarExpanded(false);
                          }}
                          className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all ${
                            isActive 
                              ? 'text-violet-400 bg-violet-600/10 border border-violet-500/20' 
                              : 'text-gray-500 hover:text-gray-300'
                          }`}
                        >
                          {item.icon}
                          <span className="text-xs font-mono font-medium">{item.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </motion.aside>
              </div>
            )}
          </AnimatePresence>

          {/* MAIN EDITING & PREVIEW AREA */}
          <main className="flex-1 flex flex-col overflow-hidden bg-gray-950/20 relative">
            
            {/* Editor File Tabs Bar */}
            <div className="h-10 bg-gray-950/40 border-b border-gray-900 flex items-center px-2 space-x-1 overflow-x-auto select-none no-scrollbar">
              {navItems.map((item) => {
                const isActive = activeTab === item.filename;
                return (
                  <div
                    key={item.filename}
                    onClick={() => navigate(item.path)}
                    className={`flex items-center space-x-2 px-3.5 h-full text-xs cursor-pointer border-r border-gray-900/40 transition-all font-mono group shrink-0 relative ${
                      isActive 
                        ? 'text-white bg-gray-950/70 border-t-2 border-t-violet-500' 
                        : 'text-gray-500 hover:text-gray-300 hover:bg-gray-900/20'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-violet-400' : 'bg-gray-700'} group-hover:scale-110 transition-transform`}></span>
                    <span>{item.filename}</span>
                    {item.filename !== 'Home.jsx' && (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate('/');
                        }}
                        className="opacity-0 group-hover:opacity-100 hover:text-white rounded p-0.5 ml-1 transition-opacity"
                      >
                        <X className="w-2.5 h-2.5" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Editor viewport page container */}
            <div className="flex-1 overflow-y-auto relative p-4 md:p-6 flex flex-col">
              <AnimatePresence mode="wait">
                <motion.div
                  key={location.pathname}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="flex-1 flex flex-col justify-between min-h-full"
                >
                  <div className="flex-grow">
                    <Outlet />
                  </div>
                  <Footer />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* INTEGRATED BOTTOM TERMINAL PANEL */}
            <AnimatePresence>
              {terminalOpen && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: '30%' }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  className="bg-gray-950 border-t border-gray-900 flex flex-col overflow-hidden shrink-0"
                >
                  {/* Terminal Header tab controls */}
                  <div className="h-8 bg-gray-950 flex items-center justify-between px-4 border-b border-gray-900 select-none">
                    <div className="flex items-center space-x-3 text-xs">
                      <span className="text-gray-200 font-mono font-semibold flex items-center">
                        <Terminal className="w-3.5 h-3.5 mr-1.5 text-cyan-400" /> terminal
                      </span>
                      <span className="text-[10px] text-gray-600 font-mono">chandrasekhar@devos:~</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <button 
                        onClick={() => setTerminalOpen(false)}
                        className="p-1 hover:bg-gray-900 text-gray-500 hover:text-white rounded transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Terminal stdout display */}
                  <div 
                    className="flex-1 overflow-y-auto p-4 font-mono text-xs space-y-1.5 text-gray-400 scroll-smooth"
                    onClick={() => terminalInputRef.current?.focus()}
                  >
                    {terminalHistory.map((line, idx) => (
                      <div 
                        key={idx} 
                        className={`whitespace-pre-wrap ${
                          line.type === 'error' ? 'text-red-400' :
                          line.type === 'success' ? 'text-green-400 font-medium' :
                          line.type === 'input' ? 'text-cyan-400 font-medium' : 'text-gray-300'
                        }`}
                      >
                        {line.text}
                      </div>
                    ))}
                    <div ref={terminalEndRef} />
                  </div>

                  {/* Terminal prompt stdin line */}
                  <form onSubmit={handleCommandSubmit} className="h-9 border-t border-gray-900/60 bg-[#07080b] flex items-center px-4">
                    <span className="text-cyan-400 font-mono text-xs font-semibold mr-2 shrink-0">chandrasekhar@devos:~$</span>
                    <input
                      ref={terminalInputRef}
                      type="text"
                      value={terminalInput}
                      onChange={(e) => setTerminalInput(e.target.value)}
                      placeholder="Type a command (e.g. 'help', 'projects', 'theme terminal')..."
                      className="flex-1 bg-transparent border-none outline-none text-gray-150 font-mono text-xs placeholder-gray-700"
                    />
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>

        {/* STATUS FOOTER BAR */}
        <footer className="h-6 bg-gray-950 border-t border-gray-900 flex items-center justify-between px-3 text-[10px] text-gray-500 font-mono select-none relative z-30">
          <div className="flex items-center space-x-3">
            <span className="flex items-center text-cyan-400 bg-cyan-950/20 px-1.5 py-0.5 rounded border border-cyan-900/40">
              <GitBranch className="w-3 h-3 mr-1" /> git:main*
            </span>
            <span className="flex items-center text-gray-600">
              <RefreshCw className="w-3 h-3 mr-1 animate-spin-slow" /> Synced
            </span>
          </div>

          <div className="hidden sm:flex items-center space-x-4">
            <span className="flex items-center text-gray-500">
              <Database className="w-3 h-3 mr-1.5 text-emerald-500 animate-pulse" /> MongoDB: online
            </span>
            <span className="text-violet-500 font-bold uppercase tracking-wider">MERN_STACK</span>
            <span>UTF-8</span>
            <span>JavaScript React</span>
          </div>
        </footer>

        {/* RAYCAST COMMAND PALETTE MODAL OVERLAY */}
        <AnimatePresence>
          {commandPaletteOpen && (
            <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/70 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -10 }}
                className="w-full max-w-lg bg-gray-950/95 border border-gray-850 rounded-xl overflow-hidden shadow-2xl relative"
              >
                {/* Search query input */}
                <div className="flex items-center px-4 py-3.5 border-b border-gray-900">
                  <Search className="w-4 h-4 text-violet-400 mr-3 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Type to search files or navigation routes..."
                    className="flex-1 bg-transparent border-none outline-none text-sm text-gray-100 placeholder-gray-600"
                    autoFocus
                  />
                  <button 
                    onClick={() => {
                      setCommandPaletteOpen(false);
                      setSearchQuery('');
                    }}
                    className="p-1 hover:bg-gray-900 text-gray-500 hover:text-white rounded"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Filtered suggestions list */}
                <div className="max-h-64 overflow-y-auto p-2 space-y-0.5">
                  <div className="px-3 py-1.5 text-[10px] font-semibold font-mono text-gray-600 uppercase tracking-widest">
                    Navigation Commands
                  </div>
                  {filteredCommands.length > 0 ? (
                    filteredCommands.map((item) => (
                      <div
                        key={item.filename}
                        onClick={() => handlePaletteSelect(item.path)}
                        className="flex items-center justify-between px-3 py-2.5 rounded-lg text-xs text-gray-300 hover:text-white hover:bg-violet-600/10 border border-transparent hover:border-violet-500/15 cursor-pointer transition-all"
                      >
                        <div className="flex items-center space-x-2.5">
                          <span className="p-1 bg-gray-900 rounded-md border border-gray-850 text-violet-400">
                            {item.icon}
                          </span>
                          <span className="font-medium font-mono">{item.filename}</span>
                        </div>
                        <span className="text-[10px] text-gray-600 font-mono">{item.path}</span>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6 text-xs text-gray-600 font-mono">
                      No files or commands match query.
                    </div>
                  )}
                </div>

                {/* Footnote controls */}
                <div className="bg-gray-950 border-t border-gray-900 px-4 py-2 flex justify-between items-center text-[10px] text-gray-600 font-mono">
                  <span>Use ↵ to trigger, ESC to close</span>
                  <span>Raycast palette</span>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </>
  );
};

export default RootLayout;
