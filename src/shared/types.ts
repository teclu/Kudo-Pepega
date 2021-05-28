export type BoardDetails = {
  title: string;
  formUrl: string;
  spreadsheetUrl: string;
};

export type PathDetails = {
  name: string;
  path: string;
};

export type RouteDetails = {
  exact: boolean;
  component: () => JSX.Element;
} & PathDetails;
