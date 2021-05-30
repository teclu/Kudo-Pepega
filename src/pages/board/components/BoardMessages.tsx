import React from 'react';
import { Card, Col, Row } from 'antd';

import { BreakpointWidth } from '../../../shared/enums';
import type { BoardMessage } from '../../../shared/types';

import s from '../s.module.css';

type BoardMessagesProps = {
  boardMessages: Array<BoardMessage>;
};

const getMinWidthQuery = (breakpointWidth: BreakpointWidth): string =>
  `(min-width: ${breakpointWidth}px)`;

const BoardMessages = ({ boardMessages }: BoardMessagesProps): JSX.Element => {
  const [isLgWidth, setIsLgWidth] = React.useState<boolean>(
    window.matchMedia(getMinWidthQuery(BreakpointWidth.LG)).matches,
  );

  const [isXlWidth, setIsXlWidth] = React.useState<boolean>(
    window.matchMedia(getMinWidthQuery(BreakpointWidth.XL)).matches,
  );

  const boardMessageElements: Array<JSX.Element> = React.useMemo(
    (): Array<JSX.Element> =>
      boardMessages.map(
        (message: BoardMessage, index: number): JSX.Element => (
          <Card key={index} className={s.boardMessageCard}>
            <div className={s.boardMessageContent}>{message.content}</div>
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
          const span: number = 24 / columns;
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

      switch (true) {
        case isXlWidth:
          return generateColumnElements(3);
        case isLgWidth:
          return generateColumnElements(2);
        default:
          return generateColumnElements(1);
      }
    }, [isLgWidth, isXlWidth]);

  /*
   * Listen for changes in window width.
   */
  React.useEffect((): void => {
    window
      .matchMedia(getMinWidthQuery(BreakpointWidth.LG))
      .addEventListener('change', (event: MediaQueryListEvent): void =>
        setIsLgWidth(event.matches),
      );
    window
      .matchMedia(getMinWidthQuery(BreakpointWidth.XL))
      .addEventListener('change', (event: MediaQueryListEvent): void =>
        setIsXlWidth(event.matches),
      );
  }, []);

  return (
    <Row gutter={16} className={s.boardMessagesContainer}>
      {boardMessagesLayoutElement}
    </Row>
  );
};

export default BoardMessages;
