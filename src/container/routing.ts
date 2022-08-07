import type { PathDetails, RouteDetails } from '../_shared/types';
import Landing from '../pages/home';
// import Board from '../pages/board';
// import CreateNewBoard from '../pages/create-new-board';
import Error from '../pages/error';
import About from '../pages/about';
import CreateNewBoard from '../pages/create-new-board';

export const ABOUT_PATH: PathDetails = {
  name: 'About',
  path: '/about',
};

// Old Path.
export const BOARD_PATH: PathDetails = {
  name: 'Board',
  path: '/board',
};

export const CARD_PATH: PathDetails = {
  name: 'Card',
  path: '/card',
};

export const CREATE_NEW_GROUP_CARD_PATH: PathDetails = {
  name: 'Create',
  path: '/create',
};

export const ERROR_PATH: PathDetails = {
  name: 'Error',
  path: '*', // Match all other (invalid) routes.
};

export const HOME_PATH: PathDetails = {
  name: 'Home',
  path: '/',
};

export const ROOT_PATH: PathDetails = HOME_PATH;

export const ROUTE_ITEMS: Array<RouteDetails> = [
  {
    ...ABOUT_PATH,
    component: About,
  },
  {
    ...CREATE_NEW_GROUP_CARD_PATH,
    component: CreateNewBoard,
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
