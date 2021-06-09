import React from 'react';
import ReactMarkdown from 'react-markdown';
import type SimpleMDE from 'easymde';
import { SimpleMdeReact } from 'react-simplemde-editor';
import {
  Alert,
  Button,
  Card,
  Form,
  Input,
  Modal,
  notification,
  Popconfirm,
  Steps,
} from 'antd';
import { EditOutlined } from '@ant-design/icons';
import 'easymde/dist/easymde.min.css';

import s from '../s.module.scss';

type BoardModalProps = {
  formUrl: string;
};

const TITLE: string = 'Add to Board';

const AUTHOR_PLACEHOLDER: string = 'Anonymous';

const CONTENT_PLACEHOLDER: string = "*UHM*... I didn't write anything!";

const BoardModal = ({ formUrl }: BoardModalProps): JSX.Element => {
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

  const onAuthorBlur = (event: React.ChangeEvent<HTMLInputElement>): void =>
    setAuthor(event.target.value);

  const onContentChange = (value: string): void => setContent(value);

  const onCancelClick = (): void => {
    if (step < 2 && (!!author.trim() || !!content.trim())) {
      showPopconfirm();
      return;
    }
    hideModal();
  };

  const onCopyContentClick = (): void => {
    const element: HTMLTextAreaElement = document.createElement('textarea');
    element.textContent = content;
    document.body.appendChild(element);
    element.select();
    document.execCommand('copy');
    console.debug(element);
    document.body.removeChild(element);
    notification['success']({
      message: 'Message content copied!',
      placement: 'bottomLeft',
      duration: 3,
    });
  };

  const renderContent: JSX.Element = React.useMemo((): JSX.Element => {
    switch (step) {
      case 1:
        return (
          <div className={s.addToBoardPreviewMessage}>
            {!content.trim() ? (
              <Alert
                type="error"
                message="You have to write some content before you can continue to the next step."
                showIcon
              />
            ) : (
              <Alert
                type="info"
                message="This is what your message will look like. If you are happy with the result and no longer want to make any more edits, you can continue to the next step."
              />
            )}
            <Card className={s.boardMessageCard}>
              <ReactMarkdown
                className={s.boardMessageContent}
                children={content.trim() ? content.trim() : CONTENT_PLACEHOLDER}
              />
              <div className={s.boardMessageAuthor}>
                {author.trim() ? author.trim() : AUTHOR_PLACEHOLDER}
              </div>
            </Card>
          </div>
        );
      case 2:
        return (
          <>
            <div className={s.addToBoardContent}>
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
              id={s.addToBoardGoogleFormIframe}
              className={s.addToBoardGoogleFormIframe}
              onLoad={(): void => {
                const iframe: HTMLIFrameElement = document.getElementById(
                  s.addToBoardGoogleFormIframe,
                ) as HTMLIFrameElement;
                if (iframe) {
                }
              }}
              src={formUrl}
            />
          </>
        );
      default:
        return (
          <div className={s.addToBoardContent}>
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
  }, [step]);

  return (
    <>
      <Button
        type="default"
        shape="round"
        size="large"
        className={s.boardActionButton}
        icon={<EditOutlined />}
        onClick={showModal}
      >
        {TITLE}
      </Button>
      <Modal
        title={TITLE}
        visible={isVisible}
        width={675}
        closable={false}
        bodyStyle={{ padding: '0px' }}
        footer={
          <Popconfirm
            title={
              <div className={s.popconfirmContent}>
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
              type={step < 2 ? 'default' : 'primary'}
              onClick={onCancelClick}
            >
              {step < 2 ? 'Cancel' : 'Done'}
            </Button>
          </Popconfirm>
        }
        destroyOnClose={true}
      >
        <Steps
          className={s.addToBoardSteps}
          current={step}
          onChange={onStepChange}
          progressDot
        >
          {['Write Message', 'Confirm Preview', 'Submit to Form'].map(
            (title: string, index: number): JSX.Element => (
              <Steps.Step
                title={title}
                key={index}
                disabled={index === 2 && !content.trim()}
              />
            ),
          )}
        </Steps>
        {renderContent}
      </Modal>
    </>
  );
};

export default BoardModal;
