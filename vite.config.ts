import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/',
  plugins: [react()],
  resolve: {
    alias: {
      app: '/src/app',
      assets: '/src/assets',
      data: '/src/data',
      pages: '/src/pages',
      styles: '/src/styles',
      types: '/src/types',
      widgets: '/src/widgets'
    }
  }
});
