import { Image } from 'antd';

import s from './s.module.scss';

const Loader = (): JSX.Element => (
  <div className={s.loadingContainer}>
    <div className={s.loader}>
      <Image
        className={s.kudoPepega}
        preview={false}
        src="./images/KudoPepega.png"
      />
    </div>
  </div>
);

export default Loader;
