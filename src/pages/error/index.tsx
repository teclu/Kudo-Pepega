import React from 'react';
import { Skeleton } from 'antd';
import { useNavigate } from 'react-router';
import type { NavigateFunction } from 'react-router';

import { ROOT_PATH } from '../../container/routing';

const Error = (): JSX.Element => {
  const navigate: NavigateFunction = useNavigate();

  /*
   * Redirect back to root page.
   */
  React.useEffect((): void => {
    navigate(ROOT_PATH.path);
  }, [history]);

  return <Skeleton active />;
};

export default Error;
