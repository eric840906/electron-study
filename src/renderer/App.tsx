import { MemoryRouter as Router } from 'react-router-dom';
import { useState } from 'react';
import { ConfigProvider, theme } from 'antd';
import type { MenuTheme } from 'antd';
import './App.css';
import MainLayout from './src/Layouts/Layout';

export default function App() {
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const [isDarkMode, setIsDarkMode] = useState(false);
  const handleClick = () => {
    setIsDarkMode((previousValue) => !previousValue);
  };
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
