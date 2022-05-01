import React from "../../_snowpack/pkg/react.js";
import {BrowserRouter as Router} from "../../_snowpack/pkg/react-router-dom.js";
import {Layout} from "../../_snowpack/pkg/antd.js";
import Content from "./components/Content.js";
import Footer from "./components/Footer.js";
import Header from "./components/Header.js";
import s from "./s.module.css.proxy.js";
const Container = () => /* @__PURE__ */ React.createElement(Layout, {
  className: s.layout
}, /* @__PURE__ */ React.createElement(Router, null, /* @__PURE__ */ React.createElement(Header, null), /* @__PURE__ */ React.createElement(Content, null)), /* @__PURE__ */ React.createElement(Footer, null));
export default Container;
