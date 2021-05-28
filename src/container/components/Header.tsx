import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';

import type { PathDetails } from 'src/shared/types';
import { MENU_ITEMS } from '../routing';

import s from '../s.module.css';

const Header = (): JSX.Element => (
  <Layout.Header>
    <Link className={s.logo} to="/">
      Kudo Pepega
    </Link>
    <Menu
      className={s.menu}
      mode="horizontal"
      selectedKeys={[]} // Prevent selection of Menu Items.
      theme="dark"
    >
      {MENU_ITEMS.map(
        (item: PathDetails, index: number): JSX.Element => (
          <Menu.Item key={index}>
            <Link to={item.path}>{item.name}</Link>
          </Menu.Item>
        ),
      )}
    </Menu>
  </Layout.Header>
);

export default Header;
