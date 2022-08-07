import Papa from 'papaparse';

import type { CardMessage } from '../types';

/**
 * Fetches data from the spreadsheet and format them into Card Messages.
 * @returns {Array<CardMessage>} Card Messages from the spreadsheet.
 */
const fetchCardMessages = (
  spreadsheetUrl: string,
): Promise<Array<CardMessage>> =>
  fetch(spreadsheetUrl)
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
    .then((value: string): Array<CardMessage> => {
      const spreadsheetRows: Array<Array<string>> =
        Papa.parse<Array<string>>(value).data;
      spreadsheetRows.shift(); // Remove the header row.
      return spreadsheetRows
        .map((row: Array<string>): CardMessage => {
          row.shift(); // Remove the timestamp column.
          return {
            author: row[0].trim(),
            content: row[1].trim(),
          };
        })
        .filter(
          // Filter away empty rows (if any).
          (cardMessage: CardMessage): boolean =>
            cardMessage.author.length > 0 && cardMessage.content.length > 0,
        );
    })
    .catch((error: Error): Promise<Array<CardMessage>> => {
      console.error(error);
      return Promise.reject([]);
    });

export default fetchCardMessages;
