import { MemoryRouter as Router } from 'react-router-dom';
import { useState } from 'react';
import { ConfigProvider, theme } from 'antd';
import type { MenuTheme } from 'antd';
import './App.css';
import MainLayout from './src/Layouts/Layout';

export default function App() {
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [errCode, setErrCode] = useState('')
  const handleClick = () => {
    setIsDarkMode((previousValue) => !previousValue);
  };
  window.electron.ipcRenderer.on('image start', (arg:any) => {
    setErrCode(arg)
  })
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
