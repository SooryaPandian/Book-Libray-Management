// src/components/ThemeToggle.js
import React from 'react';
import ReactSwitch from 'react-switch'; 
import { useTheme } from '../components/ThemeContext'; 

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div style={{ margin: '20px', display: 'flex', justifyContent: 'flex-end' }}>
      <ReactSwitch
        onChange={toggleTheme}
        checked={theme === 'dark'}
        offColor="#888"
        onColor="#4CAF50"
        uncheckedIcon={false}
        checkedIcon={false}
      />
      <p>{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</p>
    </div>
  );
};

export default ThemeToggle;
