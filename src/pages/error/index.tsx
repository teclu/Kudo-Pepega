import React from 'react';
import { Skeleton } from 'antd';
import { useNavigate } from 'react-router-dom';
import type { NavigateFunction } from 'react-router-dom';

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
