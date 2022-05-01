import React from "../../../../_snowpack/pkg/react.js";
import ReactMarkdown from "../../../../_snowpack/pkg/react-markdown.js";
import {Button, Drawer, Row, Col, InputNumber, Space} from "../../../../_snowpack/pkg/antd.js";
import {PlayCircleOutlined} from "../../../../_snowpack/pkg/@ant-design/icons.js";
import s from "../s.module.css.proxy.js";
const TITLE = "Slideshow";
const SlideshowDrawer = ({
  boardMessages
}) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [slideIndex, setSlideIndex] = React.useState(0);
  const boardMessageElements = React.useMemo(() => boardMessages.map((message, index) => /* @__PURE__ */ React.createElement("div", {
    key: index,
    className: s.boardMessageSlide
  }, /* @__PURE__ */ React.createElement(ReactMarkdown, {
    className: s.boardMessageContent,
    children: message.content
  }), /* @__PURE__ */ React.createElement("div", {
    className: s.boardMessageAuthor
  }, message.author))), [boardMessages]);
  const hideDrawer = () => setIsVisible(false);
  const showDrawer = () => setIsVisible(true);
  const onSlideChange = (value) => setSlideIndex(value);
  const onPreviousSlideClick = () => {
    if (slideIndex > 0) {
      onSlideChange(slideIndex - 1);
    }
  };
  const onNextSlideClick = () => {
    if (slideIndex < boardMessages.length) {
      onSlideChange(slideIndex + 1);
    }
  };
  const onJumpToLastSlideClick = () => onSlideChange(boardMessages.length - 1);
  const onJumpToSlideBlur = (event) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value)) {
      onSlideChange(value < boardMessages.length ? value - 1 : boardMessages.length - 1);
    }
  };
  const onJumpToSlideEnter = () => {
    const button = document.createElement("button");
    document.body.appendChild(button);
    button.focus();
    document.body.removeChild(button);
  };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Button, {
    type: "default",
    shape: "round",
    size: "large",
    className: s.boardActionButton,
    icon: /* @__PURE__ */ React.createElement(PlayCircleOutlined, null),
    disabled: boardMessages.length === 0,
    onClick: showDrawer
  }, TITLE), /* @__PURE__ */ React.createElement(Drawer, {
    visible: isVisible,
    closable: false,
    destroyOnClose: true,
    placement: "left",
    width: "100%",
    className: "slideshowDrawer",
    title: /* @__PURE__ */ React.createElement(Row, {
      align: "middle",
      justify: "space-between"
    }, /* @__PURE__ */ React.createElement(Col, null, /* @__PURE__ */ React.createElement("h3", {
      className: s.slideshowTitle
    }, TITLE)), /* @__PURE__ */ React.createElement(Col, null, /* @__PURE__ */ React.createElement(Button, {
      type: "default",
      onClick: hideDrawer,
      className: s.slideshowActionButton
    }, "Close"))),
    footer: /* @__PURE__ */ React.createElement(Row, {
      justify: "space-between"
    }, /* @__PURE__ */ React.createElement(Col, {
      span: 8
    }, /* @__PURE__ */ React.createElement(Button, {
      type: "default",
      onClick: onPreviousSlideClick,
      className: s.slideshowStepButton,
      disabled: slideIndex === 0
    }, "Previous")), /* @__PURE__ */ React.createElement(Col, null, /* @__PURE__ */ React.createElement(Space, {
      size: "small",
      className: s.slideshowJumpToSlideContainer
    }, /* @__PURE__ */ React.createElement(InputNumber, {
      min: 1,
      max: boardMessages.length,
      value: slideIndex + 1,
      className: s.slideshowJumpToSlideInput,
      onBlur: onJumpToSlideBlur,
      onPressEnter: onJumpToSlideEnter
    }), "/", /* @__PURE__ */ React.createElement("a", {
      onClick: onJumpToLastSlideClick
    }, /* @__PURE__ */ React.createElement("b", null, boardMessages.length)))), /* @__PURE__ */ React.createElement(Col, {
      span: 8
    }, /* @__PURE__ */ React.createElement(Button, {
      type: "default",
      onClick: onNextSlideClick,
      className: s.slideshowStepButton,
      disabled: slideIndex === boardMessages.length - 1
    }, "Next")))
  }, boardMessageElements[slideIndex]));
};
export default SlideshowDrawer;
