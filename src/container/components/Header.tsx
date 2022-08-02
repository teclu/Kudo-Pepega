import { Layout, Menu } from 'antd';
import type { ItemType } from 'antd/lib/menu/hooks/useItems';
import { Link } from 'react-router-dom';

import type { PathDetails } from '../../shared/types';
import { PATHS } from '../routing';

import s from '../s.module.scss';

const MENU_ITEMS: Array<ItemType> = PATHS.map(
  ({ name, path }: PathDetails, index: number): ItemType => ({
    key: index,
    title: name,
    label: <Link to={path}>{name}</Link>,
  }),
);

const Header = (): JSX.Element => (
  <Layout.Header className={s.header}>
    <Link className={s.logo} to="/">
      Kudo Pepega
    </Link>
    <Menu
      className={s.menu}
      items={MENU_ITEMS}
      mode="horizontal"
      selectedKeys={[]} // Prevent selection of Menu Items.
      theme="dark"
    />
  </Layout.Header>
);

export default Header;
