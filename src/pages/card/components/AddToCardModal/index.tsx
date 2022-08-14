import {
  Alert,
  Button,
  Col,
  Form,
  Input,
  Modal,
  Popconfirm,
  Row,
  Steps,
  Tooltip,
} from 'antd';
import {
  PlusOutlined,
  CaretLeftOutlined,
  CaretRightOutlined,
  EditOutlined,
  EyeOutlined,
  SendOutlined,
} from '@ant-design/icons';
import SimpleMDE from 'easymde';
import React from 'react';
import { SimpleMdeReact } from 'react-simplemde-editor';
import { QueryClient, useQueryClient } from '@tanstack/react-query';

import { CardQueryKey } from '../../../../_shared/queries/card';
import { CardDetails, CardMessage } from '../../../../_shared/types';
import {
  fireNotification,
  getCardDetails,
  getCardUrls,
  useWidth,
} from '../../../../_shared/utilities';
import CardMessageElement from '../CardMessageElement';

import s from './s.module.scss';

const AUTHOR_PLACEHOLDER = 'Anonymous';

const CONTENT_PLACEHOLDER = "*UHM*... I didn't write anything!";

const STEPS: string[] = ['Write Message', 'Confirm Preview', 'Submit to Form'];

const STEP_ICONS: JSX.Element[] = [
  <EditOutlined />,
  <EyeOutlined />,
  <SendOutlined />,
];

const MAX_STEP: number = STEPS.length - 1;

const TITLE = 'Add to Card';

const AddToCardModal = (): JSX.Element => {
  const [isVisible, setIsVisible] = React.useState<boolean>(false);

  const [step, setStep] = React.useState<number>(0);

  const [author, setAuthor] = React.useState<string>('');

  const [content, setContent] = React.useState<string>('');

  const queryClient: QueryClient = useQueryClient();

  const { isSmWidth } = useWidth();

  const cardDetails: CardDetails = getCardDetails(location.search);

  const { formUrl } = getCardUrls(cardDetails);

  const { formEntryParameters = '' } = cardDetails;

  const simpleMdeOptions: SimpleMDE.Options = React.useMemo(
    (): SimpleMDE.Options => ({
      maxHeight: '400px',
      spellChecker: false,
      status: false,
    }),
    [],
  );

  const prefilledFormUrl: string = React.useMemo((): string => {
    const entryParameterIds: string[] = formEntryParameters.split(',');
    const queryParameters: URLSearchParams = new URLSearchParams({
      [`entry.${entryParameterIds[0]}`]: author.trim()
        ? author.trim()
        : AUTHOR_PLACEHOLDER,
      [`entry.${entryParameterIds[1]}`]: content.trim(),
    });
    return `${formUrl}?${queryParameters.toString()}`;
  }, [author, content, formUrl]);

  const hideModal = (): void => {
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

  const onDoneClick = (): void => {
    if (step === MAX_STEP) {
      queryClient.invalidateQueries([CardQueryKey.CARD_SPREADSHEET]);
    }
    hideModal();
  };

  const onCopyContentClick = async (): Promise<void> => {
    await navigator.clipboard.writeText(content);
    fireNotification({
      message: 'Message content copied!',
      placement: 'top',
      duration: 3,
    });
  };

  const renderContent = (): JSX.Element => {
    const cardMessage: CardMessage = {
      author: author.trim() ? author.trim() : AUTHOR_PLACEHOLDER,
      content: content.trim() ? content.trim() : CONTENT_PLACEHOLDER,
    };
    switch (step) {
      case 1:
        return (
          <div className={s.addToCardPreviewMessage}>
            {!content.trim() ? (
              <Alert
                message={
                  <span>
                    You have to write some content first! Go back to the{' '}
                    <a onClick={onPreviousStepClick}>previous step</a>.
                  </span>
                }
                showIcon={true}
                type="error"
              />
            ) : (
              <Alert
                message={
                  <span>
                    This is what your message will look like. If you are happy
                    with the result and no longer want to make any more changes,
                    you can continue to the{' '}
                    <a onClick={onNextStepClick}>next step</a>.
                  </span>
                }
                type="info"
              />
            )}
            <br />
            <CardMessageElement cardMessage={cardMessage} isPreview={true} />
          </div>
        );
      case MAX_STEP:
        return (
          <div>
            <div className={s.addToCardContent}>
              <Alert
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
                type="info"
              />
            </div>
            <iframe
              className={s.addToCardGoogleFormIframe}
              id={s.addToCardGoogleFormIframe}
              src={prefilledFormUrl}
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
                  allowClear={true}
                  defaultValue={author}
                  onBlur={onAuthorBlur}
                  placeholder={AUTHOR_PLACEHOLDER}
                />
              </Form.Item>
              <Form.Item label="Content" required={true}>
                <SimpleMdeReact
                  onChange={onContentChange}
                  options={simpleMdeOptions}
                  value={content}
                />
              </Form.Item>
            </Form>
          </div>
        );
    }
  };

  if (!formUrl) {
    return <></>;
  }
  return (
    <>
      <Tooltip align={{ offset: [0, 5] }} placement="top" title={TITLE}>
        <Button
          icon={<PlusOutlined />}
          onClick={showModal}
          shape="circle"
          type="default"
        />
      </Tooltip>
      <Modal
        bodyStyle={{ padding: '0px' }}
        closable={false}
        destroyOnClose={true}
        footer={
          <div>
            {step < MAX_STEP && (
              <Popconfirm
                cancelText="No"
                okText="Yes"
                onConfirm={hideModal}
                title={
                  <div className={s.cancelPopconfirmMessage}>
                    Are you sure you want to cancel? This will{' '}
                    <b>discard all changes</b>.
                  </div>
                }
              >
                <Button type="default">Cancel</Button>
              </Popconfirm>
            )}
            {step === MAX_STEP && (
              <Button onClick={onDoneClick} type="primary">
                Done
              </Button>
            )}
          </div>
        }
        title={TITLE}
        visible={isVisible}
        width={675}
      >
        <Row className={s.addToCardSteps} justify="space-around">
          <Col md={2} sm={0} xs={0}>
            <Button
              type="default"
              shape="circle"
              icon={<CaretLeftOutlined />}
              disabled={step === 0}
              onClick={onPreviousStepClick}
            />
          </Col>
          <Col md={20} sm={24} xs={24}>
            <Steps
              current={step}
              direction={isSmWidth ? 'horizontal' : 'vertical'}
              onChange={onStepChange}
              progressDot={true}
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
                    disabled={index === MAX_STEP && !content.trim()}
                    key={`step-${index}`}
                    title={
                      index === step ? <b>{titleToRender}</b> : titleToRender
                    }
                  />
                );
              })}
            </Steps>
          </Col>
          <Col md={2} sm={0} xs={0}>
            <Button
              disabled={(step === 1 && !content.trim()) || step === MAX_STEP}
              icon={<CaretRightOutlined />}
              onClick={onNextStepClick}
              shape="circle"
              type="default"
            />
          </Col>
        </Row>
        {renderContent()}
      </Modal>
    </>
  );
};

export default AddToCardModal;
