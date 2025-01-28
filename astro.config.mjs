import { defineConfig } from 'astro/config';
import alpinejs from '@astrojs/alpinejs';
import tailwind from '@astrojs/tailwind';
import icon from 'astro-icon';

export default defineConfig({
  integrations: [
    alpinejs(), 
    tailwind(),
    icon({include: {ri: ['*']}})
  ],
  output: 'static',
  site: 'https://ramonpzg.github.io',
  vite: {
    define: {
      '__HF_TOKEN__': JSON.stringify(process.env.PUBLIC_HF_TOKEN),
    },
    optimizeDeps: {
      include: ['@huggingface/inference']
    },
    ssr: {
      noExternal: ['@huggingface/inference']
    }
  }
});