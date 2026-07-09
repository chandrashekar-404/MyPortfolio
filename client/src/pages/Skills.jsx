import React from 'react';
import { motion } from 'framer-motion';
import { Layout, Server, Database, Smartphone, Cloud, Info } from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Frontend Development',
      icon: <Layout className="w-5 h-5 text-violet-400" />,
      skills: [
        { name: 'React.js', level: 90, tooltip: 'State models, Context APIs, Hooks architectures' },
        { name: 'JavaScript (ES6+)', level: 85, tooltip: 'Asynchronous actions, closures, arrays manipulation' },
        { name: 'HTML5 & Semantics', level: 95, tooltip: 'Accessible grids, SEO compliant structures' },
        { name: 'CSS3 / Grid / Flex', level: 90, tooltip: 'Responsive layouts, custom variables layout' },
        { name: 'Tailwind CSS', level: 92, tooltip: 'Utility-first variables, v4 components styling' }
      ]
    },
    {
      title: 'Backend Engineering',
      icon: <Server className="w-5 h-5 text-cyan-400" />,
      skills: [
        { name: 'Node.js', level: 85, tooltip: 'Async runtimes, filesystem APIs, stream pipes' },
        { name: 'Express.js', level: 88, tooltip: 'Routing gateway, error catch handlers middleware' },
        { name: 'REST APIs', level: 90, tooltip: 'JSON contracts, endpoint versioning structures' },
        { name: 'JWT Authentication', level: 85, tooltip: 'Secure token signing, state payload cookies' }
      ]
    },
    {
      title: 'Database Paradigms',
      icon: <Database className="w-5 h-5 text-emerald-400" />,
      skills: [
        { name: 'MongoDB / Mongoose', level: 82, tooltip: 'Document stores, indexes mapping, schemas validation' },
        { name: 'MySQL', level: 80, tooltip: 'Relational mapping joins, InnoDB locking queries' }
      ]
    },
    {
      title: 'Android Development',
      icon: <Smartphone className="w-5 h-5 text-amber-400" />,
      skills: [
        { name: 'Java', level: 82, tooltip: 'Object Oriented inheritance, threading buffers' },
        { name: 'Android Studio', level: 80, tooltip: 'XML layouts compilation, SDK tools debugging' },
        { name: 'Firebase', level: 75, tooltip: 'Real-time database records, auth login pipelines' }
      ]
    },
    {
      title: 'Cloud & Tooling',
      icon: <Cloud className="w-5 h-5 text-fuchsia-400" />,
      skills: [
        { name: 'AWS (S3 / EC2)', level: 70, tooltip: 'Asset storage, virtual compute machine logs' },
        { name: 'Git & Version Control', level: 90, tooltip: 'Rebase, branch flow checkout registers' },
        { name: 'GitHub', level: 92, tooltip: 'Repository sync actions pipelines' },
        { name: 'Docker', level: 72, tooltip: 'Container containerization, dockerfile mappings' }
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
            My{' '}
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Technical Stack
            </span>
          </h1>
          <p className="mt-4 text-base text-gray-400 max-w-2xl font-light">
            A granular register of languages, system architectures, database paradigms, and tools I leverage to compile software.
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
              transition={{ duration: 0.4, delay: catIndex * 0.1 }}
              className="glass-card rounded-2xl p-6 border border-gray-800/80 flex flex-col justify-between"
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center space-x-3 mb-6 border-b border-gray-850 pb-4 select-none">
                  <div className="p-2.5 rounded-lg bg-gray-900 border border-gray-800">
                    {category.icon}
                  </div>
                  <h3 className="text-sm font-bold text-white font-display">
                    {category.title}
                  </h3>
                </div>

                {/* Skill List */}
                <div className="space-y-4">
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="relative group">
                      <div className="flex justify-between items-center text-xs font-mono mb-1.5 cursor-help">
                        <span className="text-gray-300 font-medium flex items-center gap-1">
                          {skill.name}
                          <Info className="w-3 h-3 text-gray-600 group-hover:text-violet-400 transition-colors" />
                        </span>
                        <span className="text-gray-500">{skill.level}%</span>
                      </div>
                      
                      {/* Skill Bar Background */}
                      <div className="w-full h-1.5 rounded-full bg-gray-950/80 overflow-hidden border border-white/[0.02]">
                        {/* Skill Bar Fill */}
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.1 }}
                          className="h-full progress-bar-fill rounded-full"
                        />
                      </div>

                      {/* Tooltip Overlay */}
                      <div className="absolute z-20 bottom-full left-0 mb-2.5 hidden group-hover:block bg-gray-950 border border-gray-800 text-[10px] text-gray-300 px-2.5 py-1.5 rounded-lg shadow-xl font-mono whitespace-nowrap select-none">
                        <span className="text-cyan-400 font-bold">&raquo; </span>{skill.tooltip}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skill Footnote */}
              <div className="mt-6 pt-4 border-t border-gray-850 text-[9px] font-mono text-gray-650 flex justify-between select-none">
                <span>INDEX: 0{catIndex + 1}</span>
                <span>STATE: ACTIVE</span>
              </div>
            </motion.div>
          ))}
        </div>
        
      </div>
    </div>
  );
};

export default Skills;
