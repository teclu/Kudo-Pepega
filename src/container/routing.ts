import { PathDetails, RouteDetails } from '../_shared/types';
import About from '../pages/about';
import Board from '../pages/board';
import Card from '../pages/card';
import Create from '../pages/create';
import Error from '../pages/error';
import Landing from '../pages/home';

export const REPOSITORY_PREFIX = '/Kudo-Pepega';

export const ABOUT_PATH: PathDetails = {
  name: 'About',
  path: `${REPOSITORY_PREFIX}/about`,
};

// Handle redirect from old path to new path.
export const BOARD_PATH: PathDetails = {
  name: 'Card',
  path: `${REPOSITORY_PREFIX}/board`,
};

export const CARD_PATH: PathDetails = {
  name: 'Card',
  path: `${REPOSITORY_PREFIX}/card`,
};

export const CREATE_PATH: PathDetails = {
  name: 'Create',
  path: `${REPOSITORY_PREFIX}/create`,
};

export const ERROR_PATH: PathDetails = {
  name: 'Error',
  path: `${REPOSITORY_PREFIX}/*`, // Match all other (invalid) routes.
};

export const HOME_PATH: PathDetails = {
  name: 'Home',
  path: `${REPOSITORY_PREFIX}/`,
};

export const ROOT_PATH: PathDetails = HOME_PATH;

export const ROUTE_ITEMS: Array<RouteDetails> = [
  {
    ...ABOUT_PATH,
    component: About,
  },
  {
    ...BOARD_PATH,
    component: Board,
  },
  {
    ...CARD_PATH,
    component: Card,
  },
  {
    ...CREATE_PATH,
    component: Create,
  },
  {
    ...ERROR_PATH,
    component: Error,
  },
  {
    ...HOME_PATH,
    component: Landing,
  },
];
