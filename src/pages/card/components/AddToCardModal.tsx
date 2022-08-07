import React from 'react';
import ReactMarkdown from 'react-markdown';
import type SimpleMDE from 'easymde';
import { SimpleMdeReact } from 'react-simplemde-editor';
import {
  Alert,
  Button,
  Card,
  Col,
  Form,
  Input,
  Modal,
  notification,
  Popconfirm,
  Row,
  Steps,
} from 'antd';
import {
  PlusOutlined,
  CaretLeftOutlined,
  CaretRightOutlined,
  EditOutlined,
  EyeOutlined,
  SendOutlined,
} from '@ant-design/icons';

import s from '../s.module.scss';

type CardModalProps = {
  formUrl: string;
  formEntryParameters: string;
  isXsWidth: boolean;
  isSmWidth: boolean;
  onDoneClickCallback: () => Promise<void>;
};

const AUTHOR_PLACEHOLDER = 'Anonymous';

const CONTENT_PLACEHOLDER = "*UHM*... I didn't write anything!";

const STEPS: Array<string> = [
  'Write Message',
  'Confirm Preview',
  'Submit to Form',
];

const STEP_ICONS: Array<JSX.Element> = [
  <EditOutlined />,
  <EyeOutlined />,
  <SendOutlined />,
];

const MAX_STEP: number = STEPS.length - 1;

const TITLE = 'Add to Card';

