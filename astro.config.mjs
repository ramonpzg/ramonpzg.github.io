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
      'import.meta.env.PUBLIC_HF_TOKEN': JSON.stringify(process.env.PUBLIC_HF_TOKEN)
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            chat: ['@huggingface/inference']
          }
        }
      }
    },
    optimizeDeps: {
      include: ['@huggingface/inference']
    },
    ssr: {
      noExternal: ['@huggingface/inference']
    }
  }
});