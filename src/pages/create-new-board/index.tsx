import React from 'react';
import { Col, Row } from 'antd';

import BoardDetailsForm from './components/BoardDetailsForm';
import ContentContainer from '../../_shared/components/content-container';
import HelpSection from './components/HelpSection';

const CreateNewBoard = (): JSX.Element => (
  <ContentContainer>
    <Row gutter={24}>
      <Col span={24} lg={12}>
        <HelpSection />
      </Col>
      <Col span={24} lg={12}>
        <BoardDetailsForm />
      </Col>
    </Row>
  </ContentContainer>
);

export default CreateNewBoard;
