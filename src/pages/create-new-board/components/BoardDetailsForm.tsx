import React from 'react';
import { Button, Form, Input } from 'antd';
import type { Rule } from 'antd/lib/form';

import type { BoardDetails } from 'src/shared/types';

const IS_REQUIRED: Rule = {
  required: true,
  message: 'This field is required.',
};

const IS_FORM_URL: Rule = {
  // Should only have 2 entry query parameters.
  pattern:
    /^https\:\/\/docs\.google\.com\/forms\/(.+)\/viewform\?usp=pp_url(\&entry\.([0-9]+)\=[^&=]+){2}$/,
  message: 'Invalid Google Form URL detected.',
};

const IS_SHEET_URL: Rule = {
  pattern:
    /^https\:\/\/docs\.google\.com\/spreadsheets\/(.+)\/pub\?output=csv$/,
  message: 'Invalid Google Sheet URL detected.',
};

type FormField = {
  name: string;
  label: string;
  rules: Array<Rule>;
  placeholder: string;
};

const FORM_FIELDS: Array<FormField> = [
  {
    name: 'title',
    label: 'Title',
    rules: [IS_REQUIRED],
    placeholder: 'e.g. Happy Birthday to John Sekiro',
  },
  {
    name: 'formUrl',
    label: 'Google Form Pre-Filled Link',
    rules: [IS_REQUIRED, IS_FORM_URL],
    placeholder:
      'e.g. https://docs.google.com/forms/<long_string>/viewform?usp=pp_url&entry.123=-&entry.456=-',
  },
  {
    name: 'sheetUrl',
    label: 'Google Sheet Link (.csv)',
    rules: [IS_REQUIRED, IS_SHEET_URL],
    placeholder:
      'e.g. https://docs.google.com/spreadsheets/<long_string>/pub?output=csv',
  },
];

const BoardDetailsForm = (): JSX.Element => {
  // To-do: Format these values and pass it elsewhere...
  const onCreateNewBoardClick = (boardDetails: BoardDetails): void => {
    console.debug(boardDetails);
  };

  return (
    <Form
      colon={false}
      labelAlign="left"
      layout="vertical"
      onFinish={onCreateNewBoardClick}
    >
      {FORM_FIELDS.map(
        (formField: FormField, index: number): JSX.Element => (
          <Form.Item
            key={index}
            name={formField.name}
            label={formField.label}
            rules={formField.rules}
          >
            <Input placeholder={formField.placeholder} allowClear />
          </Form.Item>
        ),
      )}
      <br />
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Create New Board
        </Button>
      </Form.Item>
    </Form>
  );
};

export default BoardDetailsForm;
