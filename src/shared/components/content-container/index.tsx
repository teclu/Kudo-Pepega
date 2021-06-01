import React from 'react';

import s from './s.module.scss';

const ContentContainer = (
  props: JSX.IntrinsicAttributes &
    React.ClassAttributes<HTMLDivElement> &
    React.HTMLAttributes<HTMLDivElement>,
): JSX.Element => (
  <div className={s.container} {...props}>
    {props.children}
  </div>
);

export default ContentContainer;
