import { Button, Image, Typography } from 'antd';

import ContentContainer from '../../shared/components/content-container';

import s from './s.module.scss';

const Landing = (): JSX.Element => {
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
      <Button className={s.buttonCreate} type="primary">
        Create New Group Card
      </Button>
    </ContentContainer>
  );
};

export default Landing;