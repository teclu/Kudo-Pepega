import About from "../pages/about/index.js";
import Board from "../pages/board/index.js";
import CreateNewBoard from "../pages/create-new-board/index.js";
import Error from "../pages/error/index.js";
export const ABOUT_PATH = {
  name: "About",
  path: "/"
};
export const BOARD_PATH = {
  name: "Board",
  path: "/board"
};
export const CREATE_NEW_BOARD_PATH = {
  name: "Create New Board",
  path: "/create-new-board"
};
export const ERROR_PATH = {
  name: "Error",
  path: "*"
};
export const ROOT_PATH = ABOUT_PATH;
export const PATHS = [ABOUT_PATH, CREATE_NEW_BOARD_PATH];
export const ROUTE_ITEMS = [
  {
    ...ABOUT_PATH,
    component: About
  },
  {
    ...BOARD_PATH,
    component: Board
  },
  {
    ...CREATE_NEW_BOARD_PATH,
    component: CreateNewBoard
  },
  {
    ...ERROR_PATH,
    component: Error
  }
];
