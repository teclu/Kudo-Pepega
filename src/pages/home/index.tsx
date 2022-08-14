import { Button, Image, Typography } from 'antd';
import { NavigateFunction, useNavigate } from 'react-router-dom';

import { ContentContainer } from '../../_shared/components';
import { CREATE_PATH } from '../../container/routing';

import s from './s.module.scss';

const Home = (): JSX.Element => {
  const navigate: NavigateFunction = useNavigate();

  const onClick = (event: React.MouseEvent<HTMLElement, MouseEvent>): void => {
    event.preventDefault();
    navigate(CREATE_PATH.path);
  };

  return (
    <div className={s.contentWrapper}>
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
          />
        </div>
        <Button
          className={s.createButton}
          href={CREATE_PATH.path}
          type="primary"
          onClick={onClick}
        >
          Create New Group Card
        </Button>
      </ContentContainer>
    </div>
  );
};

export default Home;
