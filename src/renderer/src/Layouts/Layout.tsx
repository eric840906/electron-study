import { Layout, Switch, Button } from 'antd';
import { Routes, Route } from 'react-router-dom';
import { SettingOutlined } from '@ant-design/icons';
import Home from '../Pages/Home';
import VideoCompresser from '../Pages/VideoCompresser';
import ImageConverter from '../Pages/ImageConverter';
import SideMenu from '../components/Menu';
import ProgressBar from '../components/ProgressBar';

const { Header, Footer, Sider, Content } = Layout;
const MainLayout: React.FC<{ isDark: any; onThemeChange: any }> = ({
  isDark,
  onThemeChange,
}) => {
  return (
    <>
      <Layout style={{height: '100vh'}}>
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
          <div
            style={{
              position: 'absolute',
              bottom: 10,
              left: 10,
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
            }}
          >
            <Button icon={<SettingOutlined />}></Button>
            <Switch
              checked={!isDark}
              onChange={onThemeChange}
              checkedChildren="☀️"
              unCheckedChildren="🌙"
              defaultChecked={true}
            />
          </div>
        </Sider>
        <Layout>
          <Header
            style={{
              textAlign: 'center',
              padding: 0,
              color: `${isDark ? 'white' : '#141414'}`,
              background: `${isDark ? '#141414' : 'white'}`,
            }}
          >

          </Header>
          <Content style={{ margin:10, padding: '24px 16px 0', overflowY:'auto' }}>
            <Routes>
              <Route
                path="/"
                element={<Home onThemeChange={onThemeChange} />}
              />
              <Route path="/video" element={<VideoCompresser />} />
              <Route path="/image" element={<ImageConverter />} />
            </Routes>
          </Content>
          <Footer
            style={{
              textAlign: 'center',
              color: `${isDark ? 'white' : '#141414'}`,
              background: `${isDark ? '#141414' : 'white'}`,
            }}
          >
            <ProgressBar/>
          </Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default MainLayout;
