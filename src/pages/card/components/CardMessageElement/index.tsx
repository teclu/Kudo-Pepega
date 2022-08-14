import { Card, Col } from 'antd';
import { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';

import { CardMessage } from '../../../../_shared/types';

import s from './s.module.scss';

type CardMessageProps = {
  cardMessage: CardMessage;
  isPreview?: boolean;
};

const CardMessageElement = ({
  cardMessage,
  isPreview,
}: CardMessageProps): JSX.Element => {
  const { author, content } = cardMessage;

  const element: JSX.Element = useMemo(
    (): JSX.Element => (
      <Card className={s.cardMessage}>
        <ReactMarkdown className={s.cardMessageContent} children={content} />
        <div className={s.cardMessageAuthor}>{author}</div>
      </Card>
    ),
    [author, content],
  );

  if (isPreview) {
    return element;
  }
  return (
    <Col xxl={6} xl={8} lg={12} md={24} xs={24}>
      {element}
    </Col>
  );
};

export default CardMessageElement;
