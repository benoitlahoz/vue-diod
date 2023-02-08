import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import swc from 'rollup-plugin-swc3';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'VueDiod',
      fileName: 'vue-diod',
    },
    target: 'esnext',
    minify: 'terser',
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
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
      ],
    },
  },
  plugins: [
    vue(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  esbuild: false,
});
