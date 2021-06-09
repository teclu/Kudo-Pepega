import React from 'react';
import { Card, Table } from 'antd';
import type { ColumnProps } from 'antd/lib/table';

import s from '../s.module.scss';

type QuestionDetails = {
  key: string;
  type: string;
  required: boolean;
};

const DATA_SOURCE: Array<QuestionDetails> = [
  {
    key: 'Author',
    type: 'Short answer',
    required: true,
  },
  {
    key: 'Content',
    type: 'Paragraph',
    required: true,
  },
];

const STATIC_COLUMNS: Array<ColumnProps<QuestionDetails>> = [
  {
    title: 'Title',
    dataIndex: 'key',
  },
  {
    title: 'Type',
    dataIndex: 'type',
    width: '7.5rem',
  },
  {
    title: 'Required',
    dataIndex: 'required',
    width: '5rem',
    render: (value: any, record: QuestionDetails, index: number): string =>
      record.required ? 'Yes' : 'No',
  },
];

const HelpSection = (): JSX.Element => (
  <Card title="Setup Google Forms and Sheets" className={s.helpSection}>
    <ol>
      <li>
        Create a new Google Form{' '}
        <a href="https://docs.google.com/forms" target="_blank">
          here
        </a>
        .
      </li>
      <li>
        Under <b>Settings</b> {'>'} <b>General</b>, ensure that{' '}
        <b>Limit to 1 response</b> and <b>Edit after submit</b> are checked.
        This step is optional, but encouraged if you want submissions to be
        easily editable by users.
      </li>
      <li>
        Add only the following questions in a top-to-bottom order with the
        specified configuration:
      </li>
      <Table
        size="small"
        columns={STATIC_COLUMNS}
        dataSource={DATA_SOURCE}
        bordered={true}
        pagination={false}
        scroll={{ x: true }}
      />
      <br />
      <li>
        Click on <b>Send</b> {'>'} <b>Link</b>. Copy the link and paste it into
        the <b>Google Form Link</b> field.
      </li>
      <li>
        Go back to the form editing page. Click on <b>Reponses</b> {'>'}{' '}
        <b>Create spreadsheet</b> (<i>the Google Sheets icon</i>). This should
        open up a new window of your form's spreadsheet.
      </li>
      <li>
        Click on <b>Share</b>. Under <b>Get Link</b>, click on{' '}
        <b>Change to anyone with the link</b>. Copy the link, and paste it into
        the <b>Google Sheet Link (.csv)</b> field.
      </li>
    </ol>
  </Card>
);

export default HelpSection;
