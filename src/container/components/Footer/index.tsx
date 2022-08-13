import { Layout } from 'antd';

import ThemeSwitch from '../ThemeSwitch';

import s from './s.module.scss';

const Footer = (): JSX.Element => (
  <Layout.Footer className={s.footer}>
    <div className={s.footerText}>
      Made with &#10084; and &#129474; by{' '}
      <a href="https://github.com/teclu">Teclu</a>
    </div>
    <ThemeSwitch className={s.themeSwitch} />
  </Layout.Footer>
);

export default Footer;
