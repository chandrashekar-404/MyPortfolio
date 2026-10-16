import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, Github, Code2, Terminal } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on path changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Skills', path: '/skills' },
    { name: 'Projects', path: '/projects' },
    { name: 'Architecture', path: '/architecture' },
    { name: 'Bug Journal', path: '/bugs' },
    { name: 'Resume', path: '/resume' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${scrolled ? 'glass-nav py-3 shadow-lg' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-violet-600/10 border border-violet-500/20 group-hover:border-violet-500/50 group-hover:bg-violet-600/20 transition-all duration-300">
              <Terminal className="w-5 h-5 text-violet-400" />
            </div>
            <span className="font-display font-black text-lg tracking-wider bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent group-hover:opacity-85 transition-opacity">
              DEV.PORTFOLIO
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors rounded-md duration-200 ${
                    isActive 
                      ? 'text-violet-400 font-semibold' 
                      : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-to-r from-violet-500 to-cyan-500"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}

            <div className="h-4 w-[1px] bg-gray-800 mx-2" />

            {/* External Github Icon */}
            <a
              href="https://github.com/chandrashekar-404"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-400 hover:text-white transition-colors duration-200"
              aria-label="GitHub Profile"
            >
              <Github className="w-5 h-5" />
            </a>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 ml-1 text-gray-400 hover:text-violet-400 transition-colors duration-200 rounded-lg hover:bg-white/5"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Menu Buttons */}
          <div className="flex items-center lg:hidden space-x-1">
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-400 hover:text-violet-400 transition-colors rounded-lg hover:bg-white/5"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors focus:outline-none"
              aria-label="Open Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden glass-nav overflow-hidden border-t border-gray-800"
          >
            <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3 bg-[#08090d]/95">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-all ${
                      isActive
                        ? 'bg-violet-600/10 text-violet-400 border-l-4 border-violet-500 pl-2'
                        : 'text-gray-400 hover:bg-white/5 hover:text-white pl-3'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <a
                href="https://github.com/chandrashekar-404"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:bg-white/5 hover:text-white pl-3"
              >
                <Github className="w-5 h-5 mr-2" /> GitHub Profile
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
