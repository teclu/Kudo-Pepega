import React from 'react';
import { useHistory } from 'react-router-dom';
import { Skeleton } from 'antd';
import type * as H from 'history';

import { ROOT_PATH } from '../../container/routing';

const Error = (): JSX.Element => {
  const history: H.History<H.LocationState> = useHistory<H.LocationState>();

  /*
   * Redirect back to root page.
   */
  React.useEffect((): void => {
    history.push(ROOT_PATH.path);
  }, [history]);

  return <Skeleton active />;
};

export default Error;
