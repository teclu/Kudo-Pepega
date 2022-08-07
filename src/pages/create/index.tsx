import { Col, Row } from 'antd';

import CardDetailsForm from './components/CardDetailsForm';
import ContentContainer from '../../_shared/components/content-container';
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
