import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/',
  plugins: [react()],
  resolve: {
    alias: {
      app: '/src/app',
      data: '/src/data',
      hooks: '/src/hooks',
      pages: '/src/pages',
      styles: '/src/styles',
      types: '/src/types',
      widgets: '/src/widgets'
    }
  }
});
