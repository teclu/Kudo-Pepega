import React from "../../../_snowpack/pkg/react.js";
import {Link} from "../../../_snowpack/pkg/react-router-dom.js";
import {Layout, Menu} from "../../../_snowpack/pkg/antd.js";
import {PATHS} from "../routing.js";
import s from "../s.module.css.proxy.js";
const MENU_ITEMS = PATHS.map(({name, path}, index) => ({
  key: index,
  title: name,
  label: /* @__PURE__ */ React.createElement(Link, {
    to: path
  }, name)
}));
const Header = () => /* @__PURE__ */ React.createElement(Layout.Header, null, /* @__PURE__ */ React.createElement(Link, {
  className: s.logo,
  to: "/"
}, "Kudo Pepega"), /* @__PURE__ */ React.createElement(Menu, {
  className: s.menu,
  items: MENU_ITEMS,
  mode: "horizontal",
  selectedKeys: [],
  theme: "dark"
}));
export default Header;
