import React from 'react';
import { Button, Modal, Table } from 'antd';
import QuestionOutlined from '@ant-design/icons/QuestionOutlined';
import type { ColumnProps } from 'antd/lib/table';

import s from '../s.module.css';

type QuestionDetails = {
  key: string;
  type: string;
  required: boolean;
};

const DATA_SOURCE: Array<QuestionDetails> = [
  {
    key: 'Name',
    type: 'Short answer',
    required: true,
  },
  {
    key: 'Message',
    type: 'Paragraph',
    required: true,
  },
];

const STATIC_COLUMNS: Array<ColumnProps<QuestionDetails>> = [
  {
    title: 'Order',
    width: '4rem',
    render: (value: any, record: QuestionDetails, index: number): number =>
      index + 1,
  },
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

const HelpModal = (): JSX.Element => {
  const [isVisible, setIsVisible] = React.useState<boolean>(false);

  const showModal = (): void => setIsVisible(true);

  const hideModal = (): void => setIsVisible(false);

  return (
    <>
      <Button
        type="default"
        size="small"
        shape="circle"
        className={s.buttonHelp}
        icon={<QuestionOutlined />}
        onClick={showModal}
      />
      <Modal
        title="How to Setup Google Forms and Sheets"
        footer={
          <Button type="default" onClick={hideModal}>
            Close
          </Button>
        }
        onCancel={hideModal}
        visible={isVisible}
        style={{ top: '89px' }}
        width={650}
      >
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
            editable by users.
          </li>
          <li>Add the following questions with the specified configuration:</li>
          <Table
            size="small"
            columns={STATIC_COLUMNS}
            dataSource={DATA_SOURCE}
            bordered={true}
            pagination={false}
          />
          <br />
          <li>
            Click on <b>Send</b> {'>'} <b>Link</b>. Copy the link and paste it
            into the <b>Google Form Link</b> field.
          </li>
          <li>
            Go back to the form editing page. Click on <b>Reponses</b> {'>'}{' '}
            <b>Create spreadsheet</b> (<i>the Google Sheets icon</i>). This
            should open up a new window of your form's spreadsheet.
          </li>
          <li>
            Click on <b>Share</b>. Under <b>Get Link</b>, click on{' '}
            <b>Change to anyone with the link</b>. Copy the link, and paste it
            into the <b>Google Sheet Link (.csv)</b> field.
          </li>
        </ol>
      </Modal>
    </>
  );
};

export default HelpModal;
