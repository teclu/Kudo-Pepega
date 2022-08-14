import React, { useContext } from 'react';
import { Button, Form, Input, Modal, Row, Tooltip } from 'antd';
import {
  CopyOutlined,
  QuestionOutlined,
  LinkOutlined,
} from '@ant-design/icons';

import { CardDetailsContext } from '../../../../_shared/contexts';
import { CardDetails, FormField } from '../../../../_shared/types';
import { fireNotification, getCardUrls } from '../../../../_shared/utilities';

import s from './s.module.scss';

const TITLE = 'Card Information';

const CardInformationModal = (): JSX.Element => {
  const [isVisible, setIsVisible] = React.useState<boolean>(false);

  const cardDetails: CardDetails = useContext<CardDetails>(CardDetailsContext);

  const { cardViewOnlyUrl, cardEditableUrl, formUrl, spreadsheetUrl } =
    getCardUrls(cardDetails);

  const formFields: FormField[] = React.useMemo((): FormField[] => {
    // Card URLs.
    const formFields = [
      {
        name: 'cardViewOnlyUrl',
        label: 'Card URL (View Only)',
        value: cardViewOnlyUrl,
      },
    ];
    if (cardEditableUrl) {
      formFields.push({
        name: 'cardEditableUrl',
        label: 'Card URL (Editable)',
        value: cardEditableUrl,
      });
    }
    // Google Form and Spreadsheet URLs.
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
  }, [cardViewOnlyUrl, formUrl, spreadsheetUrl]);

  const hideModal = (): void => setIsVisible(false);

  const showModal = (): void => setIsVisible(true);

  const onCopyUrlClick = async (
    label: string,
    value: string,
  ): Promise<void> => {
    await navigator.clipboard.writeText(value);
    fireNotification({
      message: `${label} copied!`,
      placement: 'top',
      duration: 3,
    });
  };

  return (
    <>
      <Tooltip align={{ offset: [0, 5] }} placement="top" title={TITLE}>
        <Button
          icon={<QuestionOutlined />}
          onClick={showModal}
          shape="circle"
          type="default"
        />
      </Tooltip>
      <Modal
        title={TITLE}
        visible={isVisible}
        closable={false}
        destroyOnClose={true}
        width={675}
        footer={
          <Button onClick={hideModal} type="default">
            Close
          </Button>
        }
      >
        <Form colon={false} layout="vertical">
          {formFields.map(
            (
              { name, label, value = '' }: FormField,
              index: number,
            ): JSX.Element => {
              const onCopyClick = (): void => {
                onCopyUrlClick(label, value);
              };

              const copyElement: JSX.Element = (
                <Tooltip placement="top" title="Copy URL">
                  <Button
                    icon={<CopyOutlined />}
                    onClick={onCopyClick}
                    size="small"
                    type="link"
                  />
                </Tooltip>
              );

              const linkElement: JSX.Element = (
                <Tooltip placement="top" title="Open URL">
                  <Button
                    href={value}
                    icon={<LinkOutlined />}
                    size="small"
                    type="link"
                  />
                </Tooltip>
              );

              return (
                <Form.Item key={index} label={label}>
                  <Input
                    addonAfter={
                      !name.includes('card') ? (
                        <Row
                          className={s.cardInformationActions}
                          justify="space-between"
                        >
                          {copyElement}
                          {linkElement}
                        </Row>
                      ) : (
                        copyElement
                      )
                    }
                    id={name}
                    readOnly={true}
                    value={value}
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

export default CardInformationModal;
