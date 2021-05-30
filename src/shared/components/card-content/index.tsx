import React from 'react';
import { Card } from 'antd';

import s from './s.module.css';

type CardContentProps = {
  children?: Array<JSX.Element>;
};

const CardContent = ({ children }: CardContentProps): JSX.Element => (
  <Card className={s.cardContent}>{children}</Card>
);

export default CardContent;
