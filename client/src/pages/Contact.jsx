import React, { useState } from 'react';
import { contactService } from '../services/api';
import { Mail, MapPin, Key, Send, CheckCircle, AlertCircle, Terminal, Phone, Linkedin, Github } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: ''
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.subject || !form.message) {
      setStatus({ submitting: false, success: false, error: 'All fields are required.' });
      return;
    }

    try {
      setStatus({ submitting: true, success: false, error: '' });
      await contactService.submit(form);
      setStatus({ submitting: false, success: true, error: '' });
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error(err);
      setStatus({
        submitting: false,
        success: false,
        error: 'Failed to record message. Please ensure the Express server is running and configured correctly.'
      });
    }
  };

  return (
    <div className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Background Glow */}
      <div className="glow-spot-1 top-20 left-10 opacity-70"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="mb-12 text-center md:text-left">
          <h1 className="text-4xl font-extrabold font-display text-white tracking-tight sm:text-5xl">
            Get in{' '}
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Touch
            </span>
          </h1>
          <p className="mt-4 text-base text-gray-400 max-w-2xl font-light">
            Send an inquiry directly to the MongoDB backend or reach out via secure channels.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          
          {/* Info Card Sidebar */}
          <div className="space-y-6">
            <div className="glass-card rounded-2xl p-6 border border-gray-800/80">
              <h3 className="text-base font-bold text-white mb-6 font-display border-b border-gray-800/60 pb-3">
                Contact Details
              </h3>
              
              <ul className="space-y-6 text-sm">
                <li className="flex items-start space-x-3.5">
                  <div className="p-2 rounded-lg bg-gray-900 border border-gray-850 text-violet-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 block uppercase font-mono">Email Address</span>
                    <a href="mailto:chanduuu8971@gmail.com" className="text-gray-300 hover:text-violet-400 transition-colors font-mono text-xs">
                      chanduuu8971@gmail.com
                    </a>
                  </div>
                </li>

                <li className="flex items-start space-x-3.5">
                  <div className="p-2 rounded-lg bg-gray-900 border border-gray-850 text-cyan-400">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 block uppercase font-mono">Phone Number</span>
                    <a href="tel:+918971807245" className="text-gray-300 hover:text-cyan-400 transition-colors font-mono text-xs">
                      +91 8971807245
                    </a>
                  </div>
                </li>

                <li className="flex items-start space-x-3.5">
                  <div className="p-2 rounded-lg bg-gray-900 border border-gray-850 text-fuchsia-400">
                    <Github className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 block uppercase font-mono">GitHub Profile</span>
                    <a href="https://github.com/chandrashekar-404" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-fuchsia-400 transition-colors font-mono text-xs">
                      github.com/chandrashekar-404
                    </a>
                  </div>
                </li>

                <li className="flex items-start space-x-3.5">
                  <div className="p-2 rounded-lg bg-gray-900 border border-gray-850 text-amber-400">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 block uppercase font-mono">LinkedIn Profile</span>
                    <a href="https://www.linkedin.com/in/chandra-shekhar-131064288/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-amber-400 transition-colors font-mono text-xs">
                      linkedin.com/in/chandra-shekhar-131064288
                    </a>
                  </div>
                </li>

                <li className="flex items-start space-x-3.5">
                  <div className="p-2 rounded-lg bg-gray-900 border border-gray-850 text-emerald-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 block uppercase font-mono">Base Location</span>
                    <span className="text-gray-300 text-xs font-mono">Bengaluru, Karnataka, India</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Quick terminal visual widget */}
            <div className="p-5 rounded-2xl bg-gray-950/80 border border-gray-900 font-mono text-[9px] text-gray-500 leading-normal">
              <div className="flex items-center space-x-1.5 mb-3 border-b border-gray-900 pb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/30"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/30"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/30"></span>
                <span className="text-[9px] text-gray-600 pl-1 flex items-center"><Terminal className="w-3 h-3 mr-1" /> status.sh</span>
              </div>
              <p className="text-violet-400/80">$ curl -X GET /api/health</p>
              <p className="text-emerald-400/80">{"{ status: \"success\", api: \"online\" }"}</p>
              <p className="text-violet-400/80 mt-1.5">$ ping -c 1 mongodb.atlas</p>
              <p className="text-gray-600">64 bytes from atlas.mongodb.net: icmp_seq=1 ttl=56 time=12.5 ms</p>
            </div>
          </div>

          {/* Form Container */}
          <div className="lg:col-span-2 glass-card rounded-2xl p-8 border border-gray-800/80">
            <h3 className="text-xl font-bold text-white mb-6 font-display">Send a Message</h3>
            
            {status.error && (
              <div className="mb-6 p-4 rounded-xl border border-red-500/20 bg-red-600/5 text-red-400 flex items-center space-x-3 text-sm animate-pulse">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span>{status.error}</span>
              </div>
            )}

            <AnimatePresence mode="wait">
              {status.success ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-12"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-4 animate-bounce">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">Message Dispatched</h4>
                  <p className="text-sm text-gray-400 max-w-sm mx-auto mb-6">
                    Your contact message has been recorded in the MongoDB database successfully. I will get back to you shortly!
                  </p>
                  <button
                    onClick={() => setStatus({ submitting: false, success: false, error: '' })}
                    className="px-4 py-2 bg-gray-900 border border-gray-800 text-xs font-mono text-gray-300 hover:text-white rounded-lg transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-mono text-gray-400 uppercase mb-2">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                        className="w-full px-4 py-2.5 text-sm bg-gray-900/60 border border-gray-850 rounded-lg text-white placeholder-gray-650 focus:outline-none focus:border-violet-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-gray-400 uppercase mb-2">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                        className="w-full px-4 py-2.5 text-sm bg-gray-900/60 border border-gray-850 rounded-lg text-white placeholder-gray-655 focus:outline-none focus:border-violet-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-gray-400 uppercase mb-2">Subject *</label>
                    <input
                      type="text"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      required
                      placeholder="Project Discussion / Freelance Hire"
                      className="w-full px-4 py-2.5 text-sm bg-gray-900/60 border border-gray-850 rounded-lg text-white placeholder-gray-650 focus:outline-none focus:border-violet-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-gray-400 uppercase mb-2">Your Message *</label>
                    <textarea
                      name="message"
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      required
                      placeholder="Hi, I would love to chat about your experience..."
                      className="w-full px-4 py-2.5 text-sm bg-gray-900/60 border border-gray-850 rounded-lg text-white placeholder-gray-650 focus:outline-none focus:border-violet-500 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status.submitting}
                    className="w-full py-3 rounded-lg bg-violet-600 hover:bg-violet-750 text-white font-semibold text-sm transition-all duration-300 shadow-[0_0_15px_rgba(139,92,246,0.25)] flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <span>{status.submitting ? 'Transmitting...' : 'Dispatch Message'}</span>
                    {!status.submitting && <Send className="w-4 h-4" />}
                  </button>
                </form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
