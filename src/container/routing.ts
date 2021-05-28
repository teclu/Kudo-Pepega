import type { PathDetails, RouteDetails } from 'src/shared/types';
import About from '../pages/about';
import Board from '../pages/board';
import CreateNewBoard from '../pages/create-new-board';

const ABOUT_PATH: PathDetails = {
  name: 'About',
  path: '/',
};

const BOARD_PATH: PathDetails = {
  name: 'Board',
  path: '/board',
};

const CREATE_NEW_BOARD_PATH: PathDetails = {
  name: 'Create New Board',
  path: '/create-new-board',
};

export const MENU_ITEMS: Array<PathDetails> = [
  ABOUT_PATH,
  CREATE_NEW_BOARD_PATH,
];

export const ROUTE_ITEMS: Array<RouteDetails> = [
  {
    ...ABOUT_PATH,
    exact: true,
    component: About,
  },
  {
    ...BOARD_PATH,
    exact: false,
    component: Board,
  },
  {
    ...CREATE_NEW_BOARD_PATH,
    exact: true,

    component: CreateNewBoard,
  },
];
