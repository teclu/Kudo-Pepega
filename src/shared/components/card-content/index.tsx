import React from 'react';
import { Card, CardProps } from 'antd';

import s from './s.module.css';

const CardContent = (props: CardProps): JSX.Element => (
  <Card className={s.cardContent} {...props}>
    {props.children}
  </Card>
);

export default CardContent;
