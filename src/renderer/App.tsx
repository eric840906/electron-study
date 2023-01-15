import { MemoryRouter as Router } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ConfigProvider, theme } from 'antd';
import type { MenuTheme } from 'antd';
import './App.css';
import MainLayout from './src/Layouts/Layout';

export default function App() {
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if(localStorage.hasOwnProperty('isDarkMode')){
      const darkMode = window.localStorage.getItem('isDarkMode')
      if(darkMode === 'true') {
        return true
      } else {
        return false
      }
    }
  });
  const [errCode, setErrCode] = useState('')
  const handleClick = () => {
    setIsDarkMode((previousValue) => !previousValue);
  };
  window.electron.ipcRenderer.on('image start', (arg:any) => {
    setErrCode(arg)
  })
  useEffect(() =>{
      window.localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode))
  }, [isDarkMode])
  useEffect(() => {
    if(localStorage.hasOwnProperty('isDarkMode')){
      const darkMode = window.localStorage.getItem('isDarkMode')
      if(darkMode === 'true') setIsDarkMode(true)
    }
  },[])
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
