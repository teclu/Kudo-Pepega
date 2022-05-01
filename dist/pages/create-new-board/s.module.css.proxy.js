
export let code = "._formItemSubmit_2suve_1 {\n  margin-bottom: 0px !important;\n}\n\nol {\n  padding-inline-start: 8px;\n}\n\nli {\n  margin-bottom: 8px;\n}\n\n@media screen and (max-width: 992px) {\n  ._helpSection_2suve_14 {\n    margin-bottom: 24px !important;\n  }\n}";
let json = {"formItemSubmit":"_formItemSubmit_2suve_1","helpSection":"_helpSection_2suve_14"};
export default json;

// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}