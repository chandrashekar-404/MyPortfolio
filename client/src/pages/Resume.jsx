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
      year: '2025 – 2027',
      details: 'Postgraduate coursework focusing on Data Science, Artificial Intelligence, advanced DBMS, distributed systems, and software engineering.'
    },
    {
      degree: 'Bachelor of Computer Applications (BCA)',
      school: 'North University, Chikkaballapura',
      year: '2021 – 2024',
      details: 'Graduated with a CGPA of 7.89. Studied core computer science, data structures, relational database systems, and object-oriented programming.'
    },
    {
      degree: 'Pre-University Education (PUC)',
      school: 'AES National PU College, Gauribidanuru (KSEEB)',
      year: '2019 – 2021',
      details: 'Completed pre-university education with an aggregate score of 79.5%.'
    },
    {
      degree: 'Primary & Secondary School Education (SSLC)',
      school: 'Govt. High School, Gauribidanuru (KSEEB)',
      year: '2009 – 2019',
      details: 'Completed secondary schooling with an aggregate score of 84% in SSLC.'
    }
  ];

  const certifications = [
    {
      name: 'DBMS with Oracle PL/SQL',
      issuer: 'SQE Systems & Solutions, Bengaluru in association with MCA BMSIT&M',
      date: '26 Feb 2026',
      type: 'Offline Training with Project'
    },
    {
      name: 'Forward Deployed Engineer',
      issuer: 'CertoMeter',
      date: '26 Sep – 1 Oct 2026',
      type: '30-Hour Offline Course'
    },
    {
      name: 'Cloud Computing in AWS',
      issuer: 'CertoMeter',
      date: '18–19 June 2026',
      type: 'Workshop'
    },
    {
      name: 'Data Science Using Python',
      issuer: 'Eduphoenix Solutions',
      date: 'Coursework Certification',
      type: 'Training Certification'
    }
  ];

  const verifiedProjects = [
    {
      title: 'CissanMart — Field to Family',
      stack: 'Flutter | MERN Stack | MongoDB | Node.js | Socket.IO | Razorpay',
      status: 'Ongoing Development',
      description: 'Built a farmer-to-consumer agricultural marketplace with separate Flutter mobile apps for buyers and farmers, backed by an Express/MongoDB REST backend, Cloudinary media handling, and real-time Socket.IO communication.'
    },
    {
      title: 'MONIC — My Own Neural Intelligence Comrade',
      stack: 'Python | Flutter | Android | AI Agents | Automation',
      status: 'Completed',
      description: 'Personal AI assistant utilizing autonomous AI agents to automate everyday tasks, combining a Python automation engine with a Flutter Android mobile app interface.'
    },
    {
      title: 'Phantom SOS',
      stack: 'MERN Stack | MongoDB | Node.js | React | Steganography',
      status: 'Completed',
      description: 'Emergency SOS application embedding critical coordinate and alert data securely within media files via digital steganography techniques for discreet emergency communication.'
    }
  ];

  const handlePrint = () => {
    const printWindow = window.open('/ChandrashekharHR.pdf', '_blank');
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
              Verified curriculum vitae outlining educational milestones, certifications, and technical projects from my latest resume.
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
              {viewMode === 'pdf' ? 'Interactive View' : 'Preview PDF Document'}
            </button>

            <a
              href="/ChandrashekharHR.pdf"
              download="ChandrashekharHR_Resume.pdf"
              className="inline-flex items-center px-4 py-2 bg-gray-900 border border-gray-850 hover:border-gray-800 text-xs font-mono font-semibold rounded-lg text-gray-300 hover:text-white transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4 mr-2" /> Download PDF
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
            className="w-full h-[700px] bg-gray-950 rounded-2xl border border-gray-850 overflow-hidden shadow-2xl relative"
          >
            <div className="absolute top-2 left-4 z-10 flex items-center space-x-2 text-[10px] font-mono text-gray-400 bg-gray-950/90 px-3 py-1 rounded-full border border-gray-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Document: ChandrashekharHR.pdf</span>
            </div>
            
            <iframe
              src="/ChandrashekharHR.pdf#toolbar=0"
              width="100%"
              height="100%"
              className="border-none pt-8"
              title="Chandrashekhar H R Resume PDF"
            >
              <div className="p-12 text-center font-mono text-xs text-gray-400">
                PDF embed is not supported by your browser. Please click 
                <a href="/ChandrashekharHR.pdf" target="_blank" rel="noopener noreferrer" className="text-violet-400 underline ml-1">
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
            {/* Left 2 Columns: Projects & Education */}
            <div className="lg:col-span-2 space-y-12">
              
              {/* Verified Projects Section */}
              <div>
                <h2 className="text-xl font-bold font-display text-white mb-6 flex items-center border-b border-gray-900/60 pb-3">
                  <Briefcase className="w-5 h-5 text-violet-400 mr-2" /> Technical Projects
                </h2>

                <div className="space-y-5">
                  {verifiedProjects.map((proj, idx) => (
                    <div 
                      key={idx} 
                      className="p-5 bg-white/2 border border-white/5 rounded-xl hover:border-violet-500/20 transition-all"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-violet-600/10 text-violet-400 border border-violet-500/20">
                          {proj.stack}
                        </span>
                        <span className="text-[10px] font-mono text-amber-400 bg-amber-950/20 px-2 py-0.5 rounded border border-amber-500/20">
                          {proj.status}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-white mt-1">{proj.title}</h3>
                      <p className="text-xs text-gray-400 mt-2 leading-relaxed font-light">
                        {proj.description}
                      </p>
                    </div>
                  ))}
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
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-1.5">
                          <h3 className="text-base font-bold text-white">{edu.degree}</h3>
                          <span className="text-[10px] font-mono text-gray-400 bg-gray-900 px-2 py-0.5 rounded border border-gray-850 mt-1 sm:mt-0 w-max">
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

            {/* Right Column: Certifications & Technologies */}
            <div className="space-y-8">
              
              {/* Certifications Ledger */}
              <div>
                <h2 className="text-xl font-bold font-display text-white mb-6 flex items-center border-b border-gray-900/60 pb-3">
                  <Award className="w-5 h-5 text-fuchsia-400 mr-2" /> Certifications & Courses
                </h2>

                <div className="space-y-3">
                  {certifications.map((cert, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ x: 3 }}
                      className="p-4 bg-gray-950/60 border border-gray-850 rounded-xl"
                    >
                      <div className="flex justify-between items-center text-[9px] font-mono text-fuchsia-400">
                        <span>{cert.type}</span>
                        <span>{cert.date}</span>
                      </div>
                      <h3 className="text-xs font-bold text-white mt-1 leading-normal">{cert.name}</h3>
                      <span className="text-[10px] text-gray-500 block mt-0.5">{cert.issuer}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Core Technologies */}
              <div className="p-5 rounded-2xl bg-violet-950/10 border border-violet-900/20">
                <h3 className="text-xs font-bold font-mono text-violet-400 uppercase tracking-widest mb-3">
                  Verified Technical Stack
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    'C', 'C++', 'Python', 'Java', 'JavaScript', 
                    'React.js', 'Node.js', 'Express.js', 'Flutter SDK', 'Dio', 
                    'MongoDB', 'Spring Boot', 'MERN', 'LAMP', 'Android Java', 
                    'DSA', 'OOP', 'DBMS', 'Oracle PL/SQL'
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

              {/* Verified Source Box */}
              <div className="p-4 rounded-xl bg-gray-950/80 border border-gray-900 font-mono text-[9px] text-gray-500 leading-relaxed">
                <div className="flex items-center space-x-1.5 mb-2 text-gray-400">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="font-semibold uppercase">Source of Truth: Verified</span>
                </div>
                <span>Document: ChandrashekharHR.pdf</span>
                <br />
                <span>Candidate: Chandrashekhar H R</span>
                <br />
                <span>Affiliation: BMSIT&M (VTU) MCA Program</span>
              </div>

            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
};

export default Resume;
