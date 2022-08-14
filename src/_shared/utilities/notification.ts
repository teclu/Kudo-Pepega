import { notification } from 'antd';
import { ArgsProps } from 'antd/lib/notification';

const DEFAULT_DURATION = 3;

/**
 * Fires an AntD notification.
 * @param {ArgsProps} argsProps Arguments for the notification.
 */
export const fireNotification = (argsProps: ArgsProps): void =>
  notification[argsProps.type ?? 'info']({
    duration: DEFAULT_DURATION,
    ...argsProps,
  });
