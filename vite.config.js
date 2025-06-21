import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/produtos': {
        target: 'http://leoproti.com.br:8004',
        changeOrigin: true,
      },
    },
  },
});
