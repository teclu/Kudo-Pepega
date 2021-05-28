export type BoardDetails = {
  title: string;
  formUrl: string;
  sheetUrl: string;
};

export type PathDetails = {
  name: string;
  path: string;
};

export type RouteDetails = {
  exact: boolean;
  component: () => JSX.Element;
} & PathDetails;
