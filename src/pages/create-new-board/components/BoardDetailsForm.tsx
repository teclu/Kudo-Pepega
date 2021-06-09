import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Card, Form, Input } from 'antd';
import type { Rule } from 'antd/lib/form';
import type * as H from 'history';

import {
  GOOGLE_DOCS_URL,
  PATTERN_FORM,
  PATTERN_SPREADSHEET,
} from '../../../shared/constants';
import { BOARD_PATH } from '../../../container/routing';
import type { FormField, BoardDetails } from '../../../shared/types';

import s from '../s.module.scss';

type FormData = {
  title: string;
  formUrl: string;
  spreadsheetUrl: string;
};

const IS_REQUIRED: Rule = {
  required: true,
  message: 'This field is required.',
};

const IS_FORM_URL: Rule = {
  pattern: PATTERN_FORM,
  message: 'Invalid Google Form URL detected.',
};

const IS_SHEET_URL: Rule = {
  pattern: PATTERN_SPREADSHEET,
  message: 'Invalid Google Sheet URL detected.',
};

const FORM_FIELDS: Array<FormField> = [
  {
    name: 'title',
    label: 'Title',
    rules: [IS_REQUIRED],
    placeholder: 'Happy Birthday to John Sekiro',
  },
  {
    name: 'formUrl',
    label: 'Google Form Pre-Filled Link',
    rules: [IS_REQUIRED, IS_FORM_URL],
    placeholder: `${GOOGLE_DOCS_URL}/forms/d/e/<form_id>/viewform`,
  },
  {
    name: 'spreadsheetUrl',
    label: 'Google Sheet Link (.csv)',
    rules: [IS_REQUIRED, IS_SHEET_URL],
    placeholder: `${GOOGLE_DOCS_URL}/spreadsheets/d/<spreadsheet_id>/edit?usp=sharing`,
  },
];

const BoardDetailsForm = (): JSX.Element => {
  const history: H.History<H.LocationState> = useHistory<H.LocationState>();

  /*
   * Redirect to Board with the provided Board Details.
   */
  const onCreateNewBoardClick = (formData: FormData): void => {
    const formIdMatch: RegExpMatchArray | null =
      formData.formUrl.match(PATTERN_FORM);
    const spreadsheetIdMatch: RegExpMatchArray | null =
      formData.spreadsheetUrl.match(PATTERN_SPREADSHEET);
    const boardDetails: BoardDetails = {
      title: formData.title,
      formId: formIdMatch ? formIdMatch[1] : '',
      formEntryParameters: formIdMatch
        ? `${formIdMatch[4]},${formIdMatch[6]}`
        : '',
      spreadsheetId: spreadsheetIdMatch ? spreadsheetIdMatch[1] : '',
    };
    const queryParameters: URLSearchParams = new URLSearchParams(boardDetails);
    history.push(`${BOARD_PATH.path}?${queryParameters.toString()}`);
  };

  return (
    <Card title="Create New Board">
      <Form colon={false} layout="vertical" onFinish={onCreateNewBoardClick}>
        {FORM_FIELDS.map(
          (formField: FormField, index: number): JSX.Element => (
            <Form.Item
              key={index}
              name={formField.name}
              label={formField.label}
              rules={formField.rules}
              validateFirst={true}
            >
              <Input placeholder={formField.placeholder} allowClear />
            </Form.Item>
          ),
        )}
        <Form.Item className={s.formItemSubmit}>
          <Button type="primary" htmlType="submit">
            Create New Board
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default BoardDetailsForm;
