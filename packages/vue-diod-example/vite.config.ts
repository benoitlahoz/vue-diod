import { defineConfig } from 'vite';
import swc from 'rollup-plugin-swc3';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    minify: 'terser',
  },
  plugins: [
    swc({
      jsc: {
        parser: {
          syntax: 'typescript',
          dynamicImport: true,
          decorators: true,
        },
        target: 'es2021',
        transform: {
          decoratorMetadata: true,
        },
      },
    }),
    vue(),
  ],
  esbuild: false,
});
