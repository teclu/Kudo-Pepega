import { Row } from 'antd';
import { useContext, useMemo } from 'react';

import { ContentContainer } from '../../../../_shared/components';
import { CardMessagesContext } from '../../../../_shared/contexts';
import { CardMessage } from '../../../../_shared/types';
import CardMessageElement from '../CardMessageElement';

const CardMessages = (): JSX.Element => {
  const cardMessages: CardMessage[] =
    useContext<CardMessage[]>(CardMessagesContext);

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
