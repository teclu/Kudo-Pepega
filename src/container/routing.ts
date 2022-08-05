import type { PathDetails, RouteDetails } from '../_shared/types';
import Landing from '../pages/landing';
// import Board from '../pages/board';
// import CreateNewBoard from '../pages/create-new-board';
import Error from '../pages/error';

export const LANDING_PATH: PathDetails = {
  name: 'Landing',
  path: '/',
};

export const ABOUT_PATH: PathDetails = {
  name: 'About',
  path: '/',
};

export const BOARD_PATH: PathDetails = {
  name: 'Board',
  path: '/board',
};

export const CREATE_NEW_BOARD_PATH: PathDetails = {
  name: 'Create New Board',
  path: '/create-new-board',
};

export const ERROR_PATH: PathDetails = {
  name: 'Error',
  path: '*', // Match all other (invalid) routes.
};

export const ROOT_PATH: PathDetails = LANDING_PATH;

export const PATHS: Array<PathDetails> = [];

export const ROUTE_ITEMS: Array<RouteDetails> = [
  {
    ...LANDING_PATH,
    component: Landing,
  },
  {
    ...ERROR_PATH,
    component: Error,
  },
];
