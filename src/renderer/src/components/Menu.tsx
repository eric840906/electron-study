import {
  FileImageOutlined,
  VideoCameraOutlined,
  LoginOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import icon from '../../../../assets/images/20078.svg';
import { Menu, Switch } from 'antd';
import { Link } from 'react-router-dom';

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
}> = ({ onThemeChange }) => {
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
  };
  const items: MenuProps['items'] = [
    getItem(
      <Link to="/">
        <img height={69} src={icon} />
      </Link>,
      'brand'
    ),
    getItem(
      <Link to="/video">Convert videos</Link>,
      'sub1',
      <VideoCameraOutlined />
    ),

    getItem(
      <Link to="/image">Convert images</Link>,
      'sub2',
      <FileImageOutlined />
    ),

    getItem(
      'Account',
      'grp',
      null,
      [getItem('Log in', '13', <LoginOutlined />)],
      'group'
    ),
    getItem(
      <Switch
        onChange={onThemeChange}
        checkedChildren="Dark"
        unCheckedChildren="Light"
      />,
      'switch'
    ),
  ];
  return (
    <Menu
      onClick={onClick}
      style={{ width: 256, height: '100%', paddingTop: 10 }}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      items={items}
    />
  );
};
export default SideMenu;
