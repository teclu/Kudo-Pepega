import { Card, Col } from 'antd';
import ReactMarkdown from 'react-markdown';

import { CardMessage } from '../../../../_shared/types';

import s from './s.module.scss';

type CardMessageProps = {
  cardMessage: CardMessage;
};

const CardMessageElement = ({ cardMessage }: CardMessageProps): JSX.Element => {
  const { author, content } = cardMessage;
  return (
    <Col xxl={6} xl={8} lg={12} md={24} xs={24}>
      <Card className={s.cardMessage}>
        <ReactMarkdown className={s.cardMessageContent} children={content} />
        <div className={s.cardMessageAuthor}>{author}</div>
      </Card>
    </Col>
  );
};

export default CardMessageElement;
