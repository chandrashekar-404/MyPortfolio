import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Award, Compass, Zap, ShieldCheck, Star, ShieldAlert } from 'lucide-react';

const About = () => {
  const timeline = [
    {
      title: 'Primary & Secondary Education (SSLC)',
      institution: 'Govt. High School, Gauribidanuru (KSEEB)',
      period: '2009 - 2019',
      score: 'Score: 84% in SSLC',
      description: 'Built basic mathematics foundation, computer principles, and standard science qualifications.'
    },
    {
      title: 'Pre-University Education (PUC / Diploma)',
      institution: 'AES National PU College, Gauribidanuru (KSEEB)',
      period: '2019 - 2021',
      score: 'Score: 79.5% with PCMCs',
      description: 'Strengthened analytical coding foundations in Computer Science, Mathematics, Physics, and Chemistry.'
    },
    {
      title: 'Bachelor of Computer Applications (BCA)',
      institution: 'Bengaluru North University, Chikkaballapura',
      period: '2021 - 2024',
      score: 'Graduated: CGPA 7.89',
      description: 'Began building database systems and web utilities. Developed Bank Locker Management and Ticket to Trek package booking platforms.'
    },
    {
      title: 'Master of Computer Applications (MCA)',
      institution: 'BMS Institute of Technology and Management, Bengaluru (VTU)',
      period: '2025 - 2027',
      score: 'Post-Graduate Student',
      description: 'Currently deep-diving into database systems, microservice architectures, data structures, and advanced mobile/web models.'
    },
    {
      title: 'Current Projects & Skill Refinements',
      institution: 'DevOS Workstation',
      period: '2026',
      score: 'Active Development',
      description: 'Building CissanMart farm-to-community auctions, native Android tableside Restaurant POS engines, and steganographic off-grid signals. Refining MERN + Android stack.'
    },
    {
      title: 'Future Engineering Goals',
      institution: 'Distributed Systems & Microservices',
      period: '2027+',
      score: 'Vision & Roadmaps',
      description: 'Aiming to build enterprise-scale cloud infrastructures, backend systems, and contribute to global open-source modules.'
    }
  ];

  const achievements = [
    { name: 'Projects Built', desc: '15+ complete local and web applications deployed in PHP, Java, and MERN.' },
    { name: 'Hackathons & Sprints', desc: 'Participated in local college logic code challenges and VTU technology sprints.' },
    { name: 'Oracle Certified Professional', desc: 'Oracle Analytics Cloud 2025 Certified Professional credential.' },
    { name: 'Learning Progress', desc: 'Completed full-stack engineering modules at Q-spiders and Python Data Science at Eduphoenix.' }
  ];

  const badges = [
    { name: 'Oracle Analytics Certified', theme: 'border-amber-500/25 bg-amber-950/10 text-amber-400' },
    { name: 'MERN Developer', theme: 'border-violet-500/25 bg-violet-950/10 text-violet-400' },
    { name: 'Accenture Simulation Graduate', theme: 'border-fuchsia-500/25 bg-fuchsia-950/10 text-fuchsia-400' },
    { name: 'Android Builder', theme: 'border-cyan-500/25 bg-cyan-950/10 text-cyan-400' }
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
              My Journey
            </span>
          </h1>
          <p className="mt-4 text-base text-gray-400 max-w-2xl font-light">
            An overview of my academic milestones, training timelines, certifications, and future development aspirations.
          </p>
        </div>

        {/* Bio summary cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start mb-20">
          <div className="lg:col-span-2 space-y-6 text-gray-300 font-light leading-relaxed">
            <p>
              I am a builder focused on compiling web and Android applications. From my early days compiling logic in C and C++, to designing relational MySQL databases and reactive Node.js services, I enjoy engineering end-to-end software solutions.
            </p>
            <p>
              My coding philosophy values structured logic and optimization. During my studies, I built systems like the **Bank Locker Management System** utilizing InnoDB row locking to prevent double allocations. Currently, I am focused on the MERN stack and native Android development in my MCA coursework.
            </p>
            <p>
              I am constantly checking off milestones and certifications, aiming to build systems that solve real-world problems.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-center space-x-3 p-4 bg-white/2 rounded-lg border border-white/5">
                <Zap className="w-5 h-5 text-violet-400 shrink-0" />
                <div>
                  <h4 className="text-sm font-semibold text-white">Full-Stack Focus</h4>
                  <p className="text-xs text-gray-400">Experience with React, PHP, Spring Boot.</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-white/2 rounded-lg border border-white/5">
                <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0" />
                <div>
                  <h4 className="text-sm font-semibold text-white">Android Systems</h4>
                  <p className="text-xs text-gray-400">XML layouts, SQLite database, and Firebase integration.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Info Card */}
          <div className="glass-card rounded-2xl p-6 border border-gray-800/80">
            <h3 className="text-base font-bold text-white mb-6 font-display border-b border-gray-800/60 pb-3">
              Developer Profile
            </h3>
            <ul className="space-y-4 text-sm font-mono text-gray-400">
              <li className="flex justify-between">
                <span className="text-gray-500">Location:</span>
                <span className="text-white">Bengaluru, Karnataka</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-500">Role:</span>
                <span className="text-white">MCA Post-Graduate Student</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-500">Databases:</span>
                <span className="text-cyan-400">MySQL, Room, MongoDB</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-500">Languages:</span>
                <span className="text-white">Java, Python, C++, PHP, JS</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Animated vertical timeline */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold font-display text-white mb-10 border-b border-gray-900 pb-3">
            Education & Journey Timeline
          </h2>
          
          <div className="relative border-l border-gray-800 ml-4 md:ml-6 space-y-10 py-2">
            {timeline.map((node, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="relative pl-8 md:pl-10"
              >
                {/* Connecting Dot Icon */}
                <span className="absolute -left-[11px] top-1 flex items-center justify-center w-5 h-5 rounded-full bg-violet-600 border border-gray-950 shadow-[0_0_10px_rgba(139,92,246,0.6)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                </span>

                <div className="glass-card rounded-xl p-5 border border-gray-850 hover:border-violet-500/20 transition-all">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                    <div>
                      <h3 className="text-base font-bold text-white leading-normal">{node.title}</h3>
                      <span className="text-xs text-violet-400 font-mono">{node.institution}</span>
                    </div>
                    <div className="flex flex-col items-start sm:items-end gap-1 shrink-0">
                      <span className="text-[10px] font-mono text-gray-500 bg-gray-900 border border-gray-850 px-2 py-0.5 rounded">
                        {node.period}
                      </span>
                      <span className="text-[9px] font-mono text-cyan-400">{node.score}</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed font-light mt-3">{node.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Achievements & Badges Section */}
        <div>
          <h2 className="text-2xl font-bold font-display text-white mb-8 border-b border-gray-900 pb-3 flex items-center">
            <Award className="w-6 h-6 text-violet-400 mr-2" /> Credentials & Achievements
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {achievements.map((ach, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -2 }}
                className="p-5 bg-white/2 border border-white/5 rounded-xl hover:border-cyan-500/20 transition-all font-mono"
              >
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500/20" /> {ach.name}
                </h4>
                <p className="text-xs text-gray-400 mt-2 font-sans font-light leading-relaxed">{ach.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Badges Subgrid */}
          <div className="p-6 rounded-2xl bg-violet-950/10 border border-violet-900/20">
            <h3 className="text-xs font-bold font-mono text-violet-400 uppercase tracking-widest mb-4">
              Verified Badges
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {badges.map((badge, idx) => (
                <span
                  key={idx}
                  className={`px-3.5 py-1.5 border rounded-lg text-xs font-mono font-semibold tracking-wide ${badge.theme}`}
                >
                  {badge.name}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
