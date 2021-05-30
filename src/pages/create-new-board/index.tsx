import React from 'react';
import { Col, Row } from 'antd';

import CardContent from '../../shared/components/card-content';
import BoardDetailsForm from './components/BoardDetailsForm';
import HelpModal from './components/HelpModal';

const CreateNewBoard = (): JSX.Element => {
  return (
    <CardContent>
      <Row>
        <Col>
          <h1>Create New Board</h1>
        </Col>
        <Col>
          <HelpModal />
        </Col>
      </Row>
      <BoardDetailsForm />
    </CardContent>
  );
};

export default CreateNewBoard;
