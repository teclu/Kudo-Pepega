import { Layout } from 'antd';

import s from '../s.module.scss';

const Footer = (): JSX.Element => (
  <Layout.Footer className={s.footer}>
    Made with &#10084; and &#129474; by{' '}
    <a href="https://github.com/teclu">Teclu</a>
  </Layout.Footer>
);

export default Footer;
