import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Spin } from 'antd';
import type * as H from 'history';

import type { BoardDetails, BoardMessage } from '../../shared/types';
import { ROOT_PATH, BOARD_PATH } from '../../container/routing';
import BoardMessages from './components/BoardMessages';
import fireNotification from '../../shared/notification';
import fetchBoardMessages from './fetch';

import s from './s.module.css';

const GOOGLE_DOCS_URL: string = 'https://docs.google.com';

const Board = (): JSX.Element => {
  const [boardDetails, setBoardDetails] = React.useState<BoardDetails>();
  const [boardMessages, setBoardMessages] = React.useState<Array<BoardMessage>>(
    [],
  );
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const history: H.History<H.LocationState> = useHistory<H.LocationState>();
  const location: H.Location<H.LocationState> = useLocation<H.LocationState>();

  // To-do: Put this in an info-modal.
  const formUrl: string = React.useMemo((): string => {
    if (boardDetails) {
      return `${GOOGLE_DOCS_URL}/forms/${boardDetails.formId}/viewform`;
    }
    return '';
  }, [boardDetails]);

  // To-do: Put this in an info-modal.
  const spreadsheetUrl: string = React.useMemo((): string => {
    if (boardDetails) {
      return `${GOOGLE_DOCS_URL}/spreadsheets/${boardDetails.spreadsheetId}/pub?output=csv`;
    }
    return '';
  }, [boardDetails]);

  // To-do: Put this in an info-modal.
  const boardUrl: string = React.useMemo((): string => {
    if (boardDetails) {
      return `${window.location.href}?title=${encodeURI(
        boardDetails.title,
      )}&formId=${boardDetails.formId}&spreadsheetId=${
        boardDetails.spreadsheetId
      }`;
    }
    return '';
  }, [boardDetails]);

  /*
   * Initiapse Board Details.
   */
  React.useEffect((): void => {
    // Re-directed from Create A Board.
    if (location.state) {
      setBoardDetails(location.state as BoardDetails);
      return;
    }

    // Check that vapd URL Query Parameters are provided.
    const query: URLSearchParams = new URLSearchParams(location.search);
    const title: string | null = query.get('title');
    const formId: string | null = query.get('formId');
    const spreadsheetId: string | null = query.get('spreadsheetId');
    if (title && formId && spreadsheetId) {
      // Re-direct to clear URL Query Parameters from the path.
      history.push(BOARD_PATH.path, {
        title,
        formId,
        spreadsheetId,
      });
      return;
    }

    // Redirect back to root page.
    fireNotification({ message: 'Invalid Board Configuration', type: 'error' });
    history.push(ROOT_PATH.path);
  }, [location]);

  /*
   * Retrieve the Board Messages from the Spreadsheet.
   */
  React.useEffect((): void => {
    if (boardDetails) {
      fetchBoardMessages(spreadsheetUrl)
        .then((messages: Array<BoardMessage>): void => {
          setBoardMessages(messages);
          setIsLoading(false);
        })
        .catch((error): void => {
          fireNotification({
            message: 'Fetch Error',
            description: error,
            type: 'error',
          });
          history.push(ROOT_PATH.path);
        });
    }
  }, [boardDetails]);

  return (
    <>
      <div className={s.boardHeader}>{boardDetails?.title}</div>
      {isLoading ? (
        <div className={s.spinner}>
          <Spin size="large" />
        </div>
      ) : (
        <BoardMessages boardMessages={boardMessages} />
      )}
    </>
  );
};

export default Board;
