import { Button, Drawer, Row, Col, InputNumber, Space, Tooltip } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import { useContext, useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';

import { CardMessagesContext } from '../../../../_shared/contexts';
import { CardMessage } from '../../../../_shared/types';

import s from './s.module.scss';

const TITLE = 'Slideshow';

const SlideshowDrawer = (): JSX.Element => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const [slideIndex, setSlideIndex] = useState<number>(0);

  const cardMessages: CardMessage[] =
    useContext<CardMessage[]>(CardMessagesContext);

  const cardMessageElements: Array<JSX.Element> = useMemo(
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
      <Tooltip align={{ offset: [0, 5] }} placement="top" title={TITLE}>
        <Button
          disabled={cardMessages.length === 0}
          icon={<CaretRightOutlined />}
          onClick={showDrawer}
          shape="circle"
          type="default"
        />
      </Tooltip>
      <Drawer
        className={s.slideshowDrawer}
        closable={false}
        destroyOnClose={true}
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
        placement="top"
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
        visible={isVisible}
        width="100%"
      >
        {cardMessageElements[slideIndex]}
      </Drawer>
    </>
  );
};

export default SlideshowDrawer;
