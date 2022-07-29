import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solidPlugin()],
  server: {
    port: 8080,
    open: '/app/views/main.html'
  },
  build: {
    target: 'esnext',
    outDir: 'vite',
    rollupOptions: {
      input: {
        main: './app/views/main.html',
        openMagnet: './app/views/openMagnet.html'
      }
    }
  }
})
