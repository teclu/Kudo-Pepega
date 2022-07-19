import { notification } from 'antd';
import type { ArgsProps } from 'antd/lib/notification';

const DEFAULT_DURATION = 3;

/**
 * Fires an Ant Design notification.
 * @param {ArgsProps} argsProps Arguments for the notification.
 */
const fireNotification = (argsProps: ArgsProps): void =>
  notification[argsProps.type ?? 'info']({
    duration: DEFAULT_DURATION,
    ...argsProps,
  });

export default fireNotification;
