import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-gray-900/40 bg-transparent py-6 text-center text-[10px] font-mono text-gray-550 select-none mt-12 shrink-0">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-2">
        <p>Built using React + Vite</p>
        <p>
          Designed by <span className="text-violet-400 font-semibold">Chandrashekhar H R</span>
        </p>
        <p>© {currentYear} &middot; DevOS Workstation</p>
      </div>
    </footer>
  );
};

export default Footer;
