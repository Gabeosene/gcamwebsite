import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import netlify from '@astrojs/netlify';

export default defineConfig({
  site: 'https://g-cam.example.com',
  output: 'server',
  adapter: netlify(),
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
  ],
});
