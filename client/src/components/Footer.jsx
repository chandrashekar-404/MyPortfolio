import React from 'react';
import { Github, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-gray-900/40 bg-transparent py-6 text-center text-[10px] font-mono text-gray-400 select-none mt-12 shrink-0">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-3">
        <p>Built with React & Vite</p>
        <p>
          Portfolio of <span className="text-violet-400 font-semibold">Chandrashekhar H R</span>
        </p>
        <div className="flex items-center space-x-3">
          <a
            href="https://github.com/chandrashekar-404"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
            aria-label="GitHub Profile"
          >
            GitHub
          </a>
          <span>&middot;</span>
          <a
            href="https://www.linkedin.com/in/chandra-shekhar-131064288/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-400 transition-colors"
            aria-label="LinkedIn Profile"
          >
            LinkedIn
          </a>
          <span>&middot;</span>
          <span>© {currentYear} DevOS</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
