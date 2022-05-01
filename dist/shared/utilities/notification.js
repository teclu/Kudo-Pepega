import {notification} from "../../../_snowpack/pkg/antd.js";
const DEFAULT_DURATION = 3;
const fireNotification = (argsProps) => notification[argsProps.type ?? "info"]({
  duration: DEFAULT_DURATION,
  ...argsProps
});
export default fireNotification;
