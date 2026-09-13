import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://g-cam.example.com',
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
  ],
});
