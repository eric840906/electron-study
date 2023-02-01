import { Layout, Switch, Button } from 'antd';
import { Routes, Route } from 'react-router-dom';
import { SettingOutlined } from '@ant-design/icons';
import Home from '../Pages/Home';
import VideoCompresser from '../Pages/VideoCompresser';
import ImageConverter from '../Pages/ImageConverter';
import SideMenu from '../components/Menu';
import ProgressBar from '../components/ProgressBar';
import UserName from '../components/UserName';
import { useSelector } from 'react-redux';
import { selectUserState } from '../store/userSlice';
import { useEffect, useState } from 'react';

const { Header, Footer, Sider, Content } = Layout;
const MainLayout: React.FC<{ isDark: any; onThemeChange: any, onLoginClick:any, onConfigClick: any }> = ({
  isDark,
  onThemeChange,
  onLoginClick,
  onConfigClick
}) => {
  const userName = useSelector(selectUserState)
  const [name, setName] = useState('Guest')
  useEffect(() => {
    if(userName && Object.keys(userName).length > 0) {
      setName(userName.username)
    } else {
      setName('Guest')
    }
  },[userName])
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
          <SideMenu userName={name} onLoginClick={onLoginClick} onThemeChange={onThemeChange} />
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
            <Button onClick={onConfigClick} icon={<SettingOutlined />}></Button>
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
              textAlign: 'right',
              padding: '0px 1rem',
              color: `${isDark ? 'white' : '#141414'}`,
              background: `${isDark ? '#141414' : 'white'}`,
            }}
          >
          <UserName name={name}/>
          {/* {userName ? <UserName name={userName.email}/> : <UserName name='Guest'/>} */}
          </Header>
          <Content style={{ margin:10, padding: 10, overflowY:'auto' }}>
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
