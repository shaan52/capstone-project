import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: 'localhost',
    port: 3000,
  },
  resolve: {
    alias: {
      '@': '/src', // Simplify imports by allowing `@` to reference the `src` directory
    },
  },
});
