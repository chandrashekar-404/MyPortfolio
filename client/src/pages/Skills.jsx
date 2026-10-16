import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Layers, Cpu, MonitorSmartphone, Users } from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Programming Languages',
      subtitle: 'Core programming syntax & languages',
      icon: <Code2 className="w-5 h-5 text-violet-400" />,
      skills: [
        { name: 'C', desc: 'Procedural programming, structured logic, and foundational memory concepts' },
        { name: 'C++', desc: 'Object-oriented structures, algorithmic efficiency, and standard library concepts' },
        { name: 'Python', desc: 'Scripting, backend automation workflows, and AI agent logic' },
        { name: 'Java', desc: 'Object-oriented programming, classes, inheritance, and application logic' },
        { name: 'JavaScript', desc: 'Modern ES6+ syntax, asynchronous operations, React components, and Node.js' }
      ]
    },
    {
      title: 'Computer Science Fundamentals',
      subtitle: 'Core engineering concepts',
      icon: <Cpu className="w-5 h-5 text-emerald-400" />,
      skills: [
        { name: 'Object-Oriented Programming (OOP)', desc: 'Encapsulation, inheritance, polymorphism, and abstraction principles' },
        { name: 'Data Structures & Algorithms (DSA)', desc: 'Searching, sorting, linear & non-linear data structures, and computational thinking' },
        { name: 'Database Management Systems (DBMS)', desc: 'Relational data modeling, SQL queries, Oracle PL/SQL, and normalization' }
      ]
    },
    {
      title: 'Frameworks & Technologies',
      subtitle: 'Web, mobile & enterprise technologies',
      icon: <Layers className="w-5 h-5 text-cyan-400" />,
      skills: [
        { name: 'Spring Boot', desc: 'Modular Java enterprise backend framework for building RESTful microservices' },
        { name: 'React.js', desc: 'Component-driven frontends, reactive state management, and modern web architecture' },
        { name: 'MongoDB', desc: 'NoSQL document-oriented databases, schemas, indexes, and aggregation queries' },
        { name: 'Flutter SDK', desc: 'Cross-platform UI toolkit for building natively compiled mobile applications' },
        { name: 'Dio', desc: 'Powerful HTTP client for Dart/Flutter supporting interceptors, global config, and timeouts' }
      ]
    },
    {
      title: 'Development Paradigms & Ecosystems',
      subtitle: 'Application platforms & environments',
      icon: <MonitorSmartphone className="w-5 h-5 text-amber-400" />,
      skills: [
        { name: 'MERN Stack', desc: 'Full-stack engineering combining MongoDB, Express.js, React, and Node.js' },
        { name: 'LAMP Stack', desc: 'Linux, Apache, MySQL, and PHP server stack environment' },
        { name: 'Flutter Development', desc: 'Cross-platform mobile application engineering for Android and iOS' },
        { name: 'Android using Java', desc: 'Native Android application development using Java in Android Studio' }
      ]
    },
    {
      title: 'Soft Skills & Methodologies',
      subtitle: 'Professional problem-solving & collaboration',
      icon: <Users className="w-5 h-5 text-fuchsia-400" />,
      skills: [
        { name: 'Communication Skills', desc: 'Clear articulation of technical ideas, collaborative discussions, and active listening' },
        { name: 'Problem Solving Techniques', desc: 'Structured analytical thinking, systematic debugging, and algorithmic problem decomposition' }
      ]
    }
  ];

  return (
    <div className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Decorative Glow */}
      <div className="glow-spot-1 top-20 left-10 opacity-70"></div>

      <div className="relative z-10">
        {/* Title */}
        <div className="mb-12 text-center md:text-left">
          <h1 className="text-4xl font-extrabold font-display text-white tracking-tight sm:text-5xl">
            Technical{' '}
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Skills & Competencies
            </span>
          </h1>
          <p className="mt-4 text-base text-gray-400 max-w-2xl font-light leading-relaxed">
            Organized categories of programming languages, computer science fundamentals, frameworks, and development environments verified from my latest resume.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: catIndex * 0.08 }}
              className="glass-card rounded-2xl p-6 border border-gray-800/80 flex flex-col justify-between hover:border-violet-500/30 transition-all"
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center space-x-3 mb-5 border-b border-gray-850 pb-4 select-none">
                  <div className="p-2.5 rounded-lg bg-gray-900 border border-gray-800 shrink-0">
                    {category.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white font-display leading-tight">
                      {category.title}
                    </h3>
                    <span className="text-[10px] text-gray-500 font-mono block mt-0.5">
                      {category.subtitle}
                    </span>
                  </div>
                </div>

                {/* Skill Items */}
                <div className="space-y-3">
                  {category.skills.map((skill) => (
                    <div 
                      key={skill.name} 
                      className="p-2.5 rounded-xl bg-gray-950/60 border border-gray-900 hover:border-gray-800 transition-colors"
                    >
                      <span className="text-xs font-mono font-semibold text-gray-200 block">
                        {skill.name}
                      </span>
                      <p className="text-[11px] text-gray-400 font-light mt-1 leading-relaxed">
                        {skill.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Category Footer */}
              <div className="mt-6 pt-3 border-t border-gray-850/60 text-[9px] font-mono text-gray-500 flex justify-between select-none">
                <span>SECTION: 0{catIndex + 1}</span>
                <span className="text-violet-400">RESUME VERIFIED</span>
              </div>
            </motion.div>
          ))}
        </div>
        
      </div>
    </div>
  );
};

export default Skills;
