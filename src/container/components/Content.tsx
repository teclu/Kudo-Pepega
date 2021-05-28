import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Card, Layout } from 'antd';

import { RouteDetails, routes } from '../routing';

import s from '../s.module.css';

const Content = (): JSX.Element => (
  <Layout.Content className={s.content}>
    <Card className={s.card}>
      <Switch>
        {routes.map(
          (route: RouteDetails, index: number): JSX.Element => (
            <Route key={index} exact={route.exact} path={route.path}>
              {route.renderElement}
            </Route>
          ),
        )}
      </Switch>
    </Card>
  </Layout.Content>
);

export default Content;
