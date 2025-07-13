import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import node from '@astrojs/node';

export default defineConfig({
  output: 'server',
  adapter: node({
    host: 'fluttershub.com',
    mode: 'standalone', // bundles dependencies with output
  }),
  integrations: [react()],
});
