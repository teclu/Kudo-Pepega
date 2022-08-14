import Papa from 'papaparse';
import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';

import { GOOGLE_DOCS_URL } from '../constants';
import { CardMessage } from '../types';
import { fireNotification } from '../utilities';

export enum CardQueryKey {
  CARD_SPREADSHEET = 'CARD_SPREADSHEET',
}

type GetCardMessagesParams = {
  spreadsheetId: string;
};

export const useGetCardMessages = (
  params: GetCardMessagesParams,
  options?: UseQueryOptions<string, string, CardMessage[]>,
): UseQueryResult<CardMessage[], string> => {
  const { spreadsheetId } = params;
  const spreadsheetUrl = `${GOOGLE_DOCS_URL}/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:csv`;
  return useQuery<string, string, CardMessage[]>(
    [CardQueryKey.CARD_SPREADSHEET, params],
    async (): Promise<string> => {
      const response: Response = await fetch(spreadsheetUrl);
      if (response.ok) {
        const data: string = await response.text();
        return Promise.resolve(data);
      }
      return Promise.reject(response.status);
    },
    {
      ...options,
      onError: (error: string): void => {
        fireNotification({
          message: `Fetch Error (${error})`,
          description: `Failed to load Spreadsheet.`,
          type: 'error',
        });
        options?.onError?.(error);
      },
      select: (data: string): CardMessage[] => {
        const spreadsheetRows: Array<Array<string>> =
          Papa.parse<Array<string>>(data).data;
        spreadsheetRows.shift(); // Remove the header row.
        const cardMessages: CardMessage[] = spreadsheetRows
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
        return cardMessages;
      },
    },
  );
};
