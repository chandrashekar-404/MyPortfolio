import React, { useState, useEffect } from 'react';
import { bugService } from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { Bug, Plus, Terminal, RefreshCw, X, CheckCircle, AlertCircle } from 'lucide-react';

const BugJournal = () => {
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  // Form State
  const [form, setForm] = useState({
    title: '',
    description: '',
    project: '',
    severity: 'medium',
    status: 'open',
    resolution: ''
  });
  const [formSubmitting, setFormSubmitting] = useState(false);

  const fetchBugs = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await bugService.getAll();
      setBugs(data);
    } catch (err) {
      console.error(err);
      setError('Could not connect to database to fetch journal logs. Ensure Node server and MongoDB are running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBugs();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.project) {
      alert('Please fill out all required fields.');
      return;
    }

    try {
      setFormSubmitting(true);
      const newBug = await bugService.create(form);
      setBugs([newBug, ...bugs]);
      setShowAddForm(false);
      setForm({
        title: '',
        description: '',
        project: '',
        severity: 'medium',
        status: 'open',
        resolution: ''
      });
    } catch (err) {
      console.error(err);
      alert('Error creating bug journal entry.');
    } finally {
      setFormSubmitting(false);
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'bg-red-500/10 text-red-400 border border-red-500/25';
      case 'high': return 'bg-orange-500/10 text-orange-400 border border-orange-500/25';
      case 'medium': return 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/25';
      default: return 'bg-blue-500/10 text-blue-400 border border-blue-500/25';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'resolved': return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/25';
      case 'investigating': return 'bg-amber-500/10 text-amber-400 border border-amber-500/25';
      default: return 'bg-purple-500/10 text-purple-400 border border-purple-500/25';
    }
  };

  return (
    <div className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Glow Spots */}
      <div className="glow-spot-1 top-10 left-10 opacity-60"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12">
          <div>
            <h1 className="text-4xl font-extrabold font-display text-white tracking-tight sm:text-5xl">
              Anomalies{' '}
              <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                & Bug Journal
              </span>
            </h1>
            <p className="mt-2 text-base text-gray-400 max-w-xl">
              A chronological ledger documenting systems bugs, troubleshooting protocols, and resolution metrics.
            </p>
          </div>

          <div className="flex space-x-2 mt-4 sm:mt-0">
            <button
              onClick={fetchBugs}
              className="p-2.5 rounded-lg bg-gray-950 border border-gray-850 hover:bg-gray-900 transition-colors text-gray-400 hover:text-white cursor-pointer"
              title="Refresh logs"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
            <button
              onClick={() => setShowAddForm(true)}
              className="inline-flex items-center px-4 py-2.5 rounded-lg bg-violet-600 hover:bg-violet-750 text-white font-semibold text-sm transition-all shadow-[0_0_15px_rgba(139,92,246,0.3)] cursor-pointer"
            >
              <Plus className="w-4 h-4 mr-2" /> Log Anomaly
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-8 p-4 rounded-xl border border-red-500/20 bg-red-600/5 text-red-400 flex items-center space-x-3 text-sm">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* List of Bugs */}
        {loading ? (
          <div className="space-y-6">
            {[1, 2].map(n => (
              <div key={n} className="glass-card rounded-2xl p-6 border border-gray-800/80 animate-pulse h-48">
                <div className="h-6 bg-gray-900 w-1/3 rounded mb-3"></div>
                <div className="h-4 bg-gray-950 w-full rounded mb-2"></div>
                <div className="h-4 bg-gray-950 w-2/3 rounded"></div>
              </div>
            ))}
          </div>
        ) : bugs.length === 0 ? (
          <div className="text-center py-20 bg-gray-950/20 border border-gray-900 rounded-2xl">
            <Bug className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">Journal ledger is clear. No anomalies registered.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {bugs.map((bug) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                key={bug._id}
                className="glass-card rounded-2xl p-6 border border-gray-800/80"
              >
                {/* Meta details */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded uppercase ${getSeverityColor(bug.severity)}`}>
                    {bug.severity}
                  </span>
                  <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded uppercase ${getStatusColor(bug.status)}`}>
                    {bug.status}
                  </span>
                  <span className="text-xs text-gray-500 font-mono ml-1">
                    Project: <span className="text-gray-300">{bug.project}</span>
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-white mb-3 font-display">
                  {bug.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-400 leading-relaxed font-light mb-4">
                  {bug.description}
                </p>

                {/* Resolution block */}
                {bug.resolution && (
                  <div className="mt-4 p-4 rounded-lg bg-gray-950/70 border border-gray-850 font-mono text-xs">
                    <span className="text-emerald-400 block mb-1.5 flex items-center">
                      <CheckCircle className="w-3.5 h-3.5 mr-1" /> RESOLUTION PROTOCOL:
                    </span>
                    <p className="text-gray-300 leading-relaxed">{bug.resolution}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {/* Add Bug Anomaly Modal Form */}
        <AnimatePresence>
          {showAddForm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-xl bg-gray-950 border border-gray-850 rounded-2xl shadow-2xl p-6 relative overflow-hidden"
              >
                {/* Decorative border accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 to-cyan-500" />
                
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-white font-display inline-flex items-center">
                    <Terminal className="w-5 h-5 text-violet-400 mr-2" /> Log System Anomaly
                  </h3>
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="p-1 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-gray-400 uppercase mb-1.5">Anomaly Header *</label>
                    <input
                      type="text"
                      name="title"
                      value={form.title}
                      onChange={handleChange}
                      placeholder="e.g. Memory saturation under connection spikes"
                      required
                      className="w-full px-3 py-2 text-sm bg-gray-900 border border-gray-850 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-violet-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-gray-400 uppercase mb-1.5">Target Project *</label>
                      <input
                        type="text"
                        name="project"
                        value={form.project}
                        onChange={handleChange}
                        placeholder="e.g. Portfolio"
                        required
                        className="w-full px-3 py-2 text-sm bg-gray-900 border border-gray-850 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-violet-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-gray-400 uppercase mb-1.5">Severity *</label>
                      <select
                        name="severity"
                        value={form.severity}
                        onChange={handleChange}
                        className="w-full px-3 py-2 text-sm bg-gray-900 border border-gray-850 rounded-lg text-white focus:outline-none focus:border-violet-500"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="critical">Critical</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-gray-400 uppercase mb-1.5">Anomaly Description *</label>
                    <textarea
                      name="description"
                      rows={3}
                      value={form.description}
                      onChange={handleChange}
                      placeholder="Describe the failure mode, system context, and behaviors observed..."
                      required
                      className="w-full px-3 py-2 text-sm bg-gray-900 border border-gray-850 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-gray-400 uppercase mb-1.5">Resolution Protocol (Optional)</label>
                    <textarea
                      name="resolution"
                      rows={3}
                      value={form.resolution}
                      onChange={handleChange}
                      placeholder="Detail steps taken to isolate, patch, and regression test the issue..."
                      className="w-full px-3 py-2 text-sm bg-gray-900 border border-gray-850 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={formSubmitting}
                    className="w-full py-2.5 rounded-lg bg-violet-600 hover:bg-violet-750 text-white font-semibold text-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {formSubmitting ? 'Syncing...' : 'Register to Ledger'}
                  </button>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BugJournal;
