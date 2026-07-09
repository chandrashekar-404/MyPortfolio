import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Cpu, HardDrive, Wifi, Database } from 'lucide-react';

const LoadingScreen = ({ onComplete }) => {
  const [bootLines, setBootLines] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { text: 'Initializing DevOS Kernel v1.0.4...', delay: 200, icon: <Cpu className="w-3.5 h-3.5 text-violet-400 mr-2" /> },
    { text: 'Loading React frontend services...', delay: 300, icon: <Terminal className="w-3.5 h-3.5 text-cyan-400 mr-2" /> },
    { text: 'Loading Node.js asynchronous runtime...', delay: 250, icon: <HardDrive className="w-3.5 h-3.5 text-amber-400 mr-2" /> },
    { text: 'Connecting MongoDB Atlas database...', delay: 400, icon: <Database className="w-3.5 h-3.5 text-emerald-400 mr-2" /> },
    { text: 'Loading Portfolio interactive shell...', delay: 300, icon: <Wifi className="w-3.5 h-3.5 text-fuchsia-400 mr-2" /> },
    { text: 'System Ready. Welcoming guest visitor...', delay: 200, icon: <Cpu className="w-3.5 h-3.5 text-green-400 mr-2" /> },
  ];

  useEffect(() => {
    if (currentStep < steps.length) {
      const timer = setTimeout(() => {
        setBootLines((prev) => [...prev, steps[currentStep]]);
        setCurrentStep((prev) => prev + 1);
      }, steps[currentStep].delay);
      return () => clearTimeout(timer);
    } else {
      const exitTimer = setTimeout(() => {
        if (onComplete) onComplete();
      }, 800);
      return () => clearTimeout(exitTimer);
    }
  }, [currentStep]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#050608] text-gray-300 font-mono text-sm select-none p-4"
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        y: -30,
        transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } 
      }}
    >
      {/* Moving scanner grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.002)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none opacity-40"></div>
      
      {/* Decorative center glow */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-violet-600/5 blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-2xl border border-gray-800/80 bg-gray-950/80 rounded-xl p-6 shadow-2xl backdrop-blur-md relative">
        {/* Top title bar */}
        <div className="flex justify-between items-center border-b border-gray-900 pb-3 mb-4">
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/40"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/40"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/40"></span>
            <span className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider pl-1.5">devos_bootloader.efi</span>
          </div>
          <span className="text-[10px] text-gray-600">COM_PORT: 5000</span>
        </div>

        {/* Boot Logs */}
        <div className="space-y-2.5 min-h-[180px] flex flex-col justify-start">
          <AnimatePresence>
            {bootLines.map((line, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.15 }}
                className="flex items-center text-xs sm:text-sm text-gray-300"
              >
                {line.icon}
                <span className={idx === steps.length - 1 ? "text-green-400 font-bold" : ""}>
                  {line.text}
                </span>
                {idx === bootLines.length - 1 && currentStep < steps.length && (
                  <span className="w-1.5 h-4 ml-1 bg-violet-500 animate-pulse inline-block"></span>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Dynamic Progress Loader */}
        <div className="mt-8 border-t border-gray-900 pt-5">
          <div className="flex justify-between items-center text-[10px] text-gray-500 mb-2">
            <span>DUMPING RAM: {(currentStep * 16.6).toFixed(0)}%</span>
            <span>SECTORS SYNCED</span>
          </div>
          <div className="w-full h-1.5 bg-gray-900/60 rounded-full overflow-hidden border border-white/[0.01]">
            <motion.div
              className="h-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500"
              initial={{ width: '0%' }}
              animate={{ width: `${(currentStep / steps.length) * 100}%` }}
              transition={{ ease: 'easeInOut', duration: 0.3 }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
