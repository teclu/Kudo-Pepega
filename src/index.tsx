import React from 'react';
import ReactDOM from 'react-dom/client';

import Container from './container';

import 'antd/dist/antd.css';

const element: HTMLElement = document.getElementById('root') as HTMLElement;
const root: ReactDOM.Root = ReactDOM.createRoot(element);
root.render(<Container />);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://snowpack.dev/concepts/hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept();
}