const CardModal = ({
  formUrl,
  formEntryParameters,
  isSmWidth,
  onDoneClickCallback,
}: CardModalProps): JSX.Element => {
  const [isVisible, setIsVisible] = React.useState<boolean>(false);
  const [isPopconfirmVisible, setIsPopconfirmVisible] =
    React.useState<boolean>(false);
  const [step, setStep] = React.useState<number>(0);
  const [author, setAuthor] = React.useState<string>('');
  const [content, setContent] = React.useState<string>('');

  const simpleMdeOptions: SimpleMDE.Options = React.useMemo(
    (): SimpleMDE.Options => ({
      maxHeight: '400px',
      spellChecker: false,
      status: false,
    }),
    [],
  );

  const prefiledFormUrl: string = React.useMemo((): string => {
    const entryParameterIds: Array<string> = formEntryParameters.split(',');
    const queryParameters: URLSearchParams = new URLSearchParams({
      [`entry.${entryParameterIds[0]}`]: author.trim()
        ? author.trim()
        : AUTHOR_PLACEHOLDER,
      [`entry.${entryParameterIds[1]}`]: content.trim(),
    });
    return `${formUrl}?${queryParameters.toString()}`;
  }, [author, content]);

  const showPopconfirm = (): void => setIsPopconfirmVisible(true);

  const hidePopconfirm = (): void => setIsPopconfirmVisible(false);

  const hideModal = (): void => {
    if (isPopconfirmVisible) {
      setIsPopconfirmVisible(false);
    }
    setIsVisible(false);
    setStep(0);
    setAuthor('');
    setContent('');
  };

  const showModal = (): void => setIsVisible(true);

  const onStepChange = (value: number): void => setStep(value);

  const onPreviousStepClick = (): void => {
    if (step > 0) {
      onStepChange(step - 1);
    }
  };

  const onNextStepClick = (): void => {
    if (step < MAX_STEP) {
      onStepChange(step + 1);
    }
  };

  const onAuthorBlur = (event: React.ChangeEvent<HTMLInputElement>): void =>
    setAuthor(event.target.value);

  const onContentChange = (value: string): void => setContent(value);

  const onCancelClick = (): void => {
    if (step < MAX_STEP && (!!author.trim() || !!content.trim())) {
      showPopconfirm();
      return;
    }
    if (step === MAX_STEP) {
      onDoneClickCallback();
    }
    hideModal();
  };

  const onCopyContentClick = (): void => {
    const element: HTMLTextAreaElement = document.createElement('textarea');
    element.textContent = content;
    document.body.appendChild(element);
    element.select();
    document.execCommand('copy');
    document.body.removeChild(element);
    notification['success']({
      message: 'Message content copied!',
      placement: 'bottomLeft',
      duration: 3,
    });
  };

  const renderContent = (): JSX.Element => {
    switch (step) {
      case 1:
        return (
          <div className={s.addToCardPreviewMessage}>
            {!content.trim() ? (
              <Alert
                type="error"
                message={
                  <span>
                    You have to write some content first! Go back to the{' '}
                    <a onClick={onPreviousStepClick}>previous step</a>.
                  </span>
                }
                showIcon
              />
            ) : (
              <Alert
                type="info"
                message={
                  <span>
                    This is what your message will look like. If you are happy
                    with the result and no longer want to make any more edits,
                    you can continue to the{' '}
                    <a onClick={onNextStepClick}>next step</a>.
                  </span>
                }
              />
            )}
            <Card className={s.cardMessageCard}>
              <ReactMarkdown
                className={s.cardMessageContent}
                children={content.trim() ? content.trim() : CONTENT_PLACEHOLDER}
              />
              <div className={s.cardMessageAuthor}>
                {author.trim() ? author.trim() : AUTHOR_PLACEHOLDER}
              </div>
            </Card>
          </div>
        );
      case MAX_STEP:
        return (
          <div>
            <div className={s.addToCardContent}>
              <Alert
                type="info"
                message={
                  <ul className={s.submitToFormList}>
                    <li>
                      If the form is still accepting responses, you should see
                      the field(s) already filled in for you.
                    </li>
                    <li>
                      If the field(s) were not filled in, you will have to fill
                      them in manually. Click{' '}
                      <a onClick={onCopyContentClick}>
                        <b>here</b>
                      </a>{' '}
                      to copy the message content.
                    </li>
                    <li>
                      If the form is no longer accepting responses and you think
                      this is a mistake, contact the owner of the form.
                    </li>
                    <li>
                      Remember to click on <b>Submit</b> before closing the
                      modal!
                    </li>
                  </ul>
                }
              />
            </div>
            <iframe
              id={s.addToCardGoogleFormIframe}
              className={s.addToCardGoogleFormIframe}
              src={prefiledFormUrl}
            />
          </div>
        );
      case 0:
      default:
        return (
          <div className={s.addToCardContent}>
            <Form colon={false} layout="vertical">
              <Form.Item label="Author">
                <Input
                  defaultValue={author}
                  placeholder={AUTHOR_PLACEHOLDER}
                  onBlur={onAuthorBlur}
                  allowClear
                />
              </Form.Item>
              <Form.Item label="Content" required>
                <SimpleMdeReact
                  value={content}
                  options={simpleMdeOptions}
                  onChange={onContentChange}
                />
              </Form.Item>
            </Form>
          </div>
        );
    }
  };

  return (
    <>
      <Button
        type="default"
        shape="round"
        size="large"
        className={s.cardActionButton}
        icon={<PlusOutlined />}
        onClick={showModal}
      >
        {TITLE}
      </Button>
      <Modal
        title={TITLE}
        visible={isVisible}
        closable={false}
        destroyOnClose={true}
        width={675}
        bodyStyle={{ padding: '0px' }}
        footer={
          <div>
            <Popconfirm
              title={
                <div>
                  Are you sure you want to close? This will{' '}
                  <b>discard all changes</b>.
                </div>
              }
              okText="Yes"
              cancelText="No"
              visible={isPopconfirmVisible}
              onConfirm={hideModal}
              onCancel={hidePopconfirm}
            >
              <Button
                type={step < MAX_STEP ? 'default' : 'primary'}
                onClick={onCancelClick}
              >
                {step < 2 ? 'Cancel' : 'Done'}
              </Button>
            </Popconfirm>
          </div>
        }
      >
        <Row className={s.addToCardSteps} justify="space-around">
          <Col xs={0} sm={0} md={2}>
            <Button
              type="default"
              shape="circle"
              icon={<CaretLeftOutlined />}
              disabled={step === 0}
              onClick={onPreviousStepClick}
            />
          </Col>
          <Col xs={24} sm={24} md={20}>
            <Steps
              current={step}
              onChange={onStepChange}
              direction={isSmWidth ? 'horizontal' : 'vertical'}
              progressDot
            >
              {STEPS.map((title: string, index: number): JSX.Element => {
                const titleToRender: JSX.Element = !isSmWidth ? (
                  <>
                    {STEP_ICONS[index]} {title}
                  </>
                ) : (
                  <>
                    {title}
                    <br />
                    {STEP_ICONS[index]}
                  </>
                );
                return (
                  <Steps.Step
                    key={`step-${index}`}
                    title={
                      index === step ? <b>{titleToRender}</b> : titleToRender
                    }
                    disabled={index === MAX_STEP && !content.trim()}
                  />
                );
              })}
            </Steps>
          </Col>
          <Col xs={0} sm={0} md={2}>
            <Button
              type="default"
              shape="circle"
              icon={<CaretRightOutlined />}
              disabled={(step === 1 && !content.trim()) || step === MAX_STEP}
              onClick={onNextStepClick}
            />
          </Col>
        </Row>
        {renderContent()}
      </Modal>
    </>
  );
};

export default CardModal;
