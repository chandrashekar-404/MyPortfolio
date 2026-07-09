import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Network, Database, Shield } from 'lucide-react';

const Architecture = () => {
  const steps = [
    {
      title: 'Client (Presentation Layer)',
      icon: <Layers className="w-5 h-5 text-violet-400" />,
      details: 'Built with React and Vite for optimized bundles. Stylings leverage Tailwind CSS v4 variables directly inside CSS. Animations are driven by Framer Motion, delivering micro-interactions.',
      techs: ['React', 'Vite', 'Tailwind v4', 'Framer Motion']
    },
    {
      title: 'API Gateway / Middlewares',
      icon: <Shield className="w-5 h-5 text-cyan-400" />,
      details: 'Express.js application acting as an API gateway. Enforces Helmet security configurations, CORS policy limits, morgan requests logging, and handles async validation errors through a custom middleware.',
      techs: ['Express', 'Helmet', 'CORS', 'Morgan Logger']
    },
    {
      title: 'Database (Persistence Layer)',
      icon: <Database className="w-5 h-5 text-fuchsia-400" />,
      details: 'MongoDB Atlas instance housing portfolio documents. Data modeling is enforced by Mongoose schemas (Projects, Bugs, Contacts), using connection pooling and error-recovery handlers.',
      techs: ['MongoDB Atlas', 'Mongoose', 'Connection Pooling']
    }
  ];

  return (
    <div className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Decorative Glow */}
      <div className="glow-spot-1 top-20 right-10 opacity-70"></div>

      <div className="relative z-10">
        {/* Title */}
        <div className="mb-12 text-center md:text-left">
          <h1 className="text-4xl font-extrabold font-display text-white tracking-tight sm:text-5xl">
            System{' '}
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Architecture
            </span>
          </h1>
          <p className="mt-4 text-base text-gray-400 max-w-2xl">
            A visual and technical overview of this MERN application design, detailing the communication flows and layers.
          </p>
        </div>

        {/* Dynamic Architectural Flow Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-2xl p-8 border border-gray-800/80 mb-16 text-center overflow-x-auto"
        >
          <h3 className="text-lg font-bold text-white mb-8 font-display inline-flex items-center">
            <Network className="w-5 h-5 text-violet-400 mr-2" /> Application Telemetry Flow
          </h3>
          
          <div className="min-w-[600px] flex justify-between items-center px-6 relative before:absolute before:left-10 before:right-10 before:top-1/2 before:-translate-y-1/2 before:h-[2px] before:bg-gradient-to-r before:from-violet-500/20 before:via-cyan-500/20 before:to-fuchsia-500/20 before:-z-10">
            {/* Box 1 */}
            <div className="w-44 p-4 rounded-xl bg-gray-950 border border-gray-850 shadow-lg relative">
              <span className="text-[10px] font-mono text-gray-500 block mb-1">FRONTEND</span>
              <span className="text-sm font-bold text-violet-400 font-display">Client View (Vite)</span>
              <span className="text-[9px] font-mono text-gray-600 block mt-2">Axios requests</span>
            </div>

            <div className="text-xs text-gray-500 font-mono animate-pulse">⟶ proxy ⟶</div>

            {/* Box 2 */}
            <div className="w-44 p-4 rounded-xl bg-gray-950 border border-gray-850 shadow-lg relative">
              <span className="text-[10px] font-mono text-gray-500 block mb-1">BACKEND API</span>
              <span className="text-sm font-bold text-cyan-400 font-display">Express.js Router</span>
              <span className="text-[9px] font-mono text-gray-600 block mt-2">Helmet & CORS Checks</span>
            </div>

            <div className="text-xs text-gray-500 font-mono animate-pulse">⟶ mongoose ⟶</div>

            {/* Box 3 */}
            <div className="w-44 p-4 rounded-xl bg-gray-950 border border-gray-850 shadow-lg relative">
              <span className="text-[10px] font-mono text-gray-500 block mb-1">DATA LAYER</span>
              <span className="text-sm font-bold text-fuchsia-400 font-display">MongoDB Atlas</span>
              <span className="text-[9px] font-mono text-gray-600 block mt-2">Document Stores</span>
            </div>
          </div>
        </motion.div>

        {/* Layers Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {steps.map((layer, index) => (
            <motion.div
              key={layer.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="glass-card rounded-2xl p-6 border border-gray-800/80 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2.5 rounded-lg bg-gray-900 border border-gray-800">
                    {layer.icon}
                  </div>
                  <h3 className="text-base font-bold text-white font-display">
                    {layer.title}
                  </h3>
                </div>

                <p className="text-sm text-gray-400 leading-relaxed font-light mb-6">
                  {layer.details}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1">
                  {layer.techs.map(tech => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded bg-gray-900 text-[10px] font-mono text-gray-500 border border-gray-850"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Architecture;
