import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    host: true, // Listen on all local IP addresses so mobile phones on local Wi-Fi can connect
    port: 5173
  }
});
