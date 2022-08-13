import { Layout } from 'antd';
import { Link } from 'react-router-dom';

import { PathDetails } from '../../../_shared/types';
import { ABOUT_PATH, CREATE_PATH, HOME_PATH } from '../../routing';
import ThemeSwitch from '../ThemeSwitch';

import s from './s.module.scss';

const MENU_ITEMS: Array<JSX.Element> = [HOME_PATH, ABOUT_PATH, CREATE_PATH].map(
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
      <ThemeSwitch className={s.themeSwitch} />
      <ul className={s.menu}>{MENU_ITEMS}</ul>
    </Layout.Header>
  );
};

export default Header;
