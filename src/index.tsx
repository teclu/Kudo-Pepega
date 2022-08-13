import React from 'react';
import { ThemeSwitcherProvider } from 'react-css-theme-switcher';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Theme } from './_shared/enums';
import Container from './container';

import 'easymde/dist/easymde.min.css';

const element: HTMLBodyElement = document.getElementById(
  'root',
) as HTMLBodyElement;

const queryClient: QueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  },
});

const root: ReactDOM.Root = ReactDOM.createRoot(element);

const theme: Theme = (localStorage.getItem('theme') as Theme) ?? Theme.Light;

const themeInsertionPoint: HTMLHeadElement = document.getElementById(
  'theme-injection-point',
) as HTMLHeadElement;

const themes: Record<Theme, string> = {
  light: 'styles/antd.min.css',
  dark: 'styles/antd.dark.min.css',
};

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeSwitcherProvider
        defaultTheme={theme}
        insertionPoint={themeInsertionPoint}
        themeMap={themes}
      >
        <Container />
      </ThemeSwitcherProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
