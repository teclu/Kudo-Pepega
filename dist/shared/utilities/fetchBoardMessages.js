import Papa from "../../../_snowpack/pkg/papaparse.js";
const fetchBoardMessages = (spreadsheetUrl) => fetch(spreadsheetUrl).then((response) => {
  if (response.ok) {
    return response.text();
  }
  const error = {
    name: `Error ${response.status}`,
    message: `Failed to retrieve data from ${spreadsheetUrl}`
  };
  throw error;
}).then((value) => {
  const spreadsheetRows = Papa.parse(value).data;
  spreadsheetRows.shift();
  return spreadsheetRows.map((row) => {
    row.shift();
    return {
      author: row[0].trim(),
      content: row[1].trim()
    };
  }).filter((boardMessage) => boardMessage.author.length > 0 && boardMessage.content.length > 0);
}).catch((error) => {
  console.error(error);
  return Promise.reject([]);
});
export default fetchBoardMessages;
