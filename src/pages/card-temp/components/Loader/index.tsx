import { Image } from 'antd';

import s from './s.module.scss';

const Loader = (): JSX.Element => (
  <div className={s.loadingContainer}>
    <Image
      className={s.kudoPepega}
      preview={false}
      src="./images/KudoPepega.png"
    />
  </div>
);

export default Loader;
