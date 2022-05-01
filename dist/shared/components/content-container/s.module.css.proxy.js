
export let code = "._container_1wfmi_1 {\n  margin: 12px 12px !important;\n}\n\n@media screen and (min-width: 768px) {\n  ._container_1wfmi_1 {\n    margin: 24px 24px 0px !important;\n  }\n}\n@media screen and (min-width: 992px) {\n  ._container_1wfmi_1 {\n    margin: 24px 48px 0px !important;\n  }\n}";
let json = {"container":"_container_1wfmi_1"};
export default json;

// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}