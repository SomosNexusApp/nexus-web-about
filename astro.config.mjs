// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://nexus-app.es',
  integrations: [sitemap()],
}); // Final forced route refresh