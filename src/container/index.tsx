import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { Layout } from 'antd';

import Content from './components/Content';
import Footer from './components/Footer';
import Header from './components/Header';

import s from './s.module.css';

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
