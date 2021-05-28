import Papa from 'papaparse';

/**
 * Fetch and parses the messages from the spreadsheet.
 * @returns {Array<Array<string>>} Messages from the spreadsheet: [name, message]
 */
const fetchMessages = (spreadsheetId: string): Promise<Array<Array<string>>> =>
  fetch(spreadsheetId)
    .then((response: Response): Promise<string> => response.text())
    .then((value: string): Array<Array<string>> => {
      const messages: Array<Array<string>> =
        Papa.parse<Array<string>>(value).data;
      messages.shift(); // Remove the header
      return messages.map((message: Array<string>): Array<string> => {
        message.shift(); // Remove the timestamp
        return message;
      });
    });

export default fetchMessages;
