
export let code = "._footer_1vl02_1 {\n  background: transparent !important;\n  text-align: center;\n}\n\n._layout_1vl02_6 {\n  background: #f0f0f0 !important;\n  background-image: url(\"images/background.png\") !important;\n  background-size: 10% !important;\n  min-height: 100vh !important;\n}\n\n._logo_1vl02_13 {\n  color: #ffffff;\n  float: left;\n  font-size: 16px;\n  font-weight: 600;\n  height: 64px;\n  line-height: 60px;\n  text-align: center;\n  width: 125px;\n}\n\n._logo_1vl02_13:hover {\n  color: #ffffff;\n}\n\n._menu_1vl02_28 {\n  text-align: right !important;\n}\n\n@media screen and (max-width: 576px) {\n  ._logo_1vl02_13 {\n    display: none;\n  }\n\n  ._menu_1vl02_28 {\n    text-align: center !important;\n  }\n}\n.ant-menu-overflow {\n  display: block !important;\n}\n.ant-card.ant-card-bordered {\n  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;\n}";
let json = {"footer":"_footer_1vl02_1","layout":"_layout_1vl02_6","logo":"_logo_1vl02_13","menu":"_menu_1vl02_28"};
export default json;

// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}