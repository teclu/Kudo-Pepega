import s from './s.module.scss';

type JumbotronProps = {
  title: string;
};

const Jumbotron = ({ title }: JumbotronProps): JSX.Element => {
  return (
    <div className={s.jumbotron}>
      <div className={s.title}>{title}</div>
    </div>
  );
};

export default Jumbotron;
