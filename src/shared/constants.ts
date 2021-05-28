// Should only have 2 entry query parameters.
export const PATTERN_FORM: RegExp =
  /^https\:\/\/docs\.google\.com\/forms\/(.+)\/viewform\?usp=pp_url(\&entry\.([0-9]+)\=[^&=]+){2}$/;

export const PATTERN_SHEETS: RegExp =
  /^https\:\/\/docs\.google\.com\/spreadsheets\/(.+)\/pub\?output=csv$/;
