import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Container from './container';

import 'antd/dist/antd.dark.min.css';
import 'easymde/dist/easymde.min.css';

const element: HTMLElement = document.getElementById('root') as HTMLElement;

const queryClient: QueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

const root: ReactDOM.Root = ReactDOM.createRoot(element);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Container />
    </QueryClientProvider>
  </React.StrictMode>,
);
