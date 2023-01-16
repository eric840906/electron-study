import { MemoryRouter as Router } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ConfigProvider, theme, message } from 'antd';
import type { MenuTheme } from 'antd';
import './App.css';
import MainLayout from './src/Layouts/Layout';

export default function App() {
  const checkDark = () => {
    if (localStorage.hasOwnProperty('isDarkMode')) {
      const darkMode = window.localStorage.getItem('isDarkMode');
      if (darkMode === 'true') {
        return true;
      } else {
        return false;
      }
    }
  };
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const [isDarkMode, setIsDarkMode] = useState(() => checkDark());
  const [errCode, setErrCode] = useState('');
  const handleClick = () => {
    setIsDarkMode((previousValue) => !previousValue);
  };
  useEffect(() => {
    window.localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);
  useEffect(() => {
    if (checkDark()) {
      setIsDarkMode(true);
    }
  }, []);

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
      }}
    >
      <Router>
        <MainLayout isDark={isDarkMode} onThemeChange={handleClick} />
      </Router>
    </ConfigProvider>
  );
}
