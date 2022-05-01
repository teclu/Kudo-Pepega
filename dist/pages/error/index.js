import React from "../../../_snowpack/pkg/react.js";
import {Skeleton} from "../../../_snowpack/pkg/antd.js";
import {useNavigate} from "../../../_snowpack/pkg/react-router-dom.js";
import {ROOT_PATH} from "../../container/routing.js";
const Error = () => {
  const navigate = useNavigate();
  React.useEffect(() => {
    navigate(ROOT_PATH.path);
  }, [history]);
  return /* @__PURE__ */ React.createElement(Skeleton, {
    active: true
  });
};
export default Error;
