import React from 'react';
import { Card, Table } from 'antd';
import type { ColumnProps } from 'antd/lib/table';

import { GOOGLE_DOCS_URL } from '../../../shared/constants';

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
    title: 'Title (Optional)',
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
        Create a new Google Form <a href={`${GOOGLE_DOCS_URL}/forms`}>here</a>.
      </li>
      <li>
        (<i>Optional</i>) Under <b>Settings</b> {'>'} <b>General</b>, ensure
        that <b>Limit to 1 response</b> and <b>Edit after submit</b> are
        checked. This is encouraged if you want submissions to be easily
        editable by users.
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
        Click on <b>More</b> (<i>3 vertical dots icon</i>) {'>'}{' '}
        <b>Get pre-filled link</b>. This should open up a new window; fill in
        all of the fields with any text, click on <b>Get link</b>, copy the
        generated pre-filled link and paste it into the{' '}
        <b>Google Form Pre-Filled Link</b> field. This pre-filed link should
        have 2 entry query parameters.
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
