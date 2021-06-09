export const GOOGLE_DOCS_URL: string = 'https://docs.google.com';

export const PATTERN_FORM: RegExp =
  /^https\:\/\/docs\.google\.com\/forms\/d\/e\/(.+)\/viewform\?(usp=pp_url\&)?(entry\.([0-9]+)=.+)(\&entry\.([0-9]+)=.+)$/;

export const PATTERN_SPREADSHEET: RegExp =
  /^https\:\/\/docs\.google\.com\/spreadsheets\/d\/(.+)\/edit(\?usp=sharing)?$/;
