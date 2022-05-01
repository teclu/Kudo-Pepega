import type { Rule } from 'antd/lib/form';

export type BoardDetails = {
  title: string;
  formId: string;
  formEntryParameters: string; // e.g. '1009329229,2083246063'
  spreadsheetId: string;
};

export type BoardMessage = {
  author: string;
  content: string;
};

export type FormField = {
  name: string;
  label: string;
  rules?: Array<Rule>;
  placeholder?: string;
  value?: string;
};

export type PathDetails = {
  name: string;
  path: string;
};

export type RouteDetails = {
  component: () => JSX.Element;
} & PathDetails;
