import { Layout } from 'antd';
import { BrowserRouter as Router } from 'react-router-dom';

import Content from './components/Content';
import Footer from './components/Footer';
import Header from './components/Header';

import s from './s.module.scss';

const Container = (): JSX.Element => (
  <Layout className={s.layout}>
    <Router>
      <Header />
      <Content />
    </Router>
    <Footer />
  </Layout>
);

export default Container;
