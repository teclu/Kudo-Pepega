import React from "../../../_snowpack/pkg/react.js";
import {Route, Routes} from "../../../_snowpack/pkg/react-router-dom.js";
import {Layout} from "../../../_snowpack/pkg/antd.js";
import {ROUTE_ITEMS} from "../routing.js";
import s from "../s.module.css.proxy.js";
const Content = () => /* @__PURE__ */ React.createElement(Layout.Content, {
  className: s.content
}, /* @__PURE__ */ React.createElement(Routes, null, ROUTE_ITEMS.map((item, index) => /* @__PURE__ */ React.createElement(Route, {
  key: index,
  path: item.path,
  element: /* @__PURE__ */ React.createElement(item.component, null)
}))));
export default Content;
