import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Card, Col, Row } from 'antd';

import { BreakpointWidth } from '../../../shared/enums';
import type { BoardMessage } from '../../../shared/types';
import ContentContainer from '../../../shared/components/content-container';

import s from '../s.module.scss';

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
  React.useEffect((): (() => void) => {
    const lgCallback = (event: MediaQueryListEvent): void =>
      setIsLgWidth(event.matches);

    const xlCallback = (event: MediaQueryListEvent): void =>
      setIsXlWidth(event.matches);

    const lgMediaQueryList: MediaQueryList = window.matchMedia(
      getMinWidthQuery(BreakpointWidth.LG),
    );

    lgMediaQueryList.addEventListener('change', lgCallback);

    const xlMediaQueryList: MediaQueryList = window.matchMedia(
      getMinWidthQuery(BreakpointWidth.XL),
    );
    xlMediaQueryList.addEventListener('change', xlCallback);

    // Remove the listeners when component is unmounted.
    return (): void => {
      lgMediaQueryList.removeEventListener('change', lgCallback);
      xlMediaQueryList.removeEventListener('change', xlCallback);
    };
  }, []);

  return (
    <ContentContainer>
      <Row gutter={24}>{boardMessagesLayoutElement}</Row>
    </ContentContainer>
  );
};

export default BoardMessages;
