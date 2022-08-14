import { useContext } from 'react';

import { CardDetailsContext } from '../../../../_shared/contexts';
import CardInformationModal from '../CardInformationModal';
import SlideshowDrawer from '../SlideshowDrawer';

import s from './s.module.scss';

const Jumbotron = (): JSX.Element => {
  const { title } = useContext(CardDetailsContext);
  return (
    <div className={s.jumbotron}>
      <div className={s.title}>{title}</div>
      <div className={s.cardActions}>
        <SlideshowDrawer />
        <CardInformationModal />
      </div>
    </div>
  );
};

export default Jumbotron;
