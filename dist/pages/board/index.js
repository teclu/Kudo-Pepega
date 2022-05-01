import React from "../../../_snowpack/pkg/react.js";
import {Spin} from "../../../_snowpack/pkg/antd.js";
import {useLocation, useNavigate} from "../../../_snowpack/pkg/react-router-dom.js";
import {GOOGLE_DOCS_URL} from "../../shared/constants.js";
import {ROOT_PATH} from "../../container/routing.js";
import AddToBoardModal from "./components/AddToBoardModal.js";
import BoardInformationModal from "./components/BoardInformationModal.js";
import BoardMessages from "./components/BoardMessages.js";
import SlideshowModal from "./components/SlideshowDrawer.js";
import fetchBoardMessages from "../../shared/utilities/fetchBoardMessages.js";
import fireNotification from "../../shared/utilities/notification.js";
import useWidth from "../../shared/utilities/useWidth.js";
import s from "./s.module.css.proxy.js";
const Board = () => {
  const [boardDetails, setBoardDetails] = React.useState();
  const [boardMessages, setBoardMessages] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const {isXsWidth, isSmWidth, isLgWidth, isXlWidth} = useWidth();
  const boardViewOnlyUrl = React.useMemo(() => {
    if (boardDetails) {
      return `${window.location.origin}/board?title=${encodeURI(boardDetails.title)}&spreadsheetId=${encodeURI(boardDetails.spreadsheetId)}`;
    }
    return "";
  }, [boardDetails]);
  const boardEditableUrl = React.useMemo(() => {
    if (boardDetails?.formId && boardDetails?.formEntryParameters) {
      return `${boardViewOnlyUrl}&formId=${encodeURI(boardDetails.formId)}&formEntryParameters=${encodeURI(boardDetails.formEntryParameters)}`;
    }
    return "";
  }, [boardViewOnlyUrl]);
  const formUrl = React.useMemo(() => {
    if (boardDetails?.formId) {
      return `${GOOGLE_DOCS_URL}/forms/d/e/${boardDetails.formId}/viewform`;
    }
    return "";
  }, [boardDetails?.formId]);
  const spreadsheetUrl = React.useMemo(() => {
    if (boardDetails) {
      return `${GOOGLE_DOCS_URL}/spreadsheets/d/${boardDetails.spreadsheetId}`;
    }
    return "";
  }, [boardDetails?.spreadsheetId]);
  React.useEffect(() => {
    const query = new URLSearchParams(location.search);
    const title = query.get("title");
    const formId = query.get("formId");
    const formEntryParameters = query.get("formEntryParameters");
    const spreadsheetId = query.get("spreadsheetId");
    if (title && spreadsheetId) {
      setBoardDetails({
        title,
        formId: formId ?? "",
        formEntryParameters: formEntryParameters ?? "",
        spreadsheetId
      });
      return;
    } else {
      fireNotification({
        message: "Invalid Board Configuration",
        type: "error"
      });
      navigate(ROOT_PATH.path);
    }
  }, [location]);
  const getBoardMessages = async () => {
    if (boardDetails) {
      setIsLoading(true);
      try {
        const messages = await fetchBoardMessages(`${spreadsheetUrl}/gviz/tq?tqx=out:csv`);
        setBoardMessages(messages);
        setIsLoading(false);
      } catch (error) {
        fireNotification({
          message: "Fetch Error",
          description: String(error),
          type: "error"
        });
        navigate(ROOT_PATH.path);
      }
    }
  };
  React.useEffect(() => {
    getBoardMessages();
  }, [boardDetails]);
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", {
    className: s.boardHeader
  }, /* @__PURE__ */ React.createElement("div", {
    className: s.boardTitle
  }, boardDetails?.title), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(BoardInformationModal, {
    boardViewOnlyUrl,
    boardEditableUrl,
    formUrl,
    spreadsheetUrl
  }))), /* @__PURE__ */ React.createElement("div", {
    className: s.boardActionButtonsContainer
  }, formUrl && /* @__PURE__ */ React.createElement(AddToBoardModal, {
    formUrl,
    formEntryParameters: boardDetails?.formEntryParameters || "0,0",
    isXsWidth,
    isSmWidth,
    onDoneClickCallback: getBoardMessages
  }), /* @__PURE__ */ React.createElement(SlideshowModal, {
    boardMessages
  })), isLoading ? /* @__PURE__ */ React.createElement("div", {
    className: s.spinner
  }, /* @__PURE__ */ React.createElement(Spin, {
    size: "large"
  })) : /* @__PURE__ */ React.createElement(BoardMessages, {
    boardMessages,
    isLgWidth,
    isXlWidth
  }));
};
export default Board;
