import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Award, Compass, Zap, ShieldCheck, Star, Users, BrainCircuit } from 'lucide-react';

const About = () => {
  const timeline = [
    {
      title: 'Master of Computer Applications (MCA)',
      institution: 'BMS Institute of Technology and Management, Bengaluru (VTU)',
      period: '2025 – 2027',
      score: 'Post-Graduate Student',
      description: 'Strengthening foundations in data structures, database management systems, advanced software architecture, data science, and AI/ML applications.'
    },
    {
      title: 'Bachelor of Computer Applications (BCA)',
      institution: 'North University, Chikkaballapura',
      period: '2021 – 2024',
      score: 'Graduated: CGPA 7.89',
      description: 'Built core foundations in programming languages, computer concepts, object-oriented programming, and relational database systems.'
    },
    {
      title: 'Pre-University Education (PUC)',
      institution: 'AES National PU College, Gauribidanuru (KSEEB)',
      period: '2019 – 2021',
      score: 'Score: 79.5%',
      description: 'Completed higher secondary education with strong analytical foundations in science and mathematics.'
    },
    {
      title: 'Primary & Secondary Education (SSLC)',
      institution: 'Govt. High School, Gauribidanuru (KSEEB)',
      period: '2009 – 2019',
      score: 'Score: 84% in SSLC',
      description: 'Completed foundational schooling with secondary school leaving credentials.'
    }
  ];

  const highlights = [
    {
      title: 'Software Development',
      desc: 'Developing web and mobile systems across MERN stack and Flutter SDK.',
      icon: <Zap className="w-5 h-5 text-violet-400" />
    },
    {
      title: 'AI/ML & Data Science Focus',
      desc: 'Certified in Python Data Science; exploring AI agent automation with MONIC.',
      icon: <BrainCircuit className="w-5 h-5 text-cyan-400" />
    },
    {
      title: 'Database & Architecture',
      desc: 'Trained in Oracle PL/SQL, MongoDB document stores, and RESTful architectures.',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />
    },
    {
      title: 'Continuous Technical Training',
      desc: 'Completed training in Oracle PL/SQL, AWS Cloud Workshop, and Forward Deployed Engineering.',
      icon: <Star className="w-5 h-5 text-amber-400" />
    }
  ];

  return (
    <div className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Decorative Glow */}
      <div className="glow-spot-2 top-20 right-10 opacity-70"></div>

      <div className="relative z-10">
        {/* Title */}
        <div className="mb-12 text-center md:text-left">
          <h1 className="text-4xl font-extrabold font-display text-white tracking-tight sm:text-5xl">
            About{' '}
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              My Background
            </span>
          </h1>
          <p className="mt-4 text-base text-gray-400 max-w-2xl font-light leading-relaxed">
            MCA student at BMS Institute of Technology and Management, Bengaluru, with a solid grounding in software development, data structures, and emerging technologies.
          </p>
        </div>

        {/* Bio summary cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start mb-20">
          <div className="lg:col-span-2 space-y-5 text-gray-300 font-light leading-relaxed text-sm sm:text-base">
            <p>
              I am an MCA student at <strong>BMS Institute of Technology and Management (VTU)</strong>, Bengaluru, with a strong foundation in programming, data structures, DBMS, and object-oriented programming.
            </p>
            <p>
              I am seeking opportunities in <strong>Data Science, Artificial Intelligence & Machine Learning, and Software Development</strong>. I am eager to apply analytical thinking and problem-solving skills to real-world projects, develop reliable software solutions, and continuously learn emerging technologies while contributing effectively to collaborative engineering teams.
            </p>
            <p>
              My hands-on technical work includes building <strong>CissanMart</strong>, an ongoing farmer-to-consumer delivery app using Flutter and the MERN stack; developing <strong>Phantom SOS</strong>, an emergency alert application integrating digital steganography; and designing <strong>MONIC</strong>, a personal AI assistant leveraging AI agents for workflow automation.
            </p>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3">
              {highlights.map((item, idx) => (
                <div key={idx} className="flex items-start space-x-3 p-4 bg-white/2 rounded-xl border border-white/5">
                  <div className="shrink-0 mt-0.5">{item.icon}</div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                    <p className="text-xs text-gray-400 font-light mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Info Card */}
          <div className="glass-card rounded-2xl p-6 border border-gray-800/80">
            <h3 className="text-base font-bold text-white mb-6 font-display border-b border-gray-800/60 pb-3">
              Developer Profile
            </h3>
            <ul className="space-y-4 text-sm font-mono text-gray-400">
              <li className="flex justify-between">
                <span className="text-gray-500">Name:</span>
                <span className="text-white font-semibold">Chandrashekhar H R</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-500">Location:</span>
                <span className="text-white">Bengaluru, Karnataka</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-500">Current Program:</span>
                <span className="text-white">MCA (2025–2027)</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-500">Institution:</span>
                <span className="text-violet-400 text-right text-xs">BMSIT&M (VTU)</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-500">Undergraduate:</span>
                <span className="text-white text-right text-xs">BCA (CGPA: 7.89)</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-500">Primary Languages:</span>
                <span className="text-cyan-400 text-right text-xs">Java, Python, JS, C, C++</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Education Timeline */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold font-display text-white mb-10 border-b border-gray-900 pb-3">
            Academic Timeline
          </h2>
          
          <div className="relative border-l border-gray-800 ml-4 md:ml-6 space-y-10 py-2">
            {timeline.map((node, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.08 }}
                className="relative pl-8 md:pl-10"
              >
                {/* Connecting Dot */}
                <span className="absolute -left-[11px] top-1 flex items-center justify-center w-5 h-5 rounded-full bg-violet-600 border border-gray-950 shadow-[0_0_10px_rgba(139,92,246,0.6)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                </span>

                <div className="p-5 rounded-xl bg-gray-950/40 border border-gray-850 hover:border-gray-800 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-1">
                    <h3 className="text-base font-bold text-white font-display">
                      {node.title}
                    </h3>
                    <span className="text-[10px] font-mono text-gray-400 bg-gray-900 px-2 py-0.5 rounded border border-gray-850 mt-1 sm:mt-0 w-max">
                      {node.period}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-xs text-violet-400 font-mono">{node.institution}</span>
                    <span className="text-gray-600">&bull;</span>
                    <span className="text-xs text-emerald-400 font-mono font-medium">{node.score}</span>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed font-light">
                    {node.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
