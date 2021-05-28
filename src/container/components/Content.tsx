import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Card, Layout } from 'antd';

import type { RouteDetails } from 'src/shared/types';
import { ROUTE_ITEMS } from '../routing';

import s from '../s.module.css';

const Content = (): JSX.Element => (
  <Layout.Content className={s.content}>
    <Card className={s.card}>
      <Switch>
        {ROUTE_ITEMS.map(
          (item: RouteDetails, index: number): JSX.Element => (
            <Route
              key={index}
              exact={item.exact}
              path={item.path}
              component={item.component}
            />
          ),
        )}
      </Switch>
    </Card>
  </Layout.Content>
);

export default Content;
