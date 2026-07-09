import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import RootLayout from './layouts/RootLayout';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Architecture from './pages/Architecture';
import BugJournal from './pages/BugJournal';
import GitHub from './pages/GitHub';
import Resume from './pages/Resume';
import Contact from './pages/Contact';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="skills" element={<Skills />} />
            <Route path="projects" element={<Projects />} />
            <Route path="architecture" element={<Architecture />} />
            <Route path="bugs" element={<BugJournal />} />
            <Route path="github" element={<GitHub />} />
            <Route path="resume" element={<Resume />} />
            <Route path="contact" element={<Contact />} />
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
