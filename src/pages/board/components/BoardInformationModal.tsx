import React from 'react';
import { Button, Form, Input, Modal, notification, Row, Tooltip } from 'antd';
import {
  CopyOutlined,
  QuestionOutlined,
  LinkOutlined,
} from '@ant-design/icons';

import type { FormField } from '../../../_shared/types';

import s from '../s.module.scss';

type BoardInformationModalProps = {
  boardViewOnlyUrl: string;
  boardEditableUrl: string;
  formUrl: string;
  spreadsheetUrl: string;
};

const TITLE = 'Board Information';

const BoardInformationModal = ({
  boardViewOnlyUrl,
  boardEditableUrl,
  formUrl,
  spreadsheetUrl,
}: BoardInformationModalProps): JSX.Element => {
  const [isVisible, setIsVisible] = React.useState<boolean>(false);

  const formFields: Array<FormField> = React.useMemo((): Array<FormField> => {
    const formFields = [
      {
        name: 'boardViewOnlyUrl',
        label: 'Board URL (View Only)',
        value: boardViewOnlyUrl,
      },
    ];
    if (boardEditableUrl) {
      formFields.push({
        name: 'boardEditableUrl',
        label: 'Board URL (Editable)',
        value: boardEditableUrl,
      });
    }
    if (formUrl) {
      formFields.push({
        name: 'formUrl',
        label: 'Form URL',
        value: formUrl,
      });
    }
    formFields.push({
      name: 'spreadsheetUrl',
      label: 'Spreadsheet URL',
      value: spreadsheetUrl,
    });
    return formFields;
  }, [boardViewOnlyUrl, formUrl, spreadsheetUrl]);

  const hideModal = (): void => setIsVisible(false);

  const showModal = (): void => setIsVisible(true);

  const onCopyUrlClick = (label: string, id: string): void => {
    const element: HTMLInputElement | null = document.querySelector(`#${id}`);
    if (element) {
      element.select();
      document.execCommand('copy');
      notification['success']({
        message: `${label} copied!`,
        placement: 'bottomLeft',
        duration: 3,
      });
    }
  };

  return (
    <>
      <Tooltip placement="top" title={TITLE}>
        <Button
          type="default"
          shape="circle"
          size="small"
          className={s.boardHeaderActionButton}
          icon={<QuestionOutlined />}
          onClick={showModal}
        />
      </Tooltip>
      <Modal
        title={TITLE}
        visible={isVisible}
        closable={false}
        destroyOnClose={true}
        width={675}
        footer={
          <Button type="default" onClick={hideModal}>
            Close
          </Button>
        }
      >
        <Form colon={false} layout="vertical">
          {formFields.map(
            (formField: FormField, index: number): JSX.Element => {
              const copyElement: JSX.Element = (
                <Tooltip placement="top" title="Copy URL">
                  <Button
                    type="link"
                    size="small"
                    onClick={(): void =>
                      onCopyUrlClick(formField.label, formField.name)
                    }
                    icon={<CopyOutlined />}
                  />
                </Tooltip>
              );

              const linkElement: JSX.Element = (
                <Tooltip placement="top" title="Open URL">
                  <Button
                    type="link"
                    size="small"
                    href={formField.value}
                    icon={<LinkOutlined />}
                  />
                </Tooltip>
              );

              return (
                <Form.Item key={index} label={formField.label}>
                  <Input
                    id={formField.name}
                    value={formField.value}
                    addonAfter={
                      !formField.name.includes('board') ? (
                        <Row
                          className={s.boardInformationActions}
                          justify="space-between"
                        >
                          {copyElement}
                          {linkElement}
                        </Row>
                      ) : (
                        copyElement
                      )
                    }
                    readOnly
                  />
                </Form.Item>
              );
            },
          )}
        </Form>
      </Modal>
    </>
  );
};

export default BoardInformationModal;
