---
title: Install
---

# {{ $frontmatter.title }}

## With npm or yarn

Considering **you already have a working vue 3 project**, you'll have
to install Vue DIOD with its dependencies:
[`reflect-metadata`](https://www.npmjs.com/package/reflect-metadata)
and obviously [`diod`](https://www.npmjs.com/package/diod).

#### npm

```sh
npm install -s vue-diod diod reflect-metadata
```

#### yarn

```sh
yarn add vue-diod diod reflect-metadata
```

## Add properties to _tsconfig.json_

Modify your `tsconfig.json`to include the following settings:

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

## Configure Vite

As stated in the Vite issues
([here](https://github.com/evanw/esbuild/issues/257#issuecomment-658053616)):

> The emitDecoratorMetadata flag is intentionally not supported.

To enable this support, we have to disable esbuild and use SWC instead, thanks
to the
[`rollup-plugin-swc3`](https://www.npmjs.com/package/rollup-plugin-swc3/v/0.3.0)
package.

In your `vite.config.ts` file, simply add:

```typescript
import { defineConfig } from 'vite';
import swc from 'rollup-plugin-swc3';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  // ...

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
```
