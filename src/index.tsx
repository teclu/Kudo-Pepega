import React from 'react';
import ReactDOM from 'react-dom';

import Container from './container';

import 'antd/dist/antd.css';

ReactDOM.render(<Container />, document.getElementById('root'));

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://snowpack.dev/concepts/hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept();
}
