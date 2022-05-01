import React from "../../../../_snowpack/pkg/react.js";
import ReactMarkdown from "../../../../_snowpack/pkg/react-markdown.js";
import {Card, Col, Row} from "../../../../_snowpack/pkg/antd.js";
import ContentContainer from "../../../shared/components/content-container/index.js";
import s from "../s.module.css.proxy.js";
const MAX_SPAN = 24;
const getColumns = (isLgWidth, isXlWidth) => isXlWidth ? 3 : isLgWidth ? 2 : 1;
const BoardMessages = ({
  boardMessages,
  isLgWidth,
  isXlWidth
}) => {
  const boardMessageElements = React.useMemo(() => boardMessages.map((message, index) => /* @__PURE__ */ React.createElement(Card, {
    key: index,
    className: s.boardMessageCard
  }, /* @__PURE__ */ React.createElement(ReactMarkdown, {
    className: s.boardMessageContent,
    children: message.content
  }), /* @__PURE__ */ React.createElement("div", {
    className: s.boardMessageAuthor
  }, message.author))), [boardMessages]);
  const boardMessagesLayoutElement = React.useMemo(() => {
    const generateColumnElements = (columns) => {
      const columnElements = [];
      for (let i = 0; i < columns; i++) {
        const span = MAX_SPAN / columns;
        columnElements.push(/* @__PURE__ */ React.createElement(Col, {
          key: i,
          span
        }, columns > 1 ? boardMessageElements.filter((element, index) => index % columns === i) : boardMessageElements));
      }
      return columnElements;
    };
    return generateColumnElements(getColumns(isLgWidth, isXlWidth));
  }, [isLgWidth, isXlWidth]);
  return /* @__PURE__ */ React.createElement(ContentContainer, null, /* @__PURE__ */ React.createElement(Row, {
    gutter: 16,
    justify: boardMessages.length > 0 ? void 0 : "space-between"
  }, boardMessages.length > 0 ? boardMessagesLayoutElement : /* @__PURE__ */ React.createElement(Col, {
    span: MAX_SPAN / getColumns(isLgWidth, isXlWidth)
  }, /* @__PURE__ */ React.createElement(Card, {
    className: s.boardMessageCard
  }, /* @__PURE__ */ React.createElement("img", {
    className: s.addToBoardPlaceholderImage,
    src: "https://cdn.betterttv.net/emote/6089df1239b5010444d081e2/3x"
  }), /* @__PURE__ */ React.createElement("p", null, "It seems that there aren't any messages posted to the board...", " ", /* @__PURE__ */ React.createElement("em", null, "yet"), "."), /* @__PURE__ */ React.createElement("p", null, "Click on ", /* @__PURE__ */ React.createElement("b", null, "Add to Board"), " and write something nice!")))));
};
export default BoardMessages;
