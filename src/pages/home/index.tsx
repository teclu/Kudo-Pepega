import { Button, Image, Typography } from 'antd';
import { useNavigate } from 'react-router';
import type { NavigateFunction } from 'react-router';

import { CREATE_PATH } from '../../container/routing';
import ContentContainer from '../../_shared/components/content-container';

import s from './s.module.scss';

const Home = (): JSX.Element => {
  const navigate: NavigateFunction = useNavigate();

  const onClick = (event: React.MouseEvent<HTMLElement, MouseEvent>): void => {
    event.preventDefault();
    navigate(CREATE_PATH.path);
  };

  return (
    <ContentContainer className={s.contentContainer}>
      <Typography.Title className={s.title} level={1}>
        A Group Card Alternative
      </Typography.Title>
      <Typography.Title className={s.subTitle} level={2}>
        Free of charge; no pesky catches.
      </Typography.Title>
      <div>
        <Image
          className={s.kudoPepega}
          preview={false}
          src="./images/KudoPepega.png"
          width={196}
        />
      </div>
      <Button
        className={s.buttonCreate}
        href={CREATE_PATH.path}
        type="primary"
        onClick={onClick}
      >
        Create New Group Card
      </Button>
    </ContentContainer>
  );
};

export default Home;
