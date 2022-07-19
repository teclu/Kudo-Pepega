import { defineConfig, UserConfigExport } from 'vite';
import { setDefaultResultOrder } from 'node:dns';
import react from '@vitejs/plugin-react';
import sassDts from 'vite-plugin-sass-dts';

// Prints the address as localhost instead of 127.0.0.1.
setDefaultResultOrder('verbatim');

const configuration: UserConfigExport = defineConfig({
  plugins: [react(), sassDts()],
  server: {
    host: 'localhost',
    open: true,
    port: 8080,
  },
});

export default configuration;
