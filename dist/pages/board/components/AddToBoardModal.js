import React from "../../../../_snowpack/pkg/react.js";
import ReactMarkdown from "../../../../_snowpack/pkg/react-markdown.js";
import {SimpleMdeReact} from "../../../../_snowpack/pkg/react-simplemde-editor.js";
import {
  Alert,
  Button,
  Card,
  Col,
  Form,
  Input,
  Modal,
  notification,
  Popconfirm,
  Row,
  Steps
} from "../../../../_snowpack/pkg/antd.js";
import {
  PlusOutlined,
  CaretLeftOutlined,
  CaretRightOutlined,
  EditOutlined,
  EyeOutlined,
  SendOutlined
} from "../../../../_snowpack/pkg/@ant-design/icons.js";
import "../../../../_snowpack/pkg/easymde/dist/easymde.min.css.proxy.js";
import s from "../s.module.css.proxy.js";
const AUTHOR_PLACEHOLDER = "Anonymous";
const CONTENT_PLACEHOLDER = "*UHM*... I didn't write anything!";
const STEPS = [
  "Write Message",
  "Confirm Preview",
  "Submit to Form"
];
const STEP_ICONS = [
  /* @__PURE__ */ React.createElement(EditOutlined, null),
  /* @__PURE__ */ React.createElement(EyeOutlined, null),
  /* @__PURE__ */ React.createElement(SendOutlined, null)
];
const MAX_STEP = STEPS.length - 1;
const TITLE = "Add to Board";
const BoardModal = ({
  formUrl,
  formEntryParameters,
  isXsWidth,
  isSmWidth,
  onDoneClickCallback
}) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [isPopconfirmVisible, setIsPopconfirmVisible] = React.useState(false);
  const [step, setStep] = React.useState(0);
  const [author, setAuthor] = React.useState("");
  const [content, setContent] = React.useState("");
  const simpleMdeOptions = React.useMemo(() => ({
    maxHeight: "400px",
    spellChecker: false,
    status: false
  }), []);
  const prefiledFormUrl = React.useMemo(() => {
    const entryParameterIds = formEntryParameters.split(",");
    const queryParameters = new URLSearchParams({
      [`entry.${entryParameterIds[0]}`]: author.trim() ? author.trim() : AUTHOR_PLACEHOLDER,
      [`entry.${entryParameterIds[1]}`]: content.trim()
    });
    return `${formUrl}?${queryParameters.toString()}`;
  }, [author, content]);
  const showPopconfirm = () => setIsPopconfirmVisible(true);
  const hidePopconfirm = () => setIsPopconfirmVisible(false);
  const hideModal = () => {
    if (isPopconfirmVisible) {
      setIsPopconfirmVisible(false);
    }
    setIsVisible(false);
    setStep(0);
    setAuthor("");
    setContent("");
  };
  const showModal = () => setIsVisible(true);
  const onStepChange = (value) => setStep(value);
  const onPreviousStepClick = () => {
    if (step > 0) {
      onStepChange(step - 1);
    }
  };
  const onNextStepClick = () => {
    if (step < MAX_STEP) {
      onStepChange(step + 1);
    }
  };
  const onAuthorBlur = (event) => setAuthor(event.target.value);
  const onContentChange = (value) => setContent(value);
  const onCancelClick = () => {
    if (step < MAX_STEP && (!!author.trim() || !!content.trim())) {
      showPopconfirm();
      return;
    }
    if (step === MAX_STEP) {
      onDoneClickCallback();
    }
    hideModal();
  };
  const onCopyContentClick = () => {
    const element = document.createElement("textarea");
    element.textContent = content;
    document.body.appendChild(element);
    element.select();
    document.execCommand("copy");
    document.body.removeChild(element);
    notification["success"]({
      message: "Message content copied!",
      placement: "bottomLeft",
      duration: 3
    });
  };
  const renderContent = () => {
    switch (step) {
      case 1:
        return /* @__PURE__ */ React.createElement("div", {
          className: s.addToBoardPreviewMessage
        }, !content.trim() ? /* @__PURE__ */ React.createElement(Alert, {
          type: "error",
          message: /* @__PURE__ */ React.createElement("span", null, "You have to write some content first! Go back to the", " ", /* @__PURE__ */ React.createElement("a", {
            onClick: onPreviousStepClick
          }, "previous step"), "."),
          showIcon: true
        }) : /* @__PURE__ */ React.createElement(Alert, {
          type: "info",
          message: /* @__PURE__ */ React.createElement("span", null, "This is what your message will look like. If you are happy with the result and no longer want to make any more edits, you can continue to the", " ", /* @__PURE__ */ React.createElement("a", {
            onClick: onNextStepClick
          }, "next step"), ".")
        }), /* @__PURE__ */ React.createElement(Card, {
          className: s.boardMessageCard
        }, /* @__PURE__ */ React.createElement(ReactMarkdown, {
          className: s.boardMessageContent,
          children: content.trim() ? content.trim() : CONTENT_PLACEHOLDER
        }), /* @__PURE__ */ React.createElement("div", {
          className: s.boardMessageAuthor
        }, author.trim() ? author.trim() : AUTHOR_PLACEHOLDER)));
      case MAX_STEP:
        return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", {
          className: s.addToBoardContent
        }, /* @__PURE__ */ React.createElement(Alert, {
          type: "info",
          message: /* @__PURE__ */ React.createElement("ul", {
            className: s.submitToFormList
          }, /* @__PURE__ */ React.createElement("li", null, "If the form is still accepting responses, you should see the field(s) already filled in for you."), /* @__PURE__ */ React.createElement("li", null, "If the field(s) were not filled in, you will have to fill them in manually. Click", " ", /* @__PURE__ */ React.createElement("a", {
            onClick: onCopyContentClick
          }, /* @__PURE__ */ React.createElement("b", null, "here")), " ", "to copy the message content."), /* @__PURE__ */ React.createElement("li", null, "If the form is no longer accepting responses and you think this is a mistake, contact the owner of the form."), /* @__PURE__ */ React.createElement("li", null, "Remember to click on ", /* @__PURE__ */ React.createElement("b", null, "Submit"), " before closing the modal!"))
        })), /* @__PURE__ */ React.createElement("iframe", {
          id: s.addToBoardGoogleFormIframe,
          className: s.addToBoardGoogleFormIframe,
          src: prefiledFormUrl
        }));
      case 0:
      default:
        return /* @__PURE__ */ React.createElement("div", {
          className: s.addToBoardContent
        }, /* @__PURE__ */ React.createElement(Form, {
          colon: false,
          layout: "vertical"
        }, /* @__PURE__ */ React.createElement(Form.Item, {
          label: "Author"
        }, /* @__PURE__ */ React.createElement(Input, {
          defaultValue: author,
          placeholder: AUTHOR_PLACEHOLDER,
          onBlur: onAuthorBlur,
          allowClear: true
        })), /* @__PURE__ */ React.createElement(Form.Item, {
          label: "Content",
          required: true
        }, /* @__PURE__ */ React.createElement(SimpleMdeReact, {
          value: content,
          options: simpleMdeOptions,
          onChange: onContentChange
        }))));
    }
  };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Button, {
    type: "default",
    shape: "round",
    size: "large",
    className: s.boardActionButton,
    icon: /* @__PURE__ */ React.createElement(PlusOutlined, null),
    onClick: showModal
  }, TITLE), /* @__PURE__ */ React.createElement(Modal, {
    title: TITLE,
    visible: isVisible,
    closable: false,
    destroyOnClose: true,
    width: 675,
    bodyStyle: {padding: "0px"},
    footer: /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Popconfirm, {
      title: /* @__PURE__ */ React.createElement("div", {
        className: s.popconfirmContent
      }, "Are you sure you want to close? This will", " ", /* @__PURE__ */ React.createElement("b", null, "discard all changes"), "."),
      okText: "Yes",
      cancelText: "No",
      visible: isPopconfirmVisible,
      onConfirm: hideModal,
      onCancel: hidePopconfirm
    }, /* @__PURE__ */ React.createElement(Button, {
      type: step < MAX_STEP ? "default" : "primary",
      onClick: onCancelClick
    }, step < 2 ? "Cancel" : "Done")))
  }, /* @__PURE__ */ React.createElement(Row, {
    className: s.addToBoardSteps,
    justify: "space-around"
  }, /* @__PURE__ */ React.createElement(Col, {
    xs: 0,
    sm: 0,
    md: 2
  }, /* @__PURE__ */ React.createElement(Button, {
    type: "default",
    shape: "circle",
    className: s.addToBoardStepsButton,
    icon: /* @__PURE__ */ React.createElement(CaretLeftOutlined, null),
    disabled: step === 0,
    onClick: onPreviousStepClick
  })), /* @__PURE__ */ React.createElement(Col, {
    xs: 24,
    sm: 24,
    md: 20
  }, /* @__PURE__ */ React.createElement(Steps, {
    current: step,
    onChange: onStepChange,
    direction: isSmWidth ? "horizontal" : "vertical",
    progressDot: true
  }, STEPS.map((title, index) => {
    const titleToRender = !isSmWidth ? /* @__PURE__ */ React.createElement(React.Fragment, null, STEP_ICONS[index], " ", title) : /* @__PURE__ */ React.createElement(React.Fragment, null, title, /* @__PURE__ */ React.createElement("br", null), STEP_ICONS[index]);
    return /* @__PURE__ */ React.createElement(Steps.Step, {
      key: `step-${index}`,
      title: index === step ? /* @__PURE__ */ React.createElement("b", null, titleToRender) : titleToRender,
      disabled: index === MAX_STEP && !content.trim()
    });
  }))), /* @__PURE__ */ React.createElement(Col, {
    xs: 0,
    sm: 0,
    md: 2
  }, /* @__PURE__ */ React.createElement(Button, {
    type: "default",
    shape: "circle",
    className: s.addToBoardStepsButton,
    icon: /* @__PURE__ */ React.createElement(CaretRightOutlined, null),
    disabled: step === 1 && !content.trim() || step === MAX_STEP,
    onClick: onNextStepClick
  }))), renderContent()));
};
export default BoardModal;
