import { useState, useEffect } from 'react';

import { BreakpointWidth } from '../enums';

const getMinWidthQuery = (breakpointWidth: BreakpointWidth): string =>
  `(min-width: ${breakpointWidth}px)`;

export const useWidth = (): {
  isXsWidth: boolean;
  isSmWidth: boolean;
  isMdWidth: boolean;
  isLgWidth: boolean;
  isXlWidth: boolean;
  isXxlWidth: boolean;
} => {
  const [isXsWidth, setIsXsWidth] = useState<boolean>(
    window.matchMedia(getMinWidthQuery(BreakpointWidth.XS)).matches,
  );

  const [isSmWidth, setIsSmWidth] = useState<boolean>(
    window.matchMedia(getMinWidthQuery(BreakpointWidth.SM)).matches,
  );

  const [isMdWidth, setIsMdWidth] = useState<boolean>(
    window.matchMedia(getMinWidthQuery(BreakpointWidth.MD)).matches,
  );

  const [isLgWidth, setIsLgWidth] = useState<boolean>(
    window.matchMedia(getMinWidthQuery(BreakpointWidth.LG)).matches,
  );

  const [isXlWidth, setIsXlWidth] = useState<boolean>(
    window.matchMedia(getMinWidthQuery(BreakpointWidth.XL)).matches,
  );

  const [isXxlWidth, setIsXxlWidth] = useState<boolean>(
    window.matchMedia(getMinWidthQuery(BreakpointWidth.XXL)).matches,
  );

  /*
   * Listen for changes in window width.
   */
  useEffect((): (() => void) => {
    const xsCallback = (event: MediaQueryListEvent): void =>
      setIsXsWidth(event.matches);

    const smCallback = (event: MediaQueryListEvent): void =>
      setIsSmWidth(event.matches);

    const mdCallback = (event: MediaQueryListEvent): void =>
      setIsMdWidth(event.matches);

    const lgCallback = (event: MediaQueryListEvent): void =>
      setIsLgWidth(event.matches);

    const xlCallback = (event: MediaQueryListEvent): void =>
      setIsXlWidth(event.matches);

    const xxlCallback = (event: MediaQueryListEvent): void =>
      setIsXxlWidth(event.matches);

    const xsMediaQueryList: MediaQueryList = window.matchMedia(
      getMinWidthQuery(BreakpointWidth.XS),
    );
    xsMediaQueryList.addEventListener('change', smCallback);

    const smMediaQueryList: MediaQueryList = window.matchMedia(
      getMinWidthQuery(BreakpointWidth.SM),
    );
    smMediaQueryList.addEventListener('change', smCallback);

    const mdMediaQueryList: MediaQueryList = window.matchMedia(
      getMinWidthQuery(BreakpointWidth.MD),
    );
    mdMediaQueryList.addEventListener('change', mdCallback);

    const lgMediaQueryList: MediaQueryList = window.matchMedia(
      getMinWidthQuery(BreakpointWidth.LG),
    );
    lgMediaQueryList.addEventListener('change', lgCallback);

    const xlMediaQueryList: MediaQueryList = window.matchMedia(
      getMinWidthQuery(BreakpointWidth.XL),
    );
    xlMediaQueryList.addEventListener('change', xlCallback);

    const xxlMediaQueryList: MediaQueryList = window.matchMedia(
      getMinWidthQuery(BreakpointWidth.XXL),
    );
    xxlMediaQueryList.addEventListener('change', xxlCallback);

    // Remove the listeners when component is unmounted.
    return (): void => {
      xsMediaQueryList.removeEventListener('change', xsCallback);
      smMediaQueryList.removeEventListener('change', smCallback);
      mdMediaQueryList.removeEventListener('change', mdCallback);
      lgMediaQueryList.removeEventListener('change', lgCallback);
      xlMediaQueryList.removeEventListener('change', xlCallback);
      xxlMediaQueryList.removeEventListener('change', xxlCallback);
    };
  }, []);

  return {
    isXsWidth,
    isSmWidth,
    isMdWidth,
    isLgWidth,
    isXlWidth,
    isXxlWidth,
  };
};
