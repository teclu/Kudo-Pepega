import React from 'react';
import { Button } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

import s from '../s.module.scss';

type BoardInformationModalProps = {};

const BoardInformationModal = ({}: BoardInformationModalProps): JSX.Element => {
  return (
    <>
      <Button
        type="default"
        shape="round"
        size="large"
        className={s.boardActionButton}
        icon={<InfoCircleOutlined />}
        disabled // To-do: Finish this component.
      >
        Information
      </Button>
    </>
  );
};

export default BoardInformationModal;
