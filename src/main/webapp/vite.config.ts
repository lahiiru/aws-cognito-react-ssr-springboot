import { reactRouter } from "@react-router/dev/vite";
import autoprefixer from "autoprefixer";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import wyw from '@wyw-in-js/vite';

export default defineConfig({
  css: {
    postcss: {
      plugins: [autoprefixer],
    },
  },
  plugins: [
    wyw({
      include: ['**/*.{ts,tsx}'],
      babelOptions: {
        presets: ['@babel/preset-typescript', '@babel/preset-react'],
      },
    }),
    reactRouter(),
    tsconfigPaths()
  ],
  server: {
    proxy: {
      '/api': {
        target: process.env.API_BASE_URL, // Backend server
        changeOrigin: true,             // Ensure correct origin
        rewrite: (path) => path.replace(/^\/api/, '/api'), // Optional: Preserve /api prefix
      },
    },
  },

});
