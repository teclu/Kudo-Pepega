import {useState, useEffect} from "../../../_snowpack/pkg/react.js";
import {BreakpointWidth} from "../enums.js";
const getMinWidthQuery = (breakpointWidth) => `(min-width: ${breakpointWidth}px)`;
const useWidth = () => {
  const [isXsWidth, setIsXsWidth] = useState(window.matchMedia(getMinWidthQuery(BreakpointWidth.XS)).matches);
  const [isSmWidth, setIsSmWidth] = useState(window.matchMedia(getMinWidthQuery(BreakpointWidth.SM)).matches);
  const [isMdWidth, setIsMdWidth] = useState(window.matchMedia(getMinWidthQuery(BreakpointWidth.MD)).matches);
  const [isLgWidth, setIsLgWidth] = useState(window.matchMedia(getMinWidthQuery(BreakpointWidth.LG)).matches);
  const [isXlWidth, setIsXlWidth] = useState(window.matchMedia(getMinWidthQuery(BreakpointWidth.XL)).matches);
  const [isXxlWidth, setIsXxlWidth] = useState(window.matchMedia(getMinWidthQuery(BreakpointWidth.XXL)).matches);
  useEffect(() => {
    const xsCallback = (event) => setIsXsWidth(event.matches);
    const smCallback = (event) => setIsSmWidth(event.matches);
    const mdCallback = (event) => setIsMdWidth(event.matches);
    const lgCallback = (event) => setIsLgWidth(event.matches);
    const xlCallback = (event) => setIsXlWidth(event.matches);
    const xxlCallback = (event) => setIsXxlWidth(event.matches);
    const xsMediaQueryList = window.matchMedia(getMinWidthQuery(BreakpointWidth.XS));
    xsMediaQueryList.addEventListener("change", smCallback);
    const smMediaQueryList = window.matchMedia(getMinWidthQuery(BreakpointWidth.SM));
    smMediaQueryList.addEventListener("change", smCallback);
    const mdMediaQueryList = window.matchMedia(getMinWidthQuery(BreakpointWidth.MD));
    mdMediaQueryList.addEventListener("change", mdCallback);
    const lgMediaQueryList = window.matchMedia(getMinWidthQuery(BreakpointWidth.LG));
    lgMediaQueryList.addEventListener("change", lgCallback);
    const xlMediaQueryList = window.matchMedia(getMinWidthQuery(BreakpointWidth.XL));
    xlMediaQueryList.addEventListener("change", xlCallback);
    const xxlMediaQueryList = window.matchMedia(getMinWidthQuery(BreakpointWidth.XXL));
    xxlMediaQueryList.addEventListener("change", xxlCallback);
    return () => {
      xsMediaQueryList.removeEventListener("change", xsCallback);
      smMediaQueryList.removeEventListener("change", smCallback);
      mdMediaQueryList.removeEventListener("change", mdCallback);
      lgMediaQueryList.removeEventListener("change", lgCallback);
      xlMediaQueryList.removeEventListener("change", xlCallback);
      xxlMediaQueryList.removeEventListener("change", xxlCallback);
    };
  }, []);
  return {
    isXsWidth,
    isSmWidth,
    isMdWidth,
    isLgWidth,
    isXlWidth,
    isXxlWidth
  };
};
export default useWidth;
