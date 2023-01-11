import { Layout } from 'antd';
import React, { useState } from 'react';
import Menu from '../components/Menu';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../Pages/Home';
import VideoCompresser from '../Pages/VideoCompresser';
import ImageConverter from '../Pages/ImageConverter';

const { Header, Footer, Sider, Content } = Layout;

export default (() => {
  return (
    <>
      <Layout>
        <Sider
          width={256}
          style={{ minHeight: '100vh', color: 'white', padding: '10px 0' }}
          theme="light"
        >
          <Menu />
        </Sider>
        <Layout>
          <Header
            style={{ background: '#fff', textAlign: 'center', padding: 0 }}
          >
            Header
          </Header>
          <Content style={{ margin: '24px 16px 0' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/video" element={<VideoCompresser />} />
              <Route path="/image" element={<ImageConverter />} />
            </Routes>
          </Content>
          {/* <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
          {this.props.children}
        </div> */}
          <Footer style={{ textAlign: 'center' }}>Footer</Footer>
        </Layout>
      </Layout>
    </>
  );
}) as React.FC;
