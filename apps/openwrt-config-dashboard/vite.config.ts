import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import jotaiDebugLabel from 'jotai/babel/plugin-debug-label';
import jotaiReactRefresh from 'jotai/babel/plugin-react-refresh';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  server: {
    proxy: {
      '/cgi-bin/': {
        target: 'http://192.168.1.114',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/rpc/, '/rpc'),
      },
    },
    cors: false,
  },
  plugins: [nodePolyfills(), react({ babel: { plugins: [jotaiDebugLabel, jotaiReactRefresh] } })],
  resolve: {
    alias: [
      { find: '@/', replacement: '/src' },
      { find: '@/assets', replacement: '/src/assets' },
      { find: '@/components', replacement: '/src/components' },
      { find: '@/types', replacement: '/src/types' },
      { find: '@/hooks', replacement: '/src/hooks' },
    ],
  },
});
