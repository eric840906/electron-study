import { MemoryRouter as Router } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ConfigProvider, theme, message, Modal } from 'antd';
import type { MenuTheme } from 'antd';
import './App.css';
import MainLayout from './src/Layouts/Layout';
import LoginForm from './src/components/LoginForm';
import { store } from './src/store';
import { Provider } from 'react-redux';

export default function App() {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');
  const handleOk = () => {
    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
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

  return (
    <Provider store={store}>
      <ConfigProvider
        theme={{
          algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
        }}
      >
        <Router>
          <MainLayout onLoginClick={setOpen} isDark={isDarkMode} onThemeChange={handleClick} />
            <LoginForm onOpen={open} onCancel={handleCancel}/>
        </Router>
      </ConfigProvider>
    </Provider>
  );
}
