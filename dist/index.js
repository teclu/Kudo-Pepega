import * as __SNOWPACK_ENV__ from '../_snowpack/env.js';
import.meta.env = __SNOWPACK_ENV__;

import React from "../_snowpack/pkg/react.js";
import ReactDOM from "../_snowpack/pkg/react-dom/client.js";
import Container from "./container/index.js";
import "../_snowpack/pkg/antd/dist/antd.css.proxy.js";
const element = document.getElementById("root");
const root = ReactDOM.createRoot(element);
root.render(/* @__PURE__ */ React.createElement(Container, null));
if (undefined /* [snowpack] import.meta.hot */ ) {
  undefined /* [snowpack] import.meta.hot */ .accept();
}
