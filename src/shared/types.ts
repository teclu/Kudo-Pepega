export type BoardDetails = {
  title: string;
  formId: string;
  spreadsheetId: string;
};

export type BoardMessage = {
  author: string;
  content: string;
};

export type PathDetails = {
  name: string;
  path: string;
};

export type RouteDetails = {
  exact: boolean;
  component: () => JSX.Element;
} & PathDetails;
