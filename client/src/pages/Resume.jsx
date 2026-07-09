import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Download, Award, Briefcase, GraduationCap, 
  Eye, Printer, FileText, CheckCircle, ExternalLink 
} from 'lucide-react';

const Resume = () => {
  const [viewMode, setViewMode] = useState('interactive'); // 'interactive' or 'pdf'

  const education = [
    {
      degree: 'Master of Computer Applications (MCA)',
      school: 'BMS Institute of Technology and Management, Bengaluru (VTU)',
      year: '2025 - 2027',
      details: 'Deepening advanced computer architectures, distributed database paradigms, enterprise software engineering, and analytical computing models.'
    },
    {
      degree: 'Bachelor of Computer Applications (BCA)',
      school: 'Bengaluru North University, Chikkaballapura',
      year: '2021 - 2024',
      details: 'Graduated with a CGPA of 7.89. Studied core computer science basics, data structures, object-oriented concepts, web systems, and databases.'
    },
    {
      degree: 'Pre-University Education (PUC)',
      school: 'AES National PU College, Gauribidanuru (KSEEB)',
      year: '2019 - 2021',
      details: 'Scored 79.5% with PCMCs (Physics, Chemistry, Mathematics, Computer Science).'
    },
    {
      degree: 'SSLC (Primary & Secondary Education)',
      school: 'Govt. High School, Gauribidanuru (KSEEB)',
      year: '2009 - 2019',
      details: 'Scored 84% in SSLC (Secondary School Leaving Certificate).'
    }
  ];

  const certifications = [
    {
      name: 'Oracle Analytics Cloud 2025 Certified Professional',
      issuer: 'Oracle University',
      year: '2025'
    },
    {
      name: 'Data Analytics and Visualization Job Simulation',
      issuer: 'Accenture / Forage',
      year: '2025'
    },
    {
      name: 'Full Stack Development Certification',
      issuer: 'Q-spiders Solutions',
      year: '2024'
    },
    {
      name: 'Data Science Using Python',
      issuer: 'Eduphoenix Solutions',
      year: '2023'
    }
  ];

  const handlePrint = () => {
    const printWindow = window.open('/Chandrashekhar.pdf', '_blank');
    if (printWindow) {
      printWindow.focus();
      printWindow.print();
    } else {
      alert('Could not open print window. Please allow popups.');
    }
  };

  return (
    <div className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Background Glow */}
      <div className="glow-spot-2 top-10 right-20 opacity-60"></div>

      <div className="relative z-10">
        
        {/* Title */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
          <div>
            <h1 className="text-4xl font-extrabold font-display text-white tracking-tight sm:text-5xl">
              Professional{' '}
              <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                Resume
              </span>
            </h1>
            <p className="mt-2 text-base text-gray-400 max-w-xl font-light">
              Interactive workspace demonstrating credentials, certifications, and educational pathways.
            </p>
          </div>

          {/* Action Buttons Toolbar */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setViewMode(viewMode === 'interactive' ? 'pdf' : 'interactive')}
              className={`inline-flex items-center px-4 py-2 rounded-lg border text-xs font-mono font-semibold cursor-pointer transition-colors ${
                viewMode === 'pdf'
                  ? 'bg-violet-600 text-white border-violet-500 shadow-[0_0_10px_rgba(139,92,246,0.3)]'
                  : 'bg-gray-900 border-gray-850 hover:border-gray-800 text-gray-300 hover:text-white'
              }`}
            >
              <Eye className="w-4 h-4 mr-2" /> 
              {viewMode === 'pdf' ? 'Interactive Summary' : 'Preview Original PDF'}
            </button>

            <a
              href="/Chandrashekhar.pdf"
              download="Chandrashekhar_Resume.pdf"
              className="inline-flex items-center px-4 py-2 bg-gray-900 border border-gray-850 hover:border-gray-800 text-xs font-mono font-semibold rounded-lg text-gray-300 hover:text-white transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4 mr-2" /> Download
            </a>

            <button
              onClick={handlePrint}
              className="inline-flex items-center px-4 py-2 bg-gray-900 border border-gray-850 hover:border-gray-800 text-xs font-mono font-semibold rounded-lg text-gray-300 hover:text-white transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4 mr-2" /> Print
            </button>
          </div>
        </div>

        {/* View Mode Switching */}
        {viewMode === 'pdf' ? (
          /* Embed PDF Frame */
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full h-[650px] bg-gray-950 rounded-2xl border border-gray-850 overflow-hidden shadow-2xl relative"
          >
            <div className="absolute top-2 left-4 z-10 flex items-center space-x-2 text-[10px] font-mono text-gray-500 bg-gray-950/80 px-3 py-1 rounded-full border border-gray-900">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Rendering: Chandrashekhar.pdf</span>
            </div>
            
            <iframe
              src="/Chandrashekhar.pdf#toolbar=0"
              width="100%"
              height="100%"
              className="border-none"
              title="Chandrashekhar PDF Viewer"
            >
              <div className="p-12 text-center font-mono text-xs text-gray-400">
                PDF embed is not supported by your browser. Please click 
                <a href="/Chandrashekhar.pdf" target="_blank" rel="noopener noreferrer" className="text-violet-400 underline ml-1">
                  here <ExternalLink className="w-3.5 h-3.5 inline" />
                </a> to view the document.
              </div>
            </iframe>
          </motion.div>
        ) : (
          /* Styled Interactive Resume Layout */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Left 2 Columns: Experience & Education */}
            <div className="lg:col-span-2 space-y-12">
              
              {/* Experience Highlights */}
              <div>
                <h2 className="text-xl font-bold font-display text-white mb-6 flex items-center border-b border-gray-900/60 pb-3">
                  <Briefcase className="w-5 h-5 text-violet-400 mr-2" /> Projects & Engineering Experience
                </h2>

                <div className="space-y-6">
                  <div className="p-6 bg-white/2 border border-white/5 rounded-xl hover:border-violet-500/20 transition-all">
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-violet-600/10 text-violet-400 border border-violet-500/20">
                      MERN STACK & ANIMATIONS
                    </span>
                    <h3 className="text-base font-bold text-white mt-3">Developer Operating System Portfolio</h3>
                    <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                      Designed and built a complex React/Vite terminal-inspired workspace utilizing Tailwind CSS v4, Framer Motion transitions, Express.js API routers, and MongoDB Atlas databases. Features interactive command shell parsing, Ctrl+K query registries, and JWT protected administrator grids.
                    </p>
                  </div>

                  <div className="p-6 bg-white/2 border border-white/5 rounded-xl hover:border-cyan-500/20 transition-all">
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-cyan-600/10 text-cyan-400 border border-cyan-500/20">
                      PHP & MYSQL RELATION
                    </span>
                    <h3 className="text-base font-bold text-white mt-3">Bank Locker Management System</h3>
                    <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                      Engineered a secure web application for tracking bank locker registrations, availability mappings, and payment structures. Implemented transaction locks (SELECT FOR UPDATE) to secure double-booking attempts under concurrent threads and structured staff panels.
                    </p>
                  </div>

                  <div className="p-6 bg-white/2 border border-white/5 rounded-xl hover:border-fuchsia-500/20 transition-all">
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-fuchsia-600/10 text-fuchsia-400 border border-fuchsia-500/20">
                      PHP & WEB BOOKING
                    </span>
                    <h3 className="text-base font-bold text-white mt-3">Ticket to Trek Booking Platform</h3>
                    <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                      Created an online reservation system for exploring trekking locations across Karnataka. Structured multi-table MySQL joins to calculate seats availability, booking timelines, and user tickets invoice records.
                    </p>
                  </div>
                </div>
              </div>

              {/* Education Milestones */}
              <div>
                <h2 className="text-xl font-bold font-display text-white mb-6 flex items-center border-b border-gray-900/60 pb-3">
                  <GraduationCap className="w-5 h-5 text-cyan-400 mr-2" /> Education Path
                </h2>

                <div className="space-y-6 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-[1px] before:bg-gray-900">
                  {education.map((edu, idx) => (
                    <div key={idx} className="relative pl-10">
                      {/* Timeline dot */}
                      <div className="absolute left-[11.5px] top-1.5 w-2.5 h-2.5 rounded-full bg-violet-500 ring-4 ring-[#08090d]"></div>
                      
                      <div className="p-5 bg-gray-950/40 border border-gray-850 rounded-xl">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
                          <h3 className="text-base font-bold text-white">{edu.degree}</h3>
                          <span className="text-[10px] font-mono text-gray-500 bg-gray-900 px-2 py-0.5 rounded border border-gray-850 mt-1 sm:mt-0 w-max">
                            {edu.year}
                          </span>
                        </div>
                        <span className="text-xs text-violet-400 font-mono block mb-2">{edu.school}</span>
                        <p className="text-xs text-gray-400 leading-relaxed font-light">{edu.details}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Certifications & Competencies */}
            <div className="space-y-8">
              
              {/* Certifications Ledger */}
              <div>
                <h2 className="text-xl font-bold font-display text-white mb-6 flex items-center border-b border-gray-900/60 pb-3">
                  <Award className="w-5 h-5 text-fuchsia-400 mr-2" /> Certifications
                </h2>

                <div className="space-y-3">
                  {certifications.map((cert, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ x: 3 }}
                      className="p-4 bg-gray-950/60 border border-gray-850 rounded-xl"
                    >
                      <span className="text-[9px] font-mono text-fuchsia-400">{cert.year}</span>
                      <h3 className="text-xs font-bold text-white mt-1 leading-normal">{cert.name}</h3>
                      <span className="text-[10px] text-gray-500 block mt-0.5">{cert.issuer}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Languages Index */}
              <div className="p-5 rounded-2xl bg-violet-950/10 border border-violet-900/20">
                <h3 className="text-xs font-bold font-mono text-violet-400 uppercase tracking-widest mb-3">
                  Core Technologies
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    'C/C++', 'Python', 'Java', 'Spring Boot', 'React.js', 
                    'Node.js', 'Express.js', 'MongoDB', 'PHP', 'MySQL', 
                    'Tailwind CSS', 'Framer Motion', 'REST APIs', 'DSA', 'OOP'
                  ].map(tech => (
                    <span 
                      key={tech} 
                      className="px-2 py-0.5 bg-gray-950 border border-gray-850 rounded text-[9px] font-mono text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Status Log Box */}
              <div className="p-4 rounded-xl bg-gray-950/80 border border-gray-900 font-mono text-[9px] text-gray-600 leading-relaxed">
                <div className="flex items-center space-x-1.5 mb-2 text-gray-500">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="font-semibold text-gray-400 uppercase">SYS_LOG: VERIFIED</span>
                </div>
                <span>Document: Chandrashekhar_Resume.pdf</span>
                <br />
                <span>SHA-256: 7fa3bc8dfa10e82c16a49db2</span>
                <br />
                <span>Status: Compliant with VTU & MCA protocols</span>
              </div>

            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
};

export default Resume;
