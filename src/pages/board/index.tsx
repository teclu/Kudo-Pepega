import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Alert, Input, Skeleton } from 'antd';
import type * as H from 'history';

import type { BoardDetails } from '../../shared/types';
import { ABOUT_PATH, BOARD_PATH } from '../../container/routing';
import fireNotification from '../../shared/notification';
import fetchMessages from './fetch';

const Board = (): JSX.Element => {
  const [boardDetails, setBoardDetails] = React.useState<BoardDetails>();
  const [boardMessages, setBoardMessages] = React.useState<string[][]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const history: H.History<H.LocationState> = useHistory<H.LocationState>();
  const location: H.Location<H.LocationState> = useLocation<H.LocationState>();

  /*
   * Initialise Board Details.
   */
  React.useEffect((): void => {
    // Re-directed from Create A Board.
    if (location.state) {
      setBoardDetails(location.state as BoardDetails);
      return;
    }

    // Check that valid URL Query Parameters are provided.
    const query: URLSearchParams = new URLSearchParams(location.search);
    const title: string | null = query.get('title');
    const formUrl: string | null = query.get('formUrl');
    const spreadsheetUrl: string | null = query.get('spreadsheetUrl');
    if (title && formUrl && spreadsheetUrl) {
      // Re-direct to clear URL Query Parameters from the path.
      history.push(BOARD_PATH.path, {
        title,
        formUrl,
        spreadsheetUrl,
      });
      return;
    }

    // Redirect back to root page.
    fireNotification({ message: 'Invalid Board Configuration', type: 'error' });
    history.push(ABOUT_PATH.path);
  }, [location]);

  /*
   * Retrieve the Board Messages from the Spreadsheet.
   */
  React.useEffect((): void => {
    if (boardDetails) {
      fetchMessages(boardDetails.spreadsheetUrl)
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
          history.push(ABOUT_PATH.path);
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
      <ul>
        <li>
          Title: <Input value={boardDetails.title} readOnly />
        </li>
        <li>
          Form URL: <Input value={boardDetails.formUrl} readOnly />
        </li>
        <li>
          Spreadsheet URL:{' '}
          <Input value={boardDetails.spreadsheetUrl} readOnly />
        </li>
        <li>
          Sharing Link:{' '}
          <Input
            value={`https://www.kudopepe.ga${location.pathname}?title=${boardDetails.title}&formUrl=${boardDetails.formUrl}&spreadsheetUrl=${boardDetails.spreadsheetUrl}`}
            readOnly
          />
        </li>
      </ul>
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
