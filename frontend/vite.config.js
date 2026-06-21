import { defineConfig,loadEnv } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import process from 'node:process';
const env = loadEnv("development", process.cwd());

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/api': {
        target: env.VITE_BACKEND_URL || 'http://localhost:4000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})