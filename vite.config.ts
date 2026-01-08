import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/',
  plugins: [react()],
  resolve: {
    alias: {
      app: '/src/app',
      assets: '/src/assets',
      contexts: '/src/contexts',
      features: '/src/features',
      pages: '/src/pages',
      services: '/src/services',
      styles: '/src/styles',
      types: '/src/types',
      widgets: '/src/widgets'
    }
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    sourcemap: false,
    // Reduce memory usage during build
    cssCodeSplit: true,
    reportCompressedSize: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'cytoscape-vendor': ['cytoscape']
        },
        // Reduce memory usage by compacting output
        compact: true
      }
    },
    chunkSizeWarningLimit: 1000
  }
});
