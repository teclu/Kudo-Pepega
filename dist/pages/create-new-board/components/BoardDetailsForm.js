import React from "../../../../_snowpack/pkg/react.js";
import {useNavigate} from "../../../../_snowpack/pkg/react-router-dom.js";
import {Button, Card, Form, Input} from "../../../../_snowpack/pkg/antd.js";
import {
  GOOGLE_DOCS_URL,
  PATTERN_FORM,
  PATTERN_SPREADSHEET
} from "../../../shared/constants.js";
import {BOARD_PATH} from "../../../container/routing.js";
import s from "../s.module.css.proxy.js";
const IS_REQUIRED = {
  required: true,
  message: "This field is required."
};
const IS_FORM_URL = {
  pattern: PATTERN_FORM,
  message: "Invalid Google Form URL detected."
};
const IS_SHEET_URL = {
  pattern: PATTERN_SPREADSHEET,
  message: "Invalid Google Sheet URL detected."
};
const FORM_FIELDS = [
  {
    name: "title",
    label: "Title",
    rules: [IS_REQUIRED],
    placeholder: "Happy Birthday to John Sekiro"
  },
  {
    name: "formUrl",
    label: "Google Form Pre-Filled Link",
    rules: [IS_REQUIRED, IS_FORM_URL],
    placeholder: `${GOOGLE_DOCS_URL}/forms/d/e/<form_id>/viewform?usp=pp_url&entry.<numbers>=<field_input>&entry.<numbers>=<field_input>`
  },
  {
    name: "spreadsheetUrl",
    label: "Google Sheet Link (.csv)",
    rules: [IS_REQUIRED, IS_SHEET_URL],
    placeholder: `${GOOGLE_DOCS_URL}/spreadsheets/d/<spreadsheet_id>/edit?usp=sharing`
  }
];
const BoardDetailsForm = () => {
  const navigate = useNavigate();
  const onCreateNewBoardClick = (formData) => {
    const formIdMatch = formData.formUrl.match(PATTERN_FORM);
    const spreadsheetIdMatch = formData.spreadsheetUrl.match(PATTERN_SPREADSHEET);
    const boardDetails = {
      title: formData.title,
      formId: formIdMatch ? formIdMatch[1] : "",
      formEntryParameters: formIdMatch ? `${formIdMatch[4]},${formIdMatch[6]}` : "",
      spreadsheetId: spreadsheetIdMatch ? spreadsheetIdMatch[1] : ""
    };
    const queryParameters = new URLSearchParams(boardDetails);
    navigate(`${BOARD_PATH.path}?${queryParameters.toString()}`);
  };
  return /* @__PURE__ */ React.createElement(Card, {
    title: "Create New Board"
  }, /* @__PURE__ */ React.createElement(Form, {
    colon: false,
    layout: "vertical",
    onFinish: onCreateNewBoardClick
  }, FORM_FIELDS.map((formField, index) => /* @__PURE__ */ React.createElement(Form.Item, {
    key: index,
    name: formField.name,
    label: formField.label,
    rules: formField.rules,
    validateFirst: true
  }, /* @__PURE__ */ React.createElement(Input, {
    placeholder: formField.placeholder,
    allowClear: true
  }))), /* @__PURE__ */ React.createElement(Form.Item, {
    className: s.formItemSubmit
  }, /* @__PURE__ */ React.createElement(Button, {
    type: "primary",
    htmlType: "submit"
  }, "Create New Board"))));
};
export default BoardDetailsForm;
