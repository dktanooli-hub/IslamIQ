import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { adminSecurityPlugin } from './src/server/adminSecurityPlugin';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), adminSecurityPlugin()],
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
});
