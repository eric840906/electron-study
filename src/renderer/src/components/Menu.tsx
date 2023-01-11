import {
  FileImageOutlined,
  SyncOutlined,
  LoginOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import icon from '../../../../assets/images/20078.svg';
import { Menu } from 'antd';
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

const items: MenuProps['items'] = [
  getItem(
    <Link to="/">
      <img height={69} src={icon} />
    </Link>,
    'brand'
  ),
  getItem(<Link to="/video">Compress videos</Link>, 'sub1', <SyncOutlined />),

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
];

export default (() => {
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
  };

  return (
    <Menu
      onClick={onClick}
      style={{ width: 256 }}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      items={items}
      theme="light"
    />
  );
}) as React.FC;