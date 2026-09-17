import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  // Proxy only in local dev — in production, VITE_API_URL env var is used
  server: mode === 'development' ? {
    proxy: {
      '/api': 'http://localhost:8080'
    }
  } : {}
}));
