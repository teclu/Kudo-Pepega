import classNames from 'classnames';

import s from './s.module.scss';

const ContentContainer = ({
  className,
  ...props
}: JSX.IntrinsicAttributes &
  React.ClassAttributes<HTMLDivElement> &
  React.HTMLAttributes<HTMLDivElement>): JSX.Element => (
  <div className={classNames(s.container, className)} {...props}>
    {props.children}
  </div>
);

export default ContentContainer;
