import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Button, Drawer, Row, Col, InputNumber, Space } from 'antd';
import { PlayCircleOutlined } from '@ant-design/icons';

import type { BoardMessage } from '../../../shared/types';

import s from '../s.module.scss';

type SlideshowDrawerProps = {
  boardMessages: Array<BoardMessage>;
};

const TITLE: string = 'Slideshow';

const SlideshowDrawer = ({
  boardMessages,
}: SlideshowDrawerProps): JSX.Element => {
  const [isVisible, setIsVisible] = React.useState<boolean>(false);
  const [slideIndex, setSlideIndex] = React.useState<number>(0);

  const boardMessageElements: Array<JSX.Element> = React.useMemo(
    (): Array<JSX.Element> =>
      boardMessages.map(
        (message: BoardMessage, index: number): JSX.Element => (
          <div key={index} className={s.boardMessageSlide}>
            <ReactMarkdown
              className={s.boardMessageContent}
              children={message.content}
            />
            <div className={s.boardMessageAuthor}>{message.author}</div>
          </div>
        ),
      ),
    [boardMessages],
  );

  const hideDrawer = (): void => setIsVisible(false);

  const showDrawer = (): void => setIsVisible(true);

  const onSlideChange = (value: number): void => setSlideIndex(value);

  const onPreviousSlideClick = (): void => {
    if (slideIndex > 0) {
      onSlideChange(slideIndex - 1);
    }
  };

  const onNextSlideClick = (): void => {
    if (slideIndex < boardMessages.length) {
      onSlideChange(slideIndex + 1);
    }
  };

  const onJumpToLastSlideClick = (): void =>
    onSlideChange(boardMessages.length - 1);

  const onJumpToSlideBlur = (
    event: React.FocusEvent<HTMLInputElement>,
  ): void => {
    const value: number = parseInt(event.target.value);
    if (!isNaN(value)) {
      onSlideChange(
        value < boardMessages.length ? value - 1 : boardMessages.length - 1,
      );
    }
  };

  const onJumpToSlideEnter = (): void => {
    const button: HTMLButtonElement = document.createElement('button');
    document.body.appendChild(button);
    button.focus();
    document.body.removeChild(button);
  };

  return (
    <>
      <Button
        type="default"
        shape="round"
        size="large"
        className={s.boardActionButton}
        icon={<PlayCircleOutlined />}
        onClick={showDrawer}
      >
        {TITLE}
      </Button>
      <Drawer
        visible={isVisible}
        closable={false}
        destroyOnClose={true}
        placement="left"
        width="100%"
        className="slideshowDrawer"
        title={
          <Row align="middle" justify="space-between">
            <Col>
              <h3 className={s.slideshowTitle}>{TITLE}</h3>
            </Col>
            <Col>
              <Button
                type="default"
                onClick={hideDrawer}
                className={s.slideshowActionButton}
              >
                Close
              </Button>
            </Col>
          </Row>
        }
        footer={
          <Row justify="space-between">
            <Col span={8}>
              <Button
                type="default"
                onClick={onPreviousSlideClick}
                className={s.slideshowStepButton}
                disabled={slideIndex === 0}
              >
                Previous
              </Button>
            </Col>
            <Col>
              <Space size="small" className={s.slideshowJumpToSlideContainer}>
                <InputNumber
                  min={1}
                  max={boardMessages.length}
                  value={slideIndex + 1}
                  className={s.slideshowJumpToSlideInput}
                  onBlur={onJumpToSlideBlur}
                  onPressEnter={onJumpToSlideEnter}
                />
                /
                <a onClick={onJumpToLastSlideClick}>
                  <b>{boardMessages.length}</b>
                </a>
              </Space>
            </Col>
            <Col span={8}>
              <Button
                type="default"
                onClick={onNextSlideClick}
                className={s.slideshowStepButton}
                disabled={slideIndex === boardMessages.length - 1}
              >
                Next
              </Button>
            </Col>
          </Row>
        }
      >
        {boardMessageElements[slideIndex]}
      </Drawer>
    </>
  );
};

export default SlideshowDrawer;
