import React, { useState, useEffect } from 'react';
import { 
  adminService, projectService, blogService, contactService 
} from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Lock, Settings, Folder, BookOpen, Mail, BarChart2, 
  Plus, Edit, Trash, LogOut, CheckCircle, AlertCircle, X, ShieldAlert 
} from 'lucide-react';

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState('analytics');

  // Dashboard Data State
  const [analytics, setAnalytics] = useState(null);
  const [projects, setProjects] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [messages, setMessages] = useState([]);

  // Modals state
  const [projectForm, setProjectForm] = useState(null); // null, 'create', 'edit'
  const [blogForm, setBlogForm] = useState(null); // null, 'create', 'edit'
  const [selectedId, setSelectedId] = useState('');

  // Forms fields
  const [projectFields, setProjectFields] = useState({
    title: '', description: '', tags: '', githubLink: '', liveLink: '',
    image: '', architecture: '', featured: false, features: '',
    technologies: '', architectureDiagram: '', folderStructure: '',
    databaseSchema: '', challengesFaced: '', problemsSolved: '',
    lessonsLearned: '', timeline: '', futureImprovements: ''
  });

  const [blogFields, setBlogFields] = useState({
    title: '', summary: '', content: '', tags: '', image: '', published: true
  });

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      if (token) {
        await adminService.verify();
        setIsAuthenticated(true);
        loadDashboardData();
      } else {
        setIsAuthenticated(false);
      }
    } catch (e) {
      setIsAuthenticated(false);
      localStorage.removeItem('adminToken');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setLoginError('');
      await adminService.login({ username, password });
      setIsAuthenticated(true);
      loadDashboardData();
    } catch (err) {
      setLoginError(err.response?.data?.message || 'Authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    adminService.logout();
    setIsAuthenticated(false);
    setAnalytics(null);
    setProjects([]);
    setBlogs([]);
    setMessages([]);
  };

  const loadDashboardData = async () => {
    try {
      const [analyticsData, projList, blogList, msgList] = await Promise.all([
        adminService.getAnalytics(),
        projectService.getAll(),
        blogService.getAdminBlogs(),
        contactService.getAll()
      ]);
      setAnalytics(analyticsData);
      setProjects(projList);
      setBlogs(blogList);
      setMessages(msgList);
    } catch (err) {
      console.error('Failed to load dashboard statistics:', err);
    }
  };

  // PROJECT HANDLERS
  const openProjectCreate = () => {
    setProjectFields({
      title: '', description: '', tags: '', githubLink: '', liveLink: '',
      image: '', architecture: 'MERN Stack', featured: false, features: '',
      technologies: '', architectureDiagram: '', folderStructure: '',
      databaseSchema: '', challengesFaced: '', problemsSolved: '',
      lessonsLearned: '', timeline: '', futureImprovements: ''
    });
    setProjectForm('create');
  };

  const openProjectEdit = (proj) => {
    setSelectedId(proj._id);
    setProjectFields({
      title: proj.title || '',
      description: proj.description || '',
      tags: proj.tags ? proj.tags.join(', ') : '',
      githubLink: proj.githubLink || '',
      liveLink: proj.liveLink || '',
      image: proj.image || '',
      architecture: proj.architecture || 'MERN Stack',
      featured: proj.featured || false,
      features: proj.features ? proj.features.join('\n') : '',
      technologies: proj.technologies ? proj.technologies.join(', ') : '',
      architectureDiagram: proj.architectureDiagram || '',
      folderStructure: proj.folderStructure || '',
      databaseSchema: proj.databaseSchema || '',
      challengesFaced: proj.challengesFaced || '',
      problemsSolved: proj.problemsSolved || '',
      lessonsLearned: proj.lessonsLearned || '',
      timeline: proj.timeline || '',
      futureImprovements: proj.futureImprovements ? proj.futureImprovements.join('\n') : ''
    });
    setProjectForm('edit');
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...projectFields,
      tags: projectFields.tags.split(',').map(s => s.trim()).filter(Boolean),
      technologies: projectFields.technologies.split(',').map(s => s.trim()).filter(Boolean),
      features: projectFields.features.split('\n').map(s => s.trim()).filter(Boolean),
      futureImprovements: projectFields.futureImprovements.split('\n').map(s => s.trim()).filter(Boolean)
    };

    try {
      if (projectForm === 'create') {
        await projectService.create(payload);
      } else {
        await projectService.update(selectedId, payload);
      }
      setProjectForm(null);
      loadDashboardData();
    } catch (err) {
      alert('Error saving project documents.');
    }
  };

  const deleteProject = async (id) => {
    if (!window.confirm('Delete project document forever?')) return;
    try {
      await projectService.delete(id);
      loadDashboardData();
    } catch (err) {
      alert('Could not delete project.');
    }
  };

  // BLOG HANDLERS
  const openBlogCreate = () => {
    setBlogFields({
      title: '', summary: '', content: '', tags: '', image: '', published: true
    });
    setBlogForm('create');
  };

  const openBlogEdit = (blog) => {
    setSelectedId(blog._id);
    setBlogFields({
      title: blog.title || '',
      summary: blog.summary || '',
      content: blog.content || '',
      tags: blog.tags ? blog.tags.join(', ') : '',
      image: blog.image || '',
      published: blog.published !== false
    });
    setBlogForm('edit');
  };

  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...blogFields,
      tags: blogFields.tags.split(',').map(s => s.trim()).filter(Boolean)
    };

    try {
      if (blogForm === 'create') {
        await blogService.create(payload);
      } else {
        await blogService.update(selectedId, payload);
      }
      setBlogForm(null);
      loadDashboardData();
    } catch (err) {
      alert('Error saving blog posts.');
    }
  };

  const deleteBlog = async (id) => {
    if (!window.confirm('Delete blog entry forever?')) return;
    try {
      await blogService.delete(id);
      loadDashboardData();
    } catch (err) {
      alert('Could not delete blog.');
    }
  };

  // MESSAGE HANDLERS
  const deleteMessage = async (id) => {
    if (!window.confirm('Remove message?')) return;
    try {
      await contactService.delete(id);
      loadDashboardData();
    } catch (err) {
      alert('Could not delete message logs.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-140px)] font-mono text-xs">
        <div className="flex flex-col items-center space-y-4">
          <Settings className="w-8 h-8 text-violet-400 animate-spin" />
          <span className="text-gray-500">Decrypting dashboard session...</span>
        </div>
      </div>
    );
  }

  // LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-140px)] px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-sm glass-card rounded-2xl p-6 border border-gray-800/80 relative"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 to-cyan-500" />
          
          <div className="text-center mb-6">
            <div className="inline-flex p-3 bg-violet-950/20 border border-violet-500/20 rounded-xl text-violet-400 mb-3">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-white font-display">Security Verification</h2>
            <p className="text-xs text-gray-500 font-mono mt-1">Admin access token required.</p>
          </div>

          {loginError && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center space-x-2">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[10px] font-mono text-gray-400 uppercase mb-1">Username</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Enter admin ID"
                className="w-full px-3 py-2 text-xs bg-gray-900 border border-gray-850 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-violet-500"
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono text-gray-400 uppercase mb-1">Key Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full px-3 py-2 text-xs bg-gray-900 border border-gray-850 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-violet-500"
              />
            </div>

            <button 
              type="submit"
              className="w-full py-2.5 rounded-lg bg-violet-600 hover:bg-violet-750 text-white font-semibold text-xs font-mono transition-all cursor-pointer shadow-[0_0_12px_rgba(139,92,246,0.3)]"
            >
              Verify & Decrypt
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  // ADMIN DASHBOARD
  return (
    <div className="relative py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto min-h-[calc(100vh-140px)]">
      <div className="glow-spot-1 top-10 left-10 opacity-40"></div>

      <div className="relative z-10">
        
        {/* Header toolbar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-900 pb-4 mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold font-display text-white tracking-tight">
              DevOS{' '}
              <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                Control Center
              </span>
            </h1>
            <p className="text-xs text-gray-500 font-mono mt-1">Logged in as admin // session stable</p>
          </div>

          <button 
            onClick={handleLogout}
            className="inline-flex items-center px-3.5 py-1.5 bg-red-950/20 border border-red-900/40 hover:border-red-800 text-xs font-mono font-semibold rounded-lg text-red-400 hover:text-white transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5 mr-2" /> Log out
          </button>
        </div>

        {/* Workspace Tab Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          
          {/* Left panel selector */}
          <div className="lg:col-span-1 glass-card rounded-xl p-3 border border-gray-800/80 space-y-1">
            <button
              onClick={() => setActiveTab('analytics')}
              className={`w-full flex items-center space-x-2.5 px-3.5 py-2.5 rounded-lg text-xs font-mono transition-colors ${
                activeTab === 'analytics' ? 'bg-violet-600/10 text-violet-400 border border-violet-500/20' : 'text-gray-500 hover:text-gray-300 hover:bg-gray-900/40'
              }`}
            >
              <BarChart2 className="w-4 h-4" /> <span>Analytics</span>
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className={`w-full flex items-center space-x-2.5 px-3.5 py-2.5 rounded-lg text-xs font-mono transition-colors ${
                activeTab === 'projects' ? 'bg-violet-600/10 text-violet-400 border border-violet-500/20' : 'text-gray-500 hover:text-gray-300 hover:bg-gray-900/40'
              }`}
            >
              <Folder className="w-4 h-4" /> <span>Projects Manager</span>
            </button>
            <button
              onClick={() => setActiveTab('blogs')}
              className={`w-full flex items-center space-x-2.5 px-3.5 py-2.5 rounded-lg text-xs font-mono transition-colors ${
                activeTab === 'blogs' ? 'bg-violet-600/10 text-violet-400 border border-violet-500/20' : 'text-gray-500 hover:text-gray-300 hover:bg-gray-900/40'
              }`}
            >
              <BookOpen className="w-4 h-4" /> <span>Blogs Manager</span>
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className={`w-full flex items-center space-x-2.5 px-3.5 py-2.5 rounded-lg text-xs font-mono transition-colors ${
                activeTab === 'messages' ? 'bg-violet-600/10 text-violet-400 border border-violet-500/20' : 'text-gray-500 hover:text-gray-300 hover:bg-gray-900/40'
              }`}
            >
              <Mail className="w-4 h-4" /> <span>Messages ({messages.length})</span>
            </button>
          </div>

          {/* Right Content Panel */}
          <div className="lg:col-span-3">
            
            {/* ANALYTICS VIEW */}
            {activeTab === 'analytics' && analytics && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                
                {/* Highlights count row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { label: 'Visitors', value: analytics.counts.visitors, color: 'text-cyan-400' },
                    { label: 'Messages', value: analytics.counts.messages, color: 'text-violet-400' },
                    { label: 'Projects', value: analytics.counts.projects, color: 'text-fuchsia-400' },
                    { label: 'Blogs', value: analytics.counts.blogs, color: 'text-emerald-400' }
                  ].map((card, idx) => (
                    <div key={idx} className="glass-card rounded-xl p-4 border border-gray-850 font-mono text-center">
                      <span className="text-[10px] text-gray-500 uppercase block mb-1">{card.label}</span>
                      <span className={`text-2xl font-bold ${card.color}`}>{card.value}</span>
                    </div>
                  ))}
                </div>

                {/* Popular paths summary */}
                <div className="glass-card rounded-xl p-5 border border-gray-800/80">
                  <h3 className="text-sm font-bold font-mono text-gray-400 uppercase tracking-wider mb-4 border-b border-gray-900 pb-2">
                    Popular Navigation Routes (Path Analytics)
                  </h3>
                  <div className="space-y-3 font-mono text-xs">
                    {analytics.charts.popularPaths.map((path, idx) => (
                      <div key={idx} className="flex justify-between items-center bg-gray-950/40 p-2.5 border border-gray-900 rounded-lg">
                        <span className="text-cyan-400">{path._id}</span>
                        <span className="text-gray-400">{path.count} hits</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent visitors logs list */}
                <div className="glass-card rounded-xl p-5 border border-gray-800/80">
                  <h3 className="text-sm font-bold font-mono text-gray-400 uppercase tracking-wider mb-4 border-b border-gray-900 pb-2">
                    Recent System Access Requests Log
                  </h3>
                  <div className="max-h-64 overflow-y-auto space-y-2.5 font-mono text-[10px] text-gray-500 no-scrollbar">
                    {analytics.recentVisitors.map((v, idx) => (
                      <div key={idx} className="p-3 bg-gray-950/60 border border-gray-850 rounded-lg flex flex-col sm:flex-row justify-between gap-1">
                        <div>
                          IP: <strong className="text-gray-300">{v.ip}</strong> &middot; Path: <strong className="text-cyan-400">{v.path}</strong>
                          <div className="text-[9px] text-gray-600 truncate max-w-md mt-1">{v.userAgent}</div>
                        </div>
                        <span className="text-gray-600 shrink-0 text-right">{new Date(v.timestamp).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </motion.div>
            )}

            {/* PROJECTS MANAGER */}
            {activeTab === 'projects' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-base font-bold text-white font-display">Database Project Records</h2>
                  <button 
                    onClick={openProjectCreate}
                    className="inline-flex items-center px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-750 text-white font-semibold text-xs transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5 mr-1" /> Add Project
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {projects.map(proj => (
                    <div key={proj._id} className="glass-card rounded-xl p-4 border border-gray-800/80 flex justify-between items-center gap-4">
                      <div>
                        <h4 className="text-sm font-bold text-white">{proj.title}</h4>
                        <span className="text-[10px] font-mono text-gray-500">Tags: {proj.tags.join(', ')}</span>
                      </div>
                      <div className="flex space-x-1.5 shrink-0">
                        <button 
                          onClick={() => openProjectEdit(proj)}
                          className="p-1.5 hover:bg-gray-900 border border-gray-850 rounded-lg text-gray-400 hover:text-white transition-colors cursor-pointer"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => deleteProject(proj._id)}
                          className="p-1.5 hover:bg-red-950/20 border border-gray-850 rounded-lg text-gray-400 hover:text-red-400 transition-colors cursor-pointer"
                        >
                          <Trash className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* BLOGS MANAGER */}
            {activeTab === 'blogs' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-base font-bold text-white font-display">Database Blog Posts</h2>
                  <button 
                    onClick={openBlogCreate}
                    className="inline-flex items-center px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-750 text-white font-semibold text-xs transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5 mr-1" /> Write Post
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {blogs.map(blog => (
                    <div key={blog._id} className="glass-card rounded-xl p-4 border border-gray-800/80 flex justify-between items-center gap-4">
                      <div>
                        <h4 className="text-sm font-bold text-white">{blog.title}</h4>
                        <span className="text-[10px] font-mono text-gray-500">
                          {blog.published ? 'Published' : 'Draft'} &middot; Tags: {blog.tags.join(', ')}
                        </span>
                      </div>
                      <div className="flex space-x-1.5 shrink-0">
                        <button 
                          onClick={() => openBlogEdit(blog)}
                          className="p-1.5 hover:bg-gray-900 border border-gray-850 rounded-lg text-gray-400 hover:text-white transition-colors cursor-pointer"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => deleteBlog(blog._id)}
                          className="p-1.5 hover:bg-red-950/20 border border-gray-850 rounded-lg text-gray-400 hover:text-red-400 transition-colors cursor-pointer"
                        >
                          <Trash className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* MESSAGES LIST */}
            {activeTab === 'messages' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <h2 className="text-base font-bold text-white font-display mb-4">Contact Inquiries Log ({messages.length})</h2>
                
                {messages.length === 0 ? (
                  <div className="text-center py-12 bg-gray-950/20 border border-gray-900 rounded-xl font-mono text-xs text-gray-500">
                    Inquiry database is empty.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map(msg => (
                      <div key={msg._id} className="glass-card rounded-xl p-5 border border-gray-800/80">
                        <div className="flex justify-between items-start mb-3 gap-2 border-b border-gray-850 pb-2.5">
                          <div>
                            <h4 className="text-sm font-bold text-white">{msg.name}</h4>
                            <span className="text-[10px] font-mono text-violet-400 block sm:inline">{msg.email}</span>
                            <span className="text-[10px] text-gray-500 font-mono hidden sm:inline ml-2">&middot; Subject: {msg.subject}</span>
                          </div>
                          <button 
                            onClick={() => deleteMessage(msg._id)}
                            className="p-1.5 hover:bg-red-950/20 border border-gray-850 hover:border-red-900/30 rounded text-gray-500 hover:text-red-400 transition-all cursor-pointer"
                          >
                            <Trash className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="text-xs font-mono text-gray-500 block sm:hidden mb-2">Subject: {msg.subject}</div>
                        <p className="text-xs text-gray-300 font-light leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                        <span className="block text-right text-[9px] font-mono text-gray-600 mt-3">{new Date(msg.createdAt).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

          </div>

        </div>

      </div>

      {/* PROJECT DIALOG FORM */}
      <AnimatePresence>
        {projectForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl bg-gray-950 border border-gray-850 rounded-2xl shadow-2xl p-6 relative my-8"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 to-cyan-500" />
              
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-base font-bold text-white font-display">
                  {projectForm === 'create' ? 'Register New Project File' : 'Update Project Document'}
                </h3>
                <button onClick={() => setProjectForm(null)} className="p-1 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleProjectSubmit} className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono text-gray-400 uppercase mb-1">Project Title *</label>
                    <input 
                      type="text" 
                      value={projectFields.title}
                      onChange={(e) => setProjectFields({...projectFields, title: e.target.value})}
                      required
                      placeholder="e.g. Bank Locker"
                      className="w-full px-3 py-2 text-xs bg-gray-900 border border-gray-850 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-violet-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-gray-400 uppercase mb-1">Timeline</label>
                    <input 
                      type="text" 
                      value={projectFields.timeline}
                      onChange={(e) => setProjectFields({...projectFields, timeline: e.target.value})}
                      placeholder="e.g. Jan 2024 - Feb 2024"
                      className="w-full px-3 py-2 text-xs bg-gray-900 border border-gray-850 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-violet-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-gray-400 uppercase mb-1">Short Description *</label>
                  <textarea 
                    value={projectFields.description}
                    onChange={(e) => setProjectFields({...projectFields, description: e.target.value})}
                    required
                    rows={2}
                    placeholder="Short summary details..."
                    className="w-full px-3 py-2 text-xs bg-gray-900 border border-gray-850 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono text-gray-400 uppercase mb-1">Tags (comma separated)</label>
                    <input 
                      type="text" 
                      value={projectFields.tags}
                      onChange={(e) => setProjectFields({...projectFields, tags: e.target.value})}
                      placeholder="React, Express, MongoDB"
                      className="w-full px-3 py-2 text-xs bg-gray-900 border border-gray-850 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-violet-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-gray-400 uppercase mb-1">Technologies (comma separated)</label>
                    <input 
                      type="text" 
                      value={projectFields.technologies}
                      onChange={(e) => setProjectFields({...projectFields, technologies: e.target.value})}
                      placeholder="PHP, MySQL, JavaScript"
                      className="w-full px-3 py-2 text-xs bg-gray-900 border border-gray-850 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-violet-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono text-gray-400 uppercase mb-1">GitHub URL</label>
                    <input 
                      type="text" 
                      value={projectFields.githubLink}
                      onChange={(e) => setProjectFields({...projectFields, githubLink: e.target.value})}
                      placeholder="https://github.com/..."
                      className="w-full px-3 py-2 text-xs bg-gray-900 border border-gray-850 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-violet-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-gray-400 uppercase mb-1">Live URL</label>
                    <input 
                      type="text" 
                      value={projectFields.liveLink}
                      onChange={(e) => setProjectFields({...projectFields, liveLink: e.target.value})}
                      placeholder="https://..."
                      className="w-full px-3 py-2 text-xs bg-gray-900 border border-gray-850 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-violet-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono text-gray-400 uppercase mb-1">Hero Image Link</label>
                    <input 
                      type="text" 
                      value={projectFields.image}
                      onChange={(e) => setProjectFields({...projectFields, image: e.target.value})}
                      placeholder="https://unsplash..."
                      className="w-full px-3 py-2 text-xs bg-gray-900 border border-gray-850 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-violet-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-gray-400 uppercase mb-1">Architecture Summary</label>
                    <input 
                      type="text" 
                      value={projectFields.architecture}
                      onChange={(e) => setProjectFields({...projectFields, architecture: e.target.value})}
                      placeholder="e.g. PHP MVC / MERN stack"
                      className="w-full px-3 py-2 text-xs bg-gray-900 border border-gray-850 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-violet-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="flex items-center space-x-2 text-[10px] font-mono text-gray-400 uppercase cursor-pointer select-none">
                    <input 
                      type="checkbox" 
                      checked={projectFields.featured}
                      onChange={(e) => setProjectFields({...projectFields, featured: e.target.checked})}
                      className="rounded border-gray-800 text-violet-600 focus:ring-violet-500 bg-gray-950"
                    />
                    <span>Highlight as Featured Project</span>
                  </label>
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-gray-400 uppercase mb-1">Core Features (One per line)</label>
                  <textarea 
                    value={projectFields.features}
                    onChange={(e) => setProjectFields({...projectFields, features: e.target.value})}
                    rows={3}
                    placeholder="Customer Registration&#10;Availability calculations"
                    className="w-full px-3 py-2 text-xs bg-gray-900 border border-gray-850 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 font-mono"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono text-gray-400 uppercase mb-1">Architecture Diagram (Text/Mermaid)</label>
                    <textarea 
                      value={projectFields.architectureDiagram}
                      onChange={(e) => setProjectFields({...projectFields, architectureDiagram: e.target.value})}
                      rows={4}
                      placeholder="Client -> Express -> MongoDB"
                      className="w-full px-3 py-2 text-[10px] bg-gray-900 border border-gray-850 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-gray-400 uppercase mb-1">Folder Structure (Text)</label>
                    <textarea 
                      value={projectFields.folderStructure}
                      onChange={(e) => setProjectFields({...projectFields, folderStructure: e.target.value})}
                      rows={4}
                      placeholder="src/&#10;  components/&#10;  pages/"
                      className="w-full px-3 py-2 text-[10px] bg-gray-900 border border-gray-850 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-gray-400 uppercase mb-1">Database Schema Diagram / Tables</label>
                  <textarea 
                    value={projectFields.databaseSchema}
                    onChange={(e) => setProjectFields({...projectFields, databaseSchema: e.target.value})}
                    rows={3}
                    placeholder="Users Table (id, email, password)"
                    className="w-full px-3 py-2 text-[10px] bg-gray-900 border border-gray-850 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 font-mono"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono text-gray-400 uppercase mb-1">Challenges Faced</label>
                    <textarea 
                      value={projectFields.challengesFaced}
                      onChange={(e) => setProjectFields({...projectFields, challengesFaced: e.target.value})}
                      rows={3}
                      placeholder="Detail challenges encountered..."
                      className="w-full px-3 py-2 text-xs bg-gray-900 border border-gray-850 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-gray-400 uppercase mb-1">Problems Solved</label>
                    <textarea 
                      value={projectFields.problemsSolved}
                      onChange={(e) => setProjectFields({...projectFields, problemsSolved: e.target.value})}
                      rows={3}
                      placeholder="Detail how conflicts were solved..."
                      className="w-full px-3 py-2 text-xs bg-gray-900 border border-gray-850 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-gray-400 uppercase mb-1">Lessons Learned</label>
                    <textarea 
                      value={projectFields.lessonsLearned}
                      onChange={(e) => setProjectFields({...projectFields, lessonsLearned: e.target.value})}
                      rows={3}
                      placeholder="What engineering lessons did you gain..."
                      className="w-full px-3 py-2 text-xs bg-gray-900 border border-gray-850 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 resize-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-gray-400 uppercase mb-1">Future Improvements (One per line)</label>
                  <textarea 
                    value={projectFields.futureImprovements}
                    onChange={(e) => setProjectFields({...projectFields, futureImprovements: e.target.value})}
                    rows={2.5}
                    placeholder="Add billing gateways&#10;Implement socket channels"
                    className="w-full px-3 py-2 text-xs bg-gray-900 border border-gray-850 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 font-mono"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full py-2.5 bg-violet-600 hover:bg-violet-750 text-white font-semibold text-xs font-mono rounded-lg transition-colors cursor-pointer shadow-[0_0_10px_rgba(139,92,246,0.3)]"
                >
                  Save Project Document
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* BLOG DIALOG FORM */}
      <AnimatePresence>
        {blogForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-xl bg-gray-950 border border-gray-850 rounded-2xl shadow-2xl p-6 relative"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 to-cyan-500" />
              
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-base font-bold text-white font-display">
                  {blogForm === 'create' ? 'Draft New Blog Post' : 'Edit Blog Post'}
                </h3>
                <button onClick={() => setBlogForm(null)} className="p-1 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleBlogSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-mono text-gray-400 uppercase mb-1">Blog Title *</label>
                  <input 
                    type="text" 
                    value={blogFields.title}
                    onChange={(e) => setBlogFields({...blogFields, title: e.target.value})}
                    required
                    placeholder="e.g. Securing Express Endpoints"
                    className="w-full px-3 py-2 text-xs bg-gray-900 border border-gray-850 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-violet-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-gray-400 uppercase mb-1">Summary / Lead *</label>
                  <input 
                    type="text" 
                    value={blogFields.summary}
                    onChange={(e) => setBlogFields({...blogFields, summary: e.target.value})}
                    required
                    placeholder="Short single line punch..."
                    className="w-full px-3 py-2 text-xs bg-gray-900 border border-gray-850 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-violet-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono text-gray-400 uppercase mb-1">Tags (comma separated)</label>
                    <input 
                      type="text" 
                      value={blogFields.tags}
                      onChange={(e) => setBlogFields({...blogFields, tags: e.target.value})}
                      placeholder="React, CSS, Frontend"
                      className="w-full px-3 py-2 text-xs bg-gray-900 border border-gray-850 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-violet-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-gray-400 uppercase mb-1">Cover Image Link</label>
                    <input 
                      type="text" 
                      value={blogFields.image}
                      onChange={(e) => setBlogFields({...blogFields, image: e.target.value})}
                      placeholder="https://images.unsplash..."
                      className="w-full px-3 py-2 text-xs bg-gray-900 border border-gray-850 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-violet-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-gray-400 uppercase mb-1">Markdown Article Content *</label>
                  <textarea 
                    value={blogFields.content}
                    onChange={(e) => setBlogFields({...blogFields, content: e.target.value})}
                    required
                    rows={8}
                    placeholder="Write article here..."
                    className="w-full px-3 py-2 text-xs bg-gray-900 border border-gray-850 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 font-mono resize-none"
                  />
                </div>

                <div>
                  <label className="flex items-center space-x-2 text-[10px] font-mono text-gray-400 uppercase cursor-pointer select-none">
                    <input 
                      type="checkbox" 
                      checked={blogFields.published}
                      onChange={(e) => setBlogFields({...blogFields, published: e.target.checked})}
                      className="rounded border-gray-800 text-violet-600 focus:ring-violet-500 bg-gray-950"
                    />
                    <span>Publish Immediately</span>
                  </label>
                </div>

                <button 
                  type="submit"
                  className="w-full py-2.5 bg-violet-600 hover:bg-violet-750 text-white font-semibold text-xs font-mono rounded-lg transition-colors cursor-pointer shadow-[0_0_10px_rgba(139,92,246,0.3)]"
                >
                  Save Blog Post
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default AdminDashboard;
