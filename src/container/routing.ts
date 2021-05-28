import About from '../pages/about';
import Home from '../pages/home';

export type RouteDetails = {
  exact: boolean;
  name: string;
  path: string;
  renderElement: () => JSX.Element;
};

export const routes: Array<RouteDetails> = [
  {
    exact: true,
    name: 'Home',
    path: '/',
    renderElement: Home,
  },
  {
    exact: false,
    name: 'About',
    path: '/about',
    renderElement: About,
  },
];
