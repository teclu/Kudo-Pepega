import { Col, Row } from 'antd';

import { ContentContainer } from '../../_shared/components';
import CardDetailsForm from './components/CardDetailsForm';
import HelpSection from './components/HelpSection';

const CreateNewCard = (): JSX.Element => (
  <ContentContainer>
    <Row gutter={24}>
      <Col span={24} lg={12}>
        <HelpSection />
      </Col>
      <Col span={24} lg={12}>
        <CardDetailsForm />
      </Col>
    </Row>
  </ContentContainer>
);

export default CreateNewCard;
