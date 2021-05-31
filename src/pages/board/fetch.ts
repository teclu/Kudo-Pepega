import Papa from 'papaparse';

import type { BoardMessage } from '../../shared/types';

/**
 * Fetches data from the spreadsheet and format them into Board Messages.
 * @returns {Array<BoardMessage>} Board Messages from the spreadsheet.
 */
const fetchBoardMessages = (
  spreadsheetUrl: string,
): Promise<Array<BoardMessage>> =>
  fetch(spreadsheetUrl, {
    headers: {
      'Cache-Control': 'no-store',
    },
  })
    .then((response: Response): Promise<string> => {
      if (response.ok) {
        return response.text();
      }
      const error: Error = {
        name: `Error ${response.status}`,
        message: `Failed to retrieve data from ${spreadsheetUrl}`,
      };
      throw error;
    })
    .then((value: string): Array<BoardMessage> => {
      const spreadsheetRows: Array<Array<string>> =
        Papa.parse<Array<string>>(value).data;
      spreadsheetRows.shift(); // Remove the header row.
      return spreadsheetRows
        .map((row: Array<string>): BoardMessage => {
          row.shift(); // Remove the timestamp column.
          return {
            author: row[0].trim(),
            content: row[1].trim(),
          };
        })
        .filter(
          (boardMessage: BoardMessage): boolean =>
            boardMessage.author.length > 0 && boardMessage.content.length > 0,
        );
    })
    .catch((error: Error): Promise<Array<BoardMessage>> => {
      console.error(error);
      return Promise.reject([]);
    });

export default fetchBoardMessages;
