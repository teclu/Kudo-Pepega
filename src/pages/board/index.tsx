import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Alert, Input, Skeleton } from 'antd';
import type * as H from 'history';

import type { BoardDetails } from '../../shared/types';
import { ROOT_PATH, BOARD_PATH } from '../../container/routing';
import fireNotification from '../../shared/notification';
import fetchMessages from './fetch';

const GOOGLE_DOCS_URL: string = 'https://docs.google.com';

const Board = (): JSX.Element => {
  const [boardDetails, setBoardDetails] = React.useState<BoardDetails>();
  const [boardMessages, setBoardMessages] = React.useState<string[][]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const history: H.History<H.LocationState> = useHistory<H.LocationState>();
  const location: H.Location<H.LocationState> = useLocation<H.LocationState>();

  const formUrl: string = React.useMemo((): string => {
    if (boardDetails) {
      return `${GOOGLE_DOCS_URL}/forms/${boardDetails.formId}/viewform`;
    }
    return '';
  }, [boardDetails]);

  const spreadsheetUrl: string = React.useMemo((): string => {
    if (boardDetails) {
      return `${GOOGLE_DOCS_URL}/spreadsheets/${boardDetails.spreadsheetId}/pub?output=csv`;
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
      fetchMessages(spreadsheetUrl)
        .then((messages: string[][]): void => {
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

  return isLoading || !boardDetails ? (
    <Skeleton active />
  ) : (
    <>
      <Alert
        type="warning"
        message={
          <span>
            If you are seeing this, <b>VI VON ZULUL</b>. On a serious note, this
            is still under development... there's still much to do.
          </span>
        }
        showIcon
      />
      <br />
      <h1>Board Details</h1>
      <p>
        Title
        <Input value={boardDetails.title} readOnly />
      </p>
      <p>
        Form URL
        <Input value={formUrl} readOnly />
      </p>
      <p>
        Spreadsheet URL
        <Input value={spreadsheetUrl} readOnly />
      </p>
      <p>
        Sharing Link
        <Input
          value={`${window.location.href}?title=${boardDetails.title}&formId=${boardDetails.formId}&spreadsheetId=${boardDetails.spreadsheetId}`}
          readOnly
        />
      </p>
      <br />
      <h1>Messages</h1>
      {boardMessages.map(
        (message: string[], index: number): JSX.Element => (
          <p key={index}>
            <b>{message[0]}</b>: {message[1]}
          </p>
        ),
      )}
    </>
  );
};

export default Board;
