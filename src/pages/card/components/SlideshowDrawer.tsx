import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Button, Drawer, Row, Col, InputNumber, Space } from 'antd';
import { PlayCircleOutlined } from '@ant-design/icons';

import type { CardMessage } from '../../../_shared/types';

import s from '../s.module.scss';

type SlideshowDrawerProps = {
  cardMessages: Array<CardMessage>;
};

const TITLE = 'Slideshow';

const SlideshowDrawer = ({
  cardMessages,
}: SlideshowDrawerProps): JSX.Element => {
  const [isVisible, setIsVisible] = React.useState<boolean>(false);
  const [slideIndex, setSlideIndex] = React.useState<number>(0);

  const cardMessageElements: Array<JSX.Element> = React.useMemo(
    (): Array<JSX.Element> =>
      cardMessages.map(
        (message: CardMessage, index: number): JSX.Element => (
          <div key={index} className={s.cardMessageSlide}>
            <ReactMarkdown
              className={s.cardMessageContent}
              children={message.content}
            />
            <div className={s.cardMessageAuthor}>{message.author}</div>
          </div>
        ),
      ),
    [cardMessages],
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
    if (slideIndex < cardMessages.length) {
      onSlideChange(slideIndex + 1);
    }
  };

  const onJumpToLastSlideClick = (): void =>
    onSlideChange(cardMessages.length - 1);

  const onJumpToSlideBlur = (
    event: React.FocusEvent<HTMLInputElement>,
  ): void => {
    const value: number = parseInt(event.target.value);
    if (!isNaN(value)) {
      onSlideChange(
        value < cardMessages.length ? value - 1 : cardMessages.length - 1,
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
        className={s.cardActionButton}
        icon={<PlayCircleOutlined />}
        disabled={cardMessages.length === 0}
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
                  max={cardMessages.length}
                  value={slideIndex + 1}
                  className={s.slideshowJumpToSlideInput}
                  onBlur={onJumpToSlideBlur}
                  onPressEnter={onJumpToSlideEnter}
                />
                /
                <a onClick={onJumpToLastSlideClick}>
                  <b>{cardMessages.length}</b>
                </a>
              </Space>
            </Col>
            <Col span={8}>
              <Button
                type="default"
                onClick={onNextSlideClick}
                className={s.slideshowStepButton}
                disabled={slideIndex === cardMessages.length - 1}
              >
                Next
              </Button>
            </Col>
          </Row>
        }
      >
        {cardMessageElements[slideIndex]}
      </Drawer>
    </>
  );
};

export default SlideshowDrawer;
