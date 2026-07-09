import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Github, GitFork, Star, Search, Filter, 
  ExternalLink, Code, Layers, Info, Calendar 
} from 'lucide-react';

const GitHub = () => {
  const [search, setSearch] = useState('');
  const [filterLang, setFilterLang] = useState('All');
  const [loading, setLoading] = useState(true);

  // Profile Telemetry Mock
  const profile = {
    username: 'chanduuu8971',
    name: 'Chandrashekhar H R',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200', // Premium generic avatar
    bio: 'Software Engineer | Master of Computer Applications (MCA) Student | Building MERN & PHP Stack Applications',
    location: 'Bengaluru, India',
    followers: 124,
    following: 98,
    publicRepos: 18,
    gists: 4,
    contributionsYTD: 1482
  };

  // Mock Repositories matching Chandrashekhar's real projects + relevant MERN systems
  const repositories = [
    {
      name: 'bank-locker-management',
      description: 'A secure banking locker control workspace supporting token slots allocation, transaction tracking and staff admin dashboards.',
      language: 'PHP',
      stars: 8,
      forks: 2,
      updatedAt: '2 days ago',
      link: 'https://github.com/chanduuu8971/bank-locker-management'
    },
    {
      name: 'ticket-to-trek',
      description: 'A trekking package booking web platform enabling slots exploration, ticket seat reservation, and dynamic seat booking engines.',
      language: 'PHP',
      stars: 12,
      forks: 4,
      updatedAt: '1 week ago',
      link: 'https://github.com/chanduuu8971/ticket-to-trek'
    },
    {
      name: 'portfolio-mern',
      description: 'Futuristic developer workstation portfolio styled like an interactive Unix terminal (DevOS). Built using React, Tailwind v4, Framer Motion, Express, and MongoDB.',
      language: 'JavaScript',
      stars: 19,
      forks: 1,
      updatedAt: 'Just now',
      link: 'https://github.com/chanduuu8971/portfolio-mern'
    },
    {
      name: 'spring-boot-api-gateway',
      description: 'Lightweight microservices authentication proxy gateway orchestrating endpoints mapping and rate throttles.',
      language: 'Java',
      stars: 5,
      forks: 0,
      updatedAt: '3 weeks ago',
      link: 'https://github.com/chanduuu8971/spring-boot-api-gateway'
    },
    {
      name: 'data-analytics-simulations',
      description: 'Accenture Job Simulation exercises including CSV data cleansing pipelines, pandas matrices, and chart plots.',
      language: 'Python',
      stars: 7,
      forks: 2,
      updatedAt: '1 month ago',
      link: 'https://github.com/chanduuu8971/data-analytics-simulations'
    }
  ];

  // Language stats calculations
  const languages = [
    { name: 'JavaScript', percent: 45, color: 'bg-yellow-500' },
    { name: 'PHP', percent: 30, color: 'bg-indigo-500' },
    { name: 'Java', percent: 15, color: 'bg-orange-500' },
    { name: 'Python', percent: 10, color: 'bg-blue-500' }
  ];

  // Generate mock contribution grid data (53 weeks * 7 days)
  const generateContributionData = () => {
    const data = [];
    const states = ['none', 'low', 'medium', 'high', 'max'];
    for (let i = 0; i < 365; i++) {
      // Deterministic but random looking weights
      const val = Math.sin(i / 15) * Math.cos(i / 8);
      let state = 'none';
      if (val > 0.6) state = 'max';
      else if (val > 0.2) state = 'high';
      else if (val > -0.2) state = 'medium';
      else if (val > -0.6) state = 'low';
      data.push(state);
    }
    return data;
  };

  const contributionGrid = generateContributionData();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const filteredRepos = repositories.filter(repo => {
    const matchesSearch = repo.name.toLowerCase().includes(search.toLowerCase()) || 
                          repo.description.toLowerCase().includes(search.toLowerCase());
    const matchesLang = filterLang === 'All' || repo.language === filterLang;
    return matchesSearch && matchesLang;
  });

  const getLangBadgeColor = (lang) => {
    switch (lang) {
      case 'JavaScript': return 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20';
      case 'PHP': return 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20';
      case 'Java': return 'bg-orange-500/10 text-orange-400 border border-orange-500/20';
      case 'Python': return 'bg-blue-500/10 text-blue-400 border border-blue-500/20';
      default: return 'bg-gray-500/10 text-gray-400 border border-gray-500/20';
    }
  };

  const getContributionColor = (state) => {
    // Return green shades mapping terminal theme variables
    switch (state) {
      case 'max': return 'bg-emerald-400';
      case 'high': return 'bg-emerald-600';
      case 'medium': return 'bg-emerald-800';
      case 'low': return 'bg-emerald-950';
      default: return 'bg-gray-900/80';
    }
  };

  return (
    <div className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Decorative Glow */}
      <div className="glow-spot-2 top-20 right-10 opacity-60"></div>

      <div className="relative z-10">
        
        {/* Title */}
        <div className="mb-12 text-center md:text-left">
          <h1 className="text-4xl font-extrabold font-display text-white tracking-tight sm:text-5xl">
            GitHub{' '}
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Telemetry
            </span>
          </h1>
          <p className="mt-4 text-base text-gray-400 max-w-2xl font-light">
            Live developer platform status logs, code repository listings, and dynamic language statistics.
          </p>
        </div>

        {loading ? (
          <div className="space-y-8 animate-pulse">
            <div className="glass-card rounded-2xl p-6 h-36"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-96"></div>
          </div>
        ) : (
          <div className="space-y-8">
            
            {/* Profile Overview Card */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card rounded-2xl p-6 border border-gray-800/80 flex flex-col md:flex-row items-center md:items-start gap-6"
            >
              <div className="w-20 h-20 rounded-2xl bg-gray-900 border border-gray-800 overflow-hidden shrink-0 flex items-center justify-center relative">
                <Github className="w-10 h-10 text-violet-400" />
              </div>

              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <div>
                    <h2 className="text-xl font-bold text-white font-display">{profile.name}</h2>
                    <span className="text-xs text-violet-400 font-mono">@{profile.username}</span>
                  </div>
                  <a 
                    href={`https://github.com/${profile.username}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center mx-auto md:mx-0 px-3.5 py-1.5 bg-gray-900 hover:bg-gray-800 border border-gray-800 hover:border-gray-750 text-xs font-mono font-semibold rounded-lg text-white transition-colors"
                  >
                    View GitHub Profile <ExternalLink className="w-3 h-3 ml-1.5" />
                  </a>
                </div>
                <p className="text-sm text-gray-400 mt-3 font-light leading-relaxed">
                  {profile.bio}
                </p>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-2 mt-4 text-xs font-mono text-gray-500">
                  <span>Location: <strong className="text-gray-300">{profile.location}</strong></span>
                  <span>Public Repos: <strong className="text-gray-300">{profile.publicRepos}</strong></span>
                  <span>Followers: <strong className="text-gray-300">{profile.followers}</strong></span>
                </div>
              </div>
            </motion.div>

            {/* Grid Area: Graph + Languages */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Contribution Graph */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="lg:col-span-2 glass-card rounded-2xl p-6 border border-gray-800/80 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-sm font-bold font-mono text-gray-400 uppercase tracking-wider mb-6 flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-violet-400" /> code_commits_telemetry.log
                  </h3>

                  {/* Simulated contribution matrix */}
                  <div className="overflow-x-auto pb-4 no-scrollbar">
                    <div className="flex gap-[3px] min-w-[500px]">
                      {/* Grid representation */}
                      <div className="grid grid-flow-col grid-rows-7 gap-[3px] w-full">
                        {contributionGrid.map((state, idx) => (
                          <div 
                            key={idx}
                            className={`w-2.5 h-2.5 rounded-[2px] transition-colors hover:scale-125 ${getContributionColor(state)}`}
                            title={`Contribution index: ${idx}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center text-[10px] font-mono text-gray-500 mt-4 border-t border-gray-850 pt-3">
                  <span>Yearly Activity: {profile.contributionsYTD} commits</span>
                  <div className="flex items-center space-x-1.5">
                    <span>Less</span>
                    <span className="w-2.5 h-2.5 rounded-[2px] bg-gray-900"></span>
                    <span className="w-2.5 h-2.5 rounded-[2px] bg-emerald-950"></span>
                    <span className="w-2.5 h-2.5 rounded-[2px] bg-emerald-800"></span>
                    <span className="w-2.5 h-2.5 rounded-[2px] bg-emerald-600"></span>
                    <span className="w-2.5 h-2.5 rounded-[2px] bg-emerald-400"></span>
                    <span>More</span>
                  </div>
                </div>
              </motion.div>

              {/* Language Statistics */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-card rounded-2xl p-6 border border-gray-800/80 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-sm font-bold font-mono text-gray-400 uppercase tracking-wider mb-6 flex items-center">
                    <Code className="w-4 h-4 mr-2 text-cyan-400" /> language_index.json
                  </h3>
                  
                  <div className="space-y-4">
                    {languages.map(lang => (
                      <div key={lang.name}>
                        <div className="flex justify-between text-xs font-mono mb-1.5">
                          <span className="text-gray-300 font-medium">{lang.name}</span>
                          <span className="text-gray-500">{lang.percent}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-gray-950/80 rounded-full overflow-hidden border border-white/[0.01]">
                          <div className={`h-full rounded-full ${lang.color}`} style={{ width: `${lang.percent}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-[10px] font-mono text-gray-600 border-t border-gray-850 pt-3 mt-6">
                  Compiled from active git sources.
                </div>
              </motion.div>

            </div>

            {/* Repository search and card lists */}
            <div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h3 className="text-lg font-bold text-white font-display">Repositories</h3>
                
                {/* Search Bar */}
                <div className="flex items-center space-x-2 w-full sm:w-auto">
                  <div className="relative flex-1 sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input 
                      type="text" 
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search repositories..."
                      className="w-full pl-9 pr-4 py-1.5 text-xs bg-gray-950 border border-gray-850 rounded-lg text-white focus:outline-none focus:border-violet-500 placeholder-gray-600"
                    />
                  </div>

                  {/* Lang filter */}
                  <select 
                    value={filterLang}
                    onChange={(e) => setFilterLang(e.target.value)}
                    className="px-2 py-1.5 text-xs bg-gray-950 border border-gray-850 rounded-lg text-gray-400 focus:outline-none focus:border-violet-500"
                  >
                    <option value="All">All Languages</option>
                    <option value="PHP">PHP</option>
                    <option value="JavaScript">JavaScript</option>
                    <option value="Java">Java</option>
                    <option value="Python">Python</option>
                  </select>
                </div>
              </div>

              {/* Repos Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredRepos.length > 0 ? (
                  filteredRepos.map((repo, idx) => (
                    <motion.div 
                      key={repo.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="glass-card rounded-xl p-5 border border-gray-800/80 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-sm font-bold text-white font-mono hover:text-violet-400 transition-colors">
                            <a href={repo.link} target="_blank" rel="noopener noreferrer">
                              {repo.name}
                            </a>
                          </h4>
                          <span className={`text-[9px] px-2 py-0.5 rounded font-mono ${getLangBadgeColor(repo.language)}`}>
                            {repo.language}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 leading-relaxed font-light mb-4">
                          {repo.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between text-[10px] font-mono text-gray-500 border-t border-gray-850/50 pt-3 mt-2">
                        <div className="flex items-center space-x-3">
                          <span className="flex items-center"><Star className="w-3.5 h-3.5 mr-1 text-amber-500/80" /> {repo.stars}</span>
                          <span className="flex items-center"><GitFork className="w-3.5 h-3.5 mr-1 text-cyan-500/80" /> {repo.forks}</span>
                        </div>
                        <span>Updated {repo.updatedAt}</span>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-2 text-center py-12 bg-gray-950/20 border border-gray-900 rounded-xl">
                    <Info className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                    <p className="text-xs text-gray-500 font-mono">No matching repositories found.</p>
                  </div>
                )}
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default GitHub;
