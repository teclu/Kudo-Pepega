import { BackTop } from 'antd';
import { NavigateFunction, useNavigate } from 'react-router-dom';

import {
  CardDetailsContext,
  CardMessagesContext,
} from '../../_shared/contexts';
import { Loader } from '../../_shared/components';
import { useGetCardMessages } from '../../_shared/queries/card';
import { CardDetails } from '../../_shared/types';
import { getCardDetails } from '../../_shared/utilities';
import { ROOT_PATH } from '../../container/routing';
import CardMessages from './components/CardMessages';
import Jumbotron from './components/Jumbotron';

import s from './s.module.scss';

const Card = (): JSX.Element => {
  const navigate: NavigateFunction = useNavigate();

  const cardDetails: CardDetails = getCardDetails(location.search);

  const { spreadsheetId = '' } = cardDetails;

  const { data: cardMessages = [], isFetching: isGetCardMessagesFetching } =
    useGetCardMessages(
      {
        spreadsheetId,
      },
      {
        onError: (): void => navigate(ROOT_PATH.path),
      },
    );

  return isGetCardMessagesFetching ? (
    <Loader />
  ) : (
    <CardDetailsContext.Provider value={cardDetails}>
      <CardMessagesContext.Provider value={cardMessages}>
        <Jumbotron />
        <CardMessages />
        <BackTop className={s.backTop} />
      </CardMessagesContext.Provider>
    </CardDetailsContext.Provider>
  );
};

export default Card;
