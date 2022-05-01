import React from "../../../../_snowpack/pkg/react.js";
import {Card, Table} from "../../../../_snowpack/pkg/antd.js";
import {GOOGLE_DOCS_URL} from "../../../shared/constants.js";
import s from "../s.module.css.proxy.js";
const DATA_SOURCE = [
  {
    key: "Author",
    type: "Short answer",
    required: true
  },
  {
    key: "Content",
    type: "Paragraph",
    required: true
  }
];
const STATIC_COLUMNS = [
  {
    title: "Title (Optional)",
    dataIndex: "key"
  },
  {
    title: "Type",
    dataIndex: "type",
    width: "7.5rem"
  },
  {
    title: "Required",
    dataIndex: "required",
    width: "5rem",
    render: (value, record, index) => record.required ? "Yes" : "No"
  }
];
const HelpSection = () => /* @__PURE__ */ React.createElement(Card, {
  title: "Setup Google Forms and Sheets",
  className: s.helpSection
}, /* @__PURE__ */ React.createElement("ol", null, /* @__PURE__ */ React.createElement("li", null, "Create a new Google Form ", /* @__PURE__ */ React.createElement("a", {
  href: `${GOOGLE_DOCS_URL}/forms`
}, "here"), "."), /* @__PURE__ */ React.createElement("li", null, "(", /* @__PURE__ */ React.createElement("i", null, "Optional"), ") Under ", /* @__PURE__ */ React.createElement("b", null, "Settings"), " ", ">", " ", /* @__PURE__ */ React.createElement("b", null, "General"), ", ensure that ", /* @__PURE__ */ React.createElement("b", null, "Limit to 1 response"), " and ", /* @__PURE__ */ React.createElement("b", null, "Edit after submit"), " are checked. This is encouraged if you want submissions to be easily editable by users."), /* @__PURE__ */ React.createElement("li", null, "Add only the following questions in a top-to-bottom order with the specified configuration:"), /* @__PURE__ */ React.createElement(Table, {
  size: "small",
  columns: STATIC_COLUMNS,
  dataSource: DATA_SOURCE,
  bordered: true,
  pagination: false,
  scroll: {x: true}
}), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("li", null, "Click on ", /* @__PURE__ */ React.createElement("b", null, "More"), " (", /* @__PURE__ */ React.createElement("i", null, "3 vertical dots icon"), ") ", ">", " ", /* @__PURE__ */ React.createElement("b", null, "Get pre-filled link"), ". This should open up a new window; fill in all of the fields with any text, click on ", /* @__PURE__ */ React.createElement("b", null, "Get link"), ", copy the generated pre-filled link and paste it into the", " ", /* @__PURE__ */ React.createElement("b", null, "Google Form Pre-Filled Link"), " field. This pre-filed link should have 2 entry query parameters."), /* @__PURE__ */ React.createElement("li", null, "Go back to the form editing page. Click on ", /* @__PURE__ */ React.createElement("b", null, "Reponses"), " ", ">", " ", /* @__PURE__ */ React.createElement("b", null, "Create spreadsheet"), " (", /* @__PURE__ */ React.createElement("i", null, "the Google Sheets icon"), "). This should open up a new window of your form's spreadsheet."), /* @__PURE__ */ React.createElement("li", null, "Click on ", /* @__PURE__ */ React.createElement("b", null, "Share"), ". Under ", /* @__PURE__ */ React.createElement("b", null, "Get Link"), ", click on", " ", /* @__PURE__ */ React.createElement("b", null, "Change to anyone with the link"), ". Copy the link, and paste it into the ", /* @__PURE__ */ React.createElement("b", null, "Google Sheet Link (.csv)"), " field.")));
export default HelpSection;
