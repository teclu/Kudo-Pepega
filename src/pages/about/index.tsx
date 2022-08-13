import { Card } from 'antd';

import { ContentContainer } from '../../_shared/components';
import { html } from '../../../README.md';

const About = (): JSX.Element => {
  // Remove the main header.
  const readMeContent: string = html.replace(/^<h1>.+<\/h1>/, '');
  return (
    <ContentContainer>
      <Card title="About">
        <div dangerouslySetInnerHTML={{ __html: readMeContent }} />
      </Card>
    </ContentContainer>
  );
};

export default About;
