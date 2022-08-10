import { useEffect } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';

import { ROOT_PATH } from '../../container/routing';

const Error = (): JSX.Element => {
  const navigate: NavigateFunction = useNavigate();

  /*
   * Redirect back to root page.
   */
  useEffect((): void => {
    navigate(ROOT_PATH.path);
  }, [history]);

  return <></>;
};

export default Error;
