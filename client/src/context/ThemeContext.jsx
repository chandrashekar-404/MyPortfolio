import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'dark';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Clear existing theme classes
    root.classList.remove('dark', 'light', 'theme-terminal', 'theme-cyberpunk');
    
    // Add current theme class
    root.classList.add(theme);
    
    if (theme === 'light') {
      root.style.colorScheme = 'light';
    } else {
      root.style.colorScheme = 'dark';
    }
    
    localStorage.setItem('theme', theme);
  }, [theme]);

  const changeTheme = (newTheme) => {
    const themeMap = {
      'dark': 'dark',
      'light': 'light',
      'terminal': 'theme-terminal',
      'cyberpunk': 'theme-cyberpunk'
    };

    const targetTheme = themeMap[newTheme.toLowerCase()] || themeMap[newTheme.replace('theme-', '').toLowerCase()];
    if (targetTheme) {
      setTheme(targetTheme);
      return targetTheme;
    }
    return null;
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
