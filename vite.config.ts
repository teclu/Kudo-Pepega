import react from '@vitejs/plugin-react';
import mdPlugin, { Mode } from 'vite-plugin-markdown';
import sassDts from 'vite-plugin-sass-dts';
import { defineConfig, UserConfigExport } from 'vite';
import { setDefaultResultOrder } from 'node:dns';

// Prints the address as localhost instead of 127.0.0.1.
setDefaultResultOrder('verbatim');

const configuration: UserConfigExport = defineConfig({
  plugins: [
    mdPlugin({
      mode: [Mode.HTML],
    }),
    react(),
    sassDts(),
  ],
  preview: {
    host: 'localhost',
    open: true,
    port: 8081,
  },
  server: {
    host: 'localhost',
    open: true,
    port: 8080,
  },
});

export default configuration;
