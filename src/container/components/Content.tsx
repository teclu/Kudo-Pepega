import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';

import type { RouteDetails } from '../../shared/types';
import { ROUTE_ITEMS } from '../routing';

import s from '../s.module.scss';

const Content = (): JSX.Element => (
  <Layout.Content className={s.content}>
    <Routes>
      {ROUTE_ITEMS.map(
        (item: RouteDetails, index: number): JSX.Element => (
          <Route key={index} path={item.path} element={<item.component />} />
        ),
      )}
    </Routes>
  </Layout.Content>
);

export default Content;
