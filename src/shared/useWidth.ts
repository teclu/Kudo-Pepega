import { useState, useEffect } from 'react';

import { BreakpointWidth } from './enums';

const getMinWidthQuery = (breakpointWidth: BreakpointWidth): string =>
  `(min-width: ${breakpointWidth}px)`;

const useWidth = (): {
  isLgWidth: boolean;
  isXlWidth: boolean;
} => {
  const [isLgWidth, setIsLgWidth] = useState<boolean>(
    window.matchMedia(getMinWidthQuery(BreakpointWidth.LG)).matches,
  );

  const [isXlWidth, setIsXlWidth] = useState<boolean>(
    window.matchMedia(getMinWidthQuery(BreakpointWidth.XL)).matches,
  );

  /*
   * Listen for changes in window width.
   */
  useEffect((): (() => void) => {
    const lgCallback = (event: MediaQueryListEvent): void =>
      setIsLgWidth(event.matches);

    const xlCallback = (event: MediaQueryListEvent): void =>
      setIsXlWidth(event.matches);

    const lgMediaQueryList: MediaQueryList = window.matchMedia(
      getMinWidthQuery(BreakpointWidth.LG),
    );

    lgMediaQueryList.addEventListener('change', lgCallback);

    const xlMediaQueryList: MediaQueryList = window.matchMedia(
      getMinWidthQuery(BreakpointWidth.XL),
    );
    xlMediaQueryList.addEventListener('change', xlCallback);

    // Remove the listeners when component is unmounted.
    return (): void => {
      lgMediaQueryList.removeEventListener('change', lgCallback);
      xlMediaQueryList.removeEventListener('change', xlCallback);
    };
  }, []);

  return {
    isLgWidth,
    isXlWidth,
  };
};

export default useWidth;
