import React from 'react';
import { Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';

type BoardModalProps = {
  formUrl: string;
};

import s from '../s.module.scss';

const BoardModal = ({ formUrl }: BoardModalProps): JSX.Element => {
  return (
    <>
      <Button
        type="default"
        shape="round"
        size="large"
        className={s.boardActionButton}
        icon={<EditOutlined />}
        disabled // To-do: Finish this component.
      >
        Add to Board
      </Button>
    </>
  );
};

export default BoardModal;
