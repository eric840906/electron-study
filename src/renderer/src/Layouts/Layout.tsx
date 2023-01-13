import { Layout, Switch } from 'antd';
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../Pages/Home';
import VideoCompresser from '../Pages/VideoCompresser';
import ImageConverter from '../Pages/ImageConverter';
import SideMenu from '../components/Menu';

const { Header, Footer, Sider, Content } = Layout;
const MainLayout: React.FC<{ isDark: any; onThemeChange: any }> = ({
  isDark,
  onThemeChange,
}) => {
  useEffect(() => {
    console.log(isDark);
  }, [isDark]);
  return (
    <>
      <Layout>
        <Sider
          width={256}
          style={{
            minHeight: '100vh',
            color: 'white',
            padding: '0',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <SideMenu onThemeChange={onThemeChange} />
          <Switch
            onChange={onThemeChange}
            checkedChildren="Dark"
            unCheckedChildren="Light"
            style={{ width: 60, position: 'absolute', bottom: 10, left: 10 }}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              textAlign: 'center',
              padding: 0,
              color: `${isDark ? 'white' : 'black'}  `,
              background: `${isDark ? 'black' : 'white'}  `,
              // background: `white`,
            }}
          >
            Header
          </Header>
          <Content style={{ margin: '24px 16px 0' }}>
            <Routes>
              <Route
                path="/"
                element={<Home onThemeChange={onThemeChange} />}
              />
              <Route path="/video" element={<VideoCompresser />} />
              <Route path="/image" element={<ImageConverter />} />
            </Routes>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Footer</Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default MainLayout;
