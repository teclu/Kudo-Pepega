import React from 'react';
import { Col, Row } from 'antd';

import BoardDetailsForm from './components/BoardDetailsForm';
import HelpModal from './components/HelpModal';

const CreateNewBoard = (): JSX.Element => {
  return (
    <>
      <Row>
        <Col>
          <h1>Create New Board</h1>
        </Col>
        <Col>
          <HelpModal />
        </Col>
      </Row>
      <BoardDetailsForm />
    </>
  );
};

export default CreateNewBoard;
