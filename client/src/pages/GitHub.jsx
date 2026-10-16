import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Github, ExternalLink, Code, Layers, Search
} from 'lucide-react';

const GitHub = () => {
  const [search, setSearch] = useState('');
  const [filterLang, setFilterLang] = useState('All');

  // Verified Profile Data
  const profile = {
    username: 'chandrashekar-404',
    name: 'Chandrashekhar H R',
    bio: 'MCA Student @ BMSIT&M | Building with MERN Stack, Flutter, Java & Python | Targeting Data Science, AI/ML & Software Development',
    location: 'Bengaluru, Karnataka',
    degree: 'MCA (2025–2027), BMSIT&M (VTU)',
    undergrad: 'BCA (CGPA: 7.89)',
    profileUrl: 'https://github.com/chandrashekar-404'
  };

  // Repositories matching the 3 verified projects
  const repositories = [
    {
      name: 'cissanmart',
      title: 'CissanMart — Field to Family',
      description: 'A direct farmer-to-consumer agricultural marketplace with separate Flutter mobile apps for buyers and farmers, alongside a React web admin interface and Node/Express backend.',
      language: 'Dart & JavaScript',
      langCategory: 'Dart',
      tags: ['Flutter', 'MERN Stack', 'Socket.IO', 'Ongoing'],
      link: 'https://github.com/chandrashekar-404'
    },
    {
      name: 'monic-ai-assistant',
      title: 'MONIC — AI Assistant & Automation',
      description: 'A personal AI assistant project engineered to automate everyday digital tasks using autonomous AI agents. Features Python automation logic and an intuitive Flutter Android mobile UI.',
      language: 'Python & Dart',
      langCategory: 'Python',
      tags: ['Python', 'AI Agents', 'Automation', 'Flutter'],
      link: 'https://github.com/chandrashekar-404'
    },
    {
      name: 'phantom-sos',
      title: 'Phantom SOS',
      description: 'A full-stack emergency distress application developed using the MERN stack. Integrates digital media steganography techniques to embed critical SOS indicators covertly in media.',
      language: 'JavaScript',
      langCategory: 'JavaScript',
      tags: ['MERN Stack', 'Steganography', 'Security', 'React'],
      link: 'https://github.com/chandrashekar-404'
    }
  ];

  // Language stack breakdown
  const languages = [
    { name: 'JavaScript / Node', percent: 40, color: 'bg-yellow-400' },
    { name: 'Dart / Flutter', percent: 35, color: 'bg-cyan-400' },
    { name: 'Python', percent: 25, color: 'bg-blue-400' }
  ];

  const filteredRepos = repositories.filter(repo => {
    const matchesSearch = repo.name.toLowerCase().includes(search.toLowerCase()) ||
                          repo.description.toLowerCase().includes(search.toLowerCase()) ||
                          repo.language.toLowerCase().includes(search.toLowerCase());
    if (filterLang === 'All') return matchesSearch;
    return matchesSearch && repo.langCategory === filterLang;
  });

  return (
    <div className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Background Glow */}
      <div className="glow-spot-1 top-20 right-10 opacity-60"></div>

      <div className="relative z-10">
        
        {/* Header */}
        <div className="mb-12 text-center md:text-left">
          <h1 className="text-4xl font-extrabold font-display text-white tracking-tight sm:text-5xl">
            GitHub &{' '}
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Source Code
            </span>
          </h1>
          <p className="mt-4 text-base text-gray-400 max-w-2xl font-light">
            Overview of technical repositories, source code implementations, and primary language stacks from verified projects.
          </p>
        </div>

        {/* Profile Card */}
        <div className="glass-card rounded-2xl p-6 sm:p-8 border border-gray-800/80 mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 text-center sm:text-left">
            {/* Tech Monogram Avatar */}
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-violet-600 via-fuchsia-600 to-cyan-500 p-0.5 shadow-lg shrink-0">
              <div className="w-full h-full bg-gray-950 rounded-2xl flex items-center justify-center">
                <span className="font-display font-black text-2xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
                  CH
                </span>
              </div>
            </div>

            <div>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h2 className="text-xl font-bold font-display text-white">{profile.name}</h2>
                <span className="text-xs font-mono text-violet-400 bg-violet-950/40 px-2.5 py-0.5 rounded-full border border-violet-800/40">
                  {profile.username}
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-2 max-w-xl leading-relaxed font-light">
                {profile.bio}
              </p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mt-3 text-xs font-mono text-gray-500">
                <span>📍 {profile.location}</span>
                <span>🎓 {profile.degree}</span>
                <span>⭐ {profile.undergrad}</span>
              </div>
            </div>
          </div>

          <a
            href={profile.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg text-xs font-mono font-semibold transition-colors shrink-0 shadow-lg shadow-violet-500/20"
          >
            <Github className="w-4 h-4 mr-2" /> Open GitHub Profile
          </a>
        </div>

        {/* Language Breakdown */}
        <div className="glass-card rounded-2xl p-6 border border-gray-800/80 mb-10">
          <h3 className="text-xs font-mono font-semibold text-gray-400 uppercase tracking-wider mb-4 flex items-center">
            <Code className="w-4 h-4 mr-2 text-cyan-400" /> Technology Stacks in Projects
          </h3>

          <div className="w-full h-3 rounded-full bg-gray-950 flex overflow-hidden border border-gray-900 mb-4">
            {languages.map(lang => (
              <div
                key={lang.name}
                style={{ width: `${lang.percent}%` }}
                className={`h-full ${lang.color} transition-all duration-500`}
                title={`${lang.name}: ${lang.percent}%`}
              />
            ))}
          </div>

          <div className="flex flex-wrap gap-4 text-xs font-mono">
            {languages.map(lang => (
              <div key={lang.name} className="flex items-center space-x-1.5">
                <span className={`w-2 h-2 rounded-full ${lang.color}`}></span>
                <span className="text-gray-300">{lang.name}</span>
                <span className="text-gray-500">{lang.percent}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter repositories..."
              className="w-full pl-10 pr-4 py-2 text-xs bg-gray-950 border border-gray-850 rounded-xl text-white focus:outline-none focus:border-violet-500 placeholder-gray-600 font-mono"
            />
          </div>

          <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
            {['All', 'Dart', 'JavaScript', 'Python'].map(lang => (
              <button
                key={lang}
                onClick={() => setFilterLang(lang)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                  filterLang === lang
                    ? 'bg-violet-600 text-white'
                    : 'bg-gray-900 text-gray-400 hover:text-white border border-gray-850'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        {/* Repositories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredRepos.map((repo) => (
            <div
              key={repo.name}
              className="glass-card rounded-2xl p-6 border border-gray-800/80 flex flex-col justify-between hover:border-violet-500/30 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold font-mono text-violet-400 flex items-center">
                    <Code className="w-4 h-4 mr-2 text-gray-500" /> {repo.name}
                  </span>
                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/30 px-2 py-0.5 rounded border border-cyan-800/30">
                    {repo.language}
                  </span>
                </div>

                <h4 className="text-xs font-bold text-white mb-2">{repo.title}</h4>
                <p className="text-xs text-gray-400 font-light leading-relaxed mb-4">
                  {repo.description}
                </p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {repo.tags.map(tag => (
                    <span 
                      key={tag}
                      className="text-[9px] font-mono px-2 py-0.5 bg-gray-950 border border-gray-850 text-gray-400 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-900 pt-3 flex justify-between items-center text-xs font-mono">
                <span className="text-gray-500 text-[10px]">Verified Project</span>
                <a
                  href={repo.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-violet-400 hover:text-white transition-colors inline-flex items-center text-[11px]"
                >
                  GitHub <ExternalLink className="w-3.5 h-3.5 ml-1" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default GitHub;
