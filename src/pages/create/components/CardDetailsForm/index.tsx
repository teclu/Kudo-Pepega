import { Button, Card, Form, Input } from 'antd';
import { Rule } from 'antd/lib/form';
import { NavigateFunction, useNavigate } from 'react-router-dom';

import {
  GOOGLE_DOCS_URL,
  PATTERN_FORM,
  PATTERN_SPREADSHEET,
} from '../../../../_shared/constants';
import { CARD_PATH } from '../../../../container/routing';
import { FormField, CardDetails } from '../../../../_shared/types';

import s from './s.module.scss';

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
    placeholder: `${GOOGLE_DOCS_URL}/forms/d/e/<form_id>/viewform?usp=pp_url&entry.<numbers>=<field_input>&entry.<numbers>=<field_input>`,
  },
  {
    name: 'spreadsheetUrl',
    label: 'Google Sheet Link (.csv)',
    rules: [IS_REQUIRED, IS_SHEET_URL],
    placeholder: `${GOOGLE_DOCS_URL}/spreadsheets/d/<spreadsheet_id>/edit?usp=sharing`,
  },
];

const CardDetailsForm = (): JSX.Element => {
  const navigate: NavigateFunction = useNavigate();

  /*
   * Redirect to Card with the provided Card Details.
   */
  const onCreateNewCardClick = (formData: FormData): void => {
    const formIdMatch: RegExpMatchArray | null =
      formData.formUrl.match(PATTERN_FORM);
    const spreadsheetIdMatch: RegExpMatchArray | null =
      formData.spreadsheetUrl.match(PATTERN_SPREADSHEET);
    const cardDetails: CardDetails = {
      title: formData.title,
      formId: formIdMatch ? formIdMatch[1] : '',
      formEntryParameters: formIdMatch
        ? `${formIdMatch[4]},${formIdMatch[6]}`
        : '',
      spreadsheetId: spreadsheetIdMatch ? spreadsheetIdMatch[1] : '',
    };
    const queryParameters: URLSearchParams = new URLSearchParams(cardDetails);
    navigate(`${CARD_PATH.path}?${queryParameters.toString()}`);
  };

  return (
    <Card title="Create New Group Card">
      <Form
        className={s.form}
        colon={false}
        layout="vertical"
        onFinish={onCreateNewCardClick}
      >
        {FORM_FIELDS.map(
          (
            { name, label, rules, placeholder }: FormField,
            index: number,
          ): JSX.Element => (
            <Form.Item
              hasFeedback={true}
              key={index}
              label={label}
              name={name}
              rules={rules}
              validateFirst={true}
            >
              <Input allowClear={true} placeholder={placeholder} />
            </Form.Item>
          ),
        )}
        <Button className={s.createButton} htmlType="submit" type="primary">
          Create
        </Button>
      </Form>
    </Card>
  );
};

export default CardDetailsForm;
