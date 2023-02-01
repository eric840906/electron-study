import {
  FileImageOutlined,
  VideoCameraOutlined,
  LoginOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import icon from '../../../../assets/images/20078.svg';
import { Menu, Switch } from 'antd';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserState } from '../store/userSlice';
import { userLogout } from "../store/userSlice";
import useNotice from '../hooks/useNotice';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const SideMenu: React.FC<{
  onThemeChange: any;
  onLoginClick: any;
  userName: any
}> = ({ onThemeChange, onLoginClick, userName }) => {
  const [noticeInput, contextHolder] = useNotice()
  const dispatch = useDispatch()
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
  };
  const accountControl = () => {
    if(userName === 'Guest') {
      onLoginClick(true)
    } else {
      dispatch(userLogout())
      noticeInput('success', '登出成功')
    }
  }
  const items: MenuProps['items'] = [
    getItem(
      <Link to="/">
        <img height={69} src={icon} />
      </Link>,
      'brand'
    ),
    getItem(
      '主要功能',
      'main',
      null,
      [
        getItem(
          <Link to="/video">影片轉檔</Link>,
          'sub1',
          <VideoCameraOutlined />
        ),
        getItem(
          <Link to="/image">圖片轉檔</Link>,
          'sub2',
          <FileImageOutlined />
        )
      ],
      'group'
    ),
    getItem(
      '使用者',
      'account',
      null,
      [
        getItem(<a onClick={accountControl}> {userName === 'Guest' ? '登入' : '登出'}</a>, '13', userName === 'Guest' ? <LoginOutlined /> : <LogoutOutlined />),
      ],
      'group'
    ),
  ];
  return (
    <>
      {contextHolder}
      <Menu
        onClick={onClick}
        style={{
          width: 256,
          paddingTop: 10,
          height: '100%',
        }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        items={items}
      />
    </>
  );
};
export default SideMenu;
