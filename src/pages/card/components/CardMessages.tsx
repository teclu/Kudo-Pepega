import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Card, Col, Row } from 'antd';

import type { CardMessage } from '../../../_shared/types';
import ContentContainer from '../../../_shared/components/content-container';

import s from '../s.module.scss';

type CardMessagesProps = {
  cardMessages: Array<CardMessage>;
  isLgWidth: boolean;
  isXlWidth: boolean;
};

const MAX_SPAN = 24;

const getColumns = (isLgWidth: boolean, isXlWidth: boolean): 1 | 2 | 3 =>
  isXlWidth ? 3 : isLgWidth ? 2 : 1;

const CardMessages = ({
  cardMessages,
  isLgWidth,
  isXlWidth,
}: CardMessagesProps): JSX.Element => {
  const cardMessageElements: Array<JSX.Element> = React.useMemo(
    (): Array<JSX.Element> =>
      cardMessages.map(
        (message: CardMessage, index: number): JSX.Element => (
          <Card key={index} className={s.cardMessageCard}>
            <ReactMarkdown
              className={s.cardMessageContent}
              children={message.content}
            />
            <div className={s.cardMessageAuthor}>{message.author}</div>
          </Card>
        ),
      ),
    [cardMessages],
  );

  const cardMessagesLayoutElement: Array<JSX.Element> =
    React.useMemo((): Array<JSX.Element> => {
      // Helper function to generate 1/2/3-Column Layouts.
      const generateColumnElements = (
        columns: 1 | 2 | 3,
      ): Array<JSX.Element> => {
        const columnElements: Array<JSX.Element> = [];
        for (let i = 0; i < columns; i++) {
          const span: number = MAX_SPAN / columns;
          columnElements.push(
            <Col key={i} span={span}>
              {columns > 1
                ? cardMessageElements.filter(
                    (element: JSX.Element, index: number): boolean =>
                      index % columns === i,
                  )
                : cardMessageElements}
            </Col>,
          );
        }
        return columnElements;
      };
      return generateColumnElements(getColumns(isLgWidth, isXlWidth));
    }, [isLgWidth, isXlWidth]);

  return (
    <ContentContainer>
      <Row
        gutter={16}
        justify={cardMessages.length > 0 ? undefined : 'space-between'}
      >
        {cardMessages.length > 0 ? (
          cardMessagesLayoutElement
        ) : (
          <Col span={MAX_SPAN / getColumns(isLgWidth, isXlWidth)}>
            <Card className={s.cardMessageCard}>
              <img
                className={s.addToCardPlaceholderImage}
                src="https://cdn.betterttv.net/emote/6089df1239b5010444d081e2/3x"
              />
              <p>
                It seems that there aren't any messages posted to the card...{' '}
                <em>yet</em>.
              </p>
              <p>
                Click on <b>Add to Card</b> and write something nice!
              </p>
            </Card>
          </Col>
        )}
      </Row>
    </ContentContainer>
  );
};

export default CardMessages;
