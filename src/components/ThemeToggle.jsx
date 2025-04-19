import React from 'react';

const ThemeToggle = ({ theme, setTheme }) => {
  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle dark/light mode"
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        border: 'none',
        backgroundColor: theme === 'light' ? '#f0f0f0' : '#333',
        color: theme === 'light' ? '#333' : '#fff',
        fontSize: '22px',
        cursor: 'pointer',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        zIndex: 9999,
        transition: 'all 0.3s ease-in-out',
      }}
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
};

export default ThemeToggle;
