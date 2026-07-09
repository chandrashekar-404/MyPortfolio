import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, RefreshCw, Compass } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="relative min-h-[70vh] flex items-center justify-center py-20 px-4 text-center overflow-hidden">
      {/* Glow Spots */}
      <div className="glow-spot-1 top-10 left-1/4 opacity-40"></div>
      
      <div className="relative z-10 max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Compass Icon */}
          <div className="inline-flex p-4 rounded-full bg-violet-600/10 border border-violet-500/20 text-violet-400 mb-6 animate-spin-slow">
            <Compass className="w-12 h-12" />
          </div>

          <h1 className="text-8xl font-black font-display tracking-tight text-white mb-2 select-none text-glow">
            404
          </h1>
          <h2 className="text-xl font-bold text-gray-200 mb-4 font-display">
            Asset Path Unresolved
          </h2>
          <p className="text-sm text-gray-400 leading-relaxed font-light mb-8">
            The page directory you are attempting to address does not exist or has been compiled to a new route path.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-violet-600 hover:bg-violet-750 text-white font-semibold text-xs transition-all shadow-[0_0_15px_rgba(139,92,246,0.25)] cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Base
            </Link>
            <button
              onClick={() => window.location.reload()}
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-gray-900 border border-gray-800 text-gray-300 hover:text-white hover:bg-gray-850 font-semibold text-xs transition-all cursor-pointer"
            >
              <RefreshCw className="w-4 h-4 mr-2" /> Retry Connection
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
