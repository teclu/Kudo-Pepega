import { BackTop } from 'antd';
import { NavigateFunction, useNavigate } from 'react-router-dom';

import { useGetCardMessages } from '../../_shared/queries/card';
import { ROOT_PATH } from '../../container/routing';
import CardMessages from './components/CardMessages';
import Jumbotron from './components/Jumbotron';

import s from './s.module.scss';
import Loader from './components/Loader';

const Card = (): JSX.Element => {
  const navigate: NavigateFunction = useNavigate();

  const query: URLSearchParams = new URLSearchParams(location.search);

  const title: string = query.get('title') ?? '';

  const spreadsheetId: string = query.get('spreadsheetId') ?? '';

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
    <div className={s.cardContent}>
      <Jumbotron title={title} />
      <CardMessages cardMessages={cardMessages} />
      <BackTop className={s.backTop} />
    </div>
  );
};

export default Card;
