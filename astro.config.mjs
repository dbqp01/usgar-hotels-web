import { defineConfig, passthroughImageService } from 'astro/config';
import node from '@astrojs/node';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  output: 'static',
  adapter: node({ mode: 'standalone' }),
  image: {
    // Using passthrough locally (Sharp blocked by Windows policy)
    // Vercel will optimize images automatically in production
    service: passthroughImageService(),
  },
  vite: {
    plugins: [tailwindcss()]
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    routing: {
      prefixDefaultLocale: false
    }
  }
});

