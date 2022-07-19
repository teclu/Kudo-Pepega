import React from 'react';
import ReactDOM from 'react-dom/client';

import Container from './container';

import 'antd/dist/antd.min.css';
import 'easymde/dist/easymde.min.css';

const element: HTMLElement = document.getElementById('root') as HTMLElement;
const root: ReactDOM.Root = ReactDOM.createRoot(element);
root.render(
  <React.StrictMode>
    <Container />
  </React.StrictMode>,
);
