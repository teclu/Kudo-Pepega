import { Card, Col, Image } from 'antd';

import s from './s.module.scss';

const CardMessagePlaceholder = (): JSX.Element => (
  <Col xxl={6} xl={8} lg={12} md={24} xs={24}>
    <Card className={s.cardMessagePlaceholder}>
      <Image
        rootClassName={s.notedEmote}
        preview={false}
        src="https://cdn.betterttv.net/emote/6089df1239b5010444d081e2/3x"
      />
      <p>
        It seems like there aren't any messages submitted to the card...{' '}
        <em>yet</em>.
      </p>
      <p>
        Click on <b>Add to Board (+)</b> and write something nice!
      </p>
    </Card>
  </Col>
);

export default CardMessagePlaceholder;
