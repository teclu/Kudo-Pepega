import { Row } from 'antd';
import { useMemo } from 'react';

import { ContentContainer } from '../../../../_shared/components';
import { CardMessage } from '../../../../_shared/types';
import CardMessageElement from '../CardMessageElement';

type CardMessagesProps = {
  cardMessages: CardMessage[];
};

const CardMessages = ({ cardMessages }: CardMessagesProps): JSX.Element => {
  const cardMessageElements: JSX.Element[] = useMemo(
    (): JSX.Element[] =>
      cardMessages.map(
        (cardMessage: CardMessage, index: number): JSX.Element => {
          return <CardMessageElement cardMessage={cardMessage} key={index} />;
        },
      ),
    [cardMessages],
  );

  return (
    <ContentContainer>
      <Row gutter={24}>{cardMessageElements}</Row>
    </ContentContainer>
  );
};

export default CardMessages;
