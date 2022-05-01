import React from "../../../../_snowpack/pkg/react.js";
import {Button, Form, Input, Modal, notification, Row, Tooltip} from "../../../../_snowpack/pkg/antd.js";
import {
  CopyOutlined,
  QuestionOutlined,
  LinkOutlined
} from "../../../../_snowpack/pkg/@ant-design/icons.js";
import s from "../s.module.css.proxy.js";
const TITLE = "Board Information";
const BoardInformationModal = ({
  boardViewOnlyUrl,
  boardEditableUrl,
  formUrl,
  spreadsheetUrl
}) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const formFields = React.useMemo(() => {
    const formFields2 = [
      {
        name: "boardViewOnlyUrl",
        label: "Board URL (View Only)",
        value: boardViewOnlyUrl
      }
    ];
    if (boardEditableUrl) {
      formFields2.push({
        name: "boardEditableUrl",
        label: "Board URL (Editable)",
        value: boardEditableUrl
      });
    }
    if (formUrl) {
      formFields2.push({
        name: "formUrl",
        label: "Form URL",
        value: formUrl
      });
    }
    formFields2.push({
      name: "spreadsheetUrl",
      label: "Spreadsheet URL",
      value: spreadsheetUrl
    });
    return formFields2;
  }, [boardViewOnlyUrl, formUrl, spreadsheetUrl]);
  const hideModal = () => setIsVisible(false);
  const showModal = () => setIsVisible(true);
  const onCopyUrlClick = (label, id) => {
    const element = document.querySelector(`#${id}`);
    if (element) {
      element.select();
      document.execCommand("copy");
      notification["success"]({
        message: `${label} copied!`,
        placement: "bottomLeft",
        duration: 3
      });
    }
  };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Tooltip, {
    placement: "top",
    title: TITLE
  }, /* @__PURE__ */ React.createElement(Button, {
    type: "default",
    shape: "circle",
    size: "small",
    className: s.boardHeaderActionButton,
    icon: /* @__PURE__ */ React.createElement(QuestionOutlined, null),
    onClick: showModal
  })), /* @__PURE__ */ React.createElement(Modal, {
    title: TITLE,
    visible: isVisible,
    closable: false,
    destroyOnClose: true,
    width: 675,
    footer: /* @__PURE__ */ React.createElement(Button, {
      type: "default",
      onClick: hideModal
    }, "Close")
  }, /* @__PURE__ */ React.createElement(Form, {
    colon: false,
    layout: "vertical"
  }, formFields.map((formField, index) => {
    const copyElement = /* @__PURE__ */ React.createElement(Tooltip, {
      placement: "top",
      title: "Copy URL"
    }, /* @__PURE__ */ React.createElement(Button, {
      type: "link",
      size: "small",
      onClick: () => onCopyUrlClick(formField.label, formField.name),
      icon: /* @__PURE__ */ React.createElement(CopyOutlined, null)
    }));
    const linkElement = /* @__PURE__ */ React.createElement(Tooltip, {
      placement: "top",
      title: "Open URL"
    }, /* @__PURE__ */ React.createElement(Button, {
      type: "link",
      size: "small",
      href: formField.value,
      icon: /* @__PURE__ */ React.createElement(LinkOutlined, null)
    }));
    return /* @__PURE__ */ React.createElement(Form.Item, {
      key: index,
      label: formField.label
    }, /* @__PURE__ */ React.createElement(Input, {
      id: formField.name,
      value: formField.value,
      addonAfter: !formField.name.includes("board") ? /* @__PURE__ */ React.createElement(Row, {
        className: s.boardInformationActions,
        justify: "space-between"
      }, copyElement, linkElement) : copyElement,
      readOnly: true
    }));
  }))));
};
export default BoardInformationModal;
