import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Card, Col, Row } from 'antd';

import type { BoardMessage } from '../../../shared/types';
import ContentContainer from '../../../shared/components/content-container';
import useWidth from '../../../shared/useWidth';

import s from '../s.module.scss';

type BoardMessagesProps = {
  boardMessages: Array<BoardMessage>;
  isLgWidth: boolean;
  isXlWidth: boolean;
};

const MAX_SPAN = 24;

const getColumns = (isLgWidth: boolean, isXlWidth: boolean): 1 | 2 | 3 =>
  isXlWidth ? 3 : isLgWidth ? 2 : 1;

const BoardMessages = ({
  boardMessages,
  isLgWidth,
  isXlWidth,
}: BoardMessagesProps): JSX.Element => {
  const boardMessageElements: Array<JSX.Element> = React.useMemo(
    (): Array<JSX.Element> =>
      boardMessages.map(
        (message: BoardMessage, index: number): JSX.Element => (
          <Card key={index} className={s.boardMessageCard}>
            <ReactMarkdown
              className={s.boardMessageContent}
              children={message.content}
            />
            <div className={s.boardMessageAuthor}>{message.author}</div>
          </Card>
        ),
      ),
    [boardMessages],
  );

  const boardMessagesLayoutElement: Array<JSX.Element> =
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
                ? boardMessageElements.filter(
                    (element: JSX.Element, index: number): boolean =>
                      index % columns === i,
                  )
                : boardMessageElements}
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
        justify={
          boardMessagesLayoutElement.length > 0 ? undefined : 'space-between'
        }
      >
        {boardMessagesLayoutElement.length > 0 ? (
          boardMessagesLayoutElement
        ) : (
          <Col span={MAX_SPAN / getColumns(isLgWidth, isXlWidth)}>
            <Card className={s.boardMessageCard}>
              <img
                className={s.addToBoardPlaceholderImage}
                src="https://cdn.betterttv.net/emote/6089df1239b5010444d081e2/3x"
              />
              <p>
                It seems that there aren't any messages posted to the board...{' '}
                <em>yet</em>.
              </p>
              <p>
                Click on <b>Add to Board</b> and write something nice!
              </p>
            </Card>
          </Col>
        )}
      </Row>
    </ContentContainer>
  );
};

export default BoardMessages;
