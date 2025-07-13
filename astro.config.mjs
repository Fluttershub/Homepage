import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import node from '@astrojs/node';

export default defineConfig({
  output: 'server',
  adapter: node({
    host: '0.0.0.0',
    port: 4321, // default port for Astro SSR
    mode: 'standalone', // bundles dependencies with output
  }),
  integrations: [react()],
});
