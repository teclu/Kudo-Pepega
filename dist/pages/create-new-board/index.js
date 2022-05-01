import React from "../../../_snowpack/pkg/react.js";
import {Col, Row} from "../../../_snowpack/pkg/antd.js";
import BoardDetailsForm from "./components/BoardDetailsForm.js";
import ContentContainer from "../../shared/components/content-container/index.js";
import HelpSection from "./components/HelpSection.js";
const CreateNewBoard = () => /* @__PURE__ */ React.createElement(ContentContainer, null, /* @__PURE__ */ React.createElement(Row, {
  gutter: 24
}, /* @__PURE__ */ React.createElement(Col, {
  span: 24,
  lg: 12
}, /* @__PURE__ */ React.createElement(HelpSection, null)), /* @__PURE__ */ React.createElement(Col, {
  span: 24,
  lg: 12
}, /* @__PURE__ */ React.createElement(BoardDetailsForm, null))));
export default CreateNewBoard;
