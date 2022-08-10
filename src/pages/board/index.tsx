import { useEffect } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';

import { CARD_PATH } from '../../container/routing';

/*
 * Redirects users that are using the old route to the new route.
 */
const Board = (): JSX.Element => {
  const navigate: NavigateFunction = useNavigate();

  useEffect((): void => {
    navigate(`${CARD_PATH.path}${window.location.search}`);
  }, []);

  return <></>;
};

export default Board;
