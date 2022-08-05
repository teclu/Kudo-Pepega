import React from 'react';
import { Spin } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import type { Location, NavigateFunction } from 'react-router-dom';

import type { BoardDetails, BoardMessage } from '../../_shared/types';
import { GOOGLE_DOCS_URL } from '../../_shared/constants';
import { ROOT_PATH } from '../../container/routing';
import AddToBoardModal from './components/AddToBoardModal';
import BoardInformationModal from './components/BoardInformationModal';
import BoardMessages from './components/BoardMessages';
import SlideshowModal from './components/SlideshowDrawer';
import fetchBoardMessages from '../../_shared/utilities/fetchBoardMessages';
import fireNotification from '../../_shared/utilities/notification';
import useWidth from '../../_shared/utilities/useWidth';

import s from './s.module.scss';

const Board = (): JSX.Element => {
  const [boardDetails, setBoardDetails] = React.useState<BoardDetails>();
  const [boardMessages, setBoardMessages] = React.useState<Array<BoardMessage>>(
    [],
  );
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const navigate: NavigateFunction = useNavigate();
  const location: Location = useLocation();
  const { isXsWidth, isSmWidth, isLgWidth, isXlWidth } = useWidth();

  const boardViewOnlyUrl: string = React.useMemo((): string => {
    if (boardDetails) {
      return `${window.location.origin}/board?title=${encodeURI(
        boardDetails.title,
      )}&spreadsheetId=${encodeURI(boardDetails.spreadsheetId)}`;
    }
    return '';
  }, [boardDetails]);

  const boardEditableUrl: string = React.useMemo((): string => {
    if (boardDetails?.formId && boardDetails?.formEntryParameters) {
      return `${boardViewOnlyUrl}&formId=${encodeURI(
        boardDetails.formId,
      )}&formEntryParameters=${encodeURI(boardDetails.formEntryParameters)}`;
    }
    return '';
  }, [boardViewOnlyUrl]);

  const formUrl: string = React.useMemo((): string => {
    if (boardDetails?.formId) {
      return `${GOOGLE_DOCS_URL}/forms/d/e/${boardDetails.formId}/viewform`;
    }
    return '';
  }, [boardDetails?.formId]);

  const spreadsheetUrl: string = React.useMemo((): string => {
    if (boardDetails) {
      return `${GOOGLE_DOCS_URL}/spreadsheets/d/${boardDetails.spreadsheetId}`;
    }
    return '';
  }, [boardDetails?.spreadsheetId]);

  /*
   * Initiapse Board Details.
   */
  React.useEffect((): void => {
    const query: URLSearchParams = new URLSearchParams(location.search);
    const title: string | null = query.get('title');
    const formId: string | null = query.get('formId');
    const formEntryParameters: string | null = query.get('formEntryParameters');
    const spreadsheetId: string | null = query.get('spreadsheetId');

    // Initialise the Board with valid URL Query Parameters.
    if (title && spreadsheetId) {
      setBoardDetails({
        title,
        formId: formId ?? '',
        formEntryParameters: formEntryParameters ?? '',
        spreadsheetId,
      });
      return;
    }
    // Redirect back to root page.
    else {
      fireNotification({
        message: 'Invalid Board Configuration',
        type: 'error',
      });
      navigate(ROOT_PATH.path);
    }
  }, [location]);

  const getBoardMessages = async (): Promise<void> => {
    if (boardDetails) {
      setIsLoading(true);
      try {
        const messages: Array<BoardMessage> = await fetchBoardMessages(
          `${spreadsheetUrl}/gviz/tq?tqx=out:csv`,
        );
        setBoardMessages(messages);
        setIsLoading(false);
      } catch (error) {
        fireNotification({
          message: 'Fetch Error',
          description: String(error),
          type: 'error',
        });
        navigate(ROOT_PATH.path);
      }
    }
  };

  React.useEffect((): void => {
    getBoardMessages();
  }, [boardDetails]);

  return (
    <div>
      <div className={s.boardHeader}>
        <div className={s.boardTitle}>{boardDetails?.title}</div>
        <div>
          <BoardInformationModal
            boardViewOnlyUrl={boardViewOnlyUrl}
            boardEditableUrl={boardEditableUrl}
            formUrl={formUrl}
            spreadsheetUrl={spreadsheetUrl}
          />
        </div>
      </div>
      <div className={s.boardActionButtonsContainer}>
        {formUrl && (
          <AddToBoardModal
            formUrl={formUrl}
            formEntryParameters={boardDetails?.formEntryParameters || '0,0'}
            isXsWidth={isXsWidth}
            isSmWidth={isSmWidth}
            onDoneClickCallback={getBoardMessages}
          />
        )}
        <SlideshowModal boardMessages={boardMessages} />
      </div>
      {isLoading ? (
        <div className={s.spinner}>
          <Spin size="large" />
        </div>
      ) : (
        <BoardMessages
          boardMessages={boardMessages}
          isLgWidth={isLgWidth}
          isXlWidth={isXlWidth}
        />
      )}
    </div>
  );
};

export default Board;
