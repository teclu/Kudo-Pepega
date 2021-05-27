import React from 'react';
import { Card, Image, Layout, Menu } from 'antd';
import { GithubOutlined } from '@ant-design/icons';

import Home from '../pages/home';

import s from './s.module.css';

/*
 * To-do: Probably have to do up some components here.
 */
const Container = (): JSX.Element => {
  return (
    <Layout className={s.layout}>
      <Layout.Header>
        <Menu mode="horizontal" theme="dark">
          <Menu.Item key="GitHub" icon={<GithubOutlined />}>
            <a href="https://github.com/teclu/kudopepega">GitHub Repository</a>
          </Menu.Item>
        </Menu>
      </Layout.Header>
      <Layout.Content className={s.content}>
        <Card>
          <Home />
        </Card>
      </Layout.Content>
      <Layout.Footer className={s.footer}>
        Made with &#10084; and &#129474; by{' '}
        <a href="https://github.com/teclu">Teclu</a>
      </Layout.Footer>
    </Layout>
  );
};

export default Container;
