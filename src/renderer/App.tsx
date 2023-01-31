import { MemoryRouter as Router } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ConfigProvider, theme, message, Modal } from 'antd';
import type { MenuTheme } from 'antd';
import './App.css';
import MainLayout from './src/Layouts/Layout';
import LoginForm from './src/components/LoginForm';
import ConfigForm from './src/components/ConfigForm';
import { store } from './src/store';
import { Provider } from 'react-redux';
import useNotice from './src/hooks/useNotice';

export default function App() {
  const [noticeInput, contextHolder] = useNotice();
  const [loginOpen, setLoginOpen] = useState(false);
  const [configOpen, setConfigOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');
  const handleOk = () => {
    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      setLoginOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleLoginCancel = () => {
    console.log('Clicked login cancel button');
    setLoginOpen(false);
  };
  const handleConfigCancel = () => {
    console.log('Clicked config cancel button');
    setConfigOpen(false);
  };
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
  useEffect(() => {
    window.electron.ipcRenderer.on('need-output', (args:any) => {
      noticeInput('info', args)
      setConfigOpen(true)
    })
  }, [])

  return (
    <Provider store={store}>
      {contextHolder}
      <ConfigProvider
        theme={{
          algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
        }}
      >
        <Router>
          <MainLayout onLoginClick={setLoginOpen} onConfigClick={setConfigOpen} isDark={isDarkMode} onThemeChange={handleClick} />
            <LoginForm onOpen={loginOpen} onCancel={handleLoginCancel}/>
            <ConfigForm onOpen={configOpen} onCancel={handleConfigCancel}/>
        </Router>
      </ConfigProvider>
    </Provider>
  );
}
