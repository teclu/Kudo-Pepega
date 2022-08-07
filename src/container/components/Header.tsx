import { Layout } from 'antd';
import { Link } from 'react-router-dom';

import type { PathDetails } from '../../_shared/types';
import { ABOUT_PATH, CREATE_NEW_GROUP_CARD_PATH, HOME_PATH } from '../routing';

import s from '../s.module.scss';

const MENU_ITEMS: Array<JSX.Element> = [
  HOME_PATH,
  ABOUT_PATH,
  CREATE_NEW_GROUP_CARD_PATH,
].map(
  ({ name, path }: PathDetails, index: number): JSX.Element => (
    <li key={index}>
      <Link to={path}>{name}</Link>
    </li>
  ),
);

const Header = (): JSX.Element => {
  return (
    <Layout.Header className={s.header}>
      <Link className={s.brand} to="/">
        Kudo Pepega
      </Link>
      <ul className={s.menu}>{MENU_ITEMS}</ul>
    </Layout.Header>
  );
};

export default Header;
