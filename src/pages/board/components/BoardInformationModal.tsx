import React from 'react';
import { Button, Form, Input, Modal, notification, Row, Tooltip } from 'antd';
import {
  CopyOutlined,
  InfoCircleOutlined,
  LinkOutlined,
} from '@ant-design/icons';

import type { FormField } from '../../../shared/types';

import s from '../s.module.scss';

type BoardInformationModalProps = {
  boardUrl: string;
  formUrl: string;
  spreadsheetUrl: string;
};

const TITLE: string = 'Information';

const BoardInformationModal = ({
  boardUrl,
  formUrl,
  spreadsheetUrl,
}: BoardInformationModalProps): JSX.Element => {
  const [isVisible, setIsVisible] = React.useState<boolean>(false);

  const formFields: Array<FormField> = React.useMemo(
    (): Array<FormField> => [
      {
        name: 'boardUrl',
        label: 'Board URL',
        value: boardUrl,
      },
      {
        name: 'formUrl',
        label: 'Form URL',
        value: formUrl,
      },
      {
        name: 'spreadsheetUrl',
        label: 'Spreadsheet URL',
        value: spreadsheetUrl,
      },
    ],
    [boardUrl, formUrl, spreadsheetUrl],
  );

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
      <Button
        type="default"
        shape="round"
        size="large"
        className={s.boardActionButton}
        icon={<InfoCircleOutlined />}
        onClick={showModal}
      >
        {TITLE}
      </Button>
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
                      index > 0 ? (
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
