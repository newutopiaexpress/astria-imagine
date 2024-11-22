import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

// Load environment variables from .env file
dotenv.config();

const BEARER_TOKEN = process.env.ASTRIA_API_KEY;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Set base URL to "/imagine/" by default, or "" if explicitly set to "false"
  base: process.env.VITE_DEPLOY_TO_ASTRIA === "true" ? "/imagine/" : "",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5173,
    ...(BEARER_TOKEN && {
      proxy: {
        '/api': {
          target: 'https://api.astria.ai',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
              proxyReq.setHeader('Authorization', `Bearer ${BEARER_TOKEN}`);
            });
          }
        },
        '/rails/active_storage/blobs': {
          target: 'https://api.astria.ai',
          changeOrigin: true,
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
              proxyReq.setHeader('Authorization', `Bearer ${BEARER_TOKEN}`);
            });
          }
        }
      }
    })
  }
})
