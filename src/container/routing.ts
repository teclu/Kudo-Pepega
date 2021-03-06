import type { PathDetails, RouteDetails } from '../shared/types';
import About from '../pages/about';
import Board from '../pages/board';
import CreateNewBoard from '../pages/create-new-board';
import Error from '../pages/error';

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

export const ROOT_PATH: PathDetails = ABOUT_PATH;

export const PATHS: Array<PathDetails> = [ABOUT_PATH, CREATE_NEW_BOARD_PATH];

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
    ...CREATE_NEW_BOARD_PATH,
    component: CreateNewBoard,
  },
  {
    ...ERROR_PATH,
    component: Error,
  },
];
