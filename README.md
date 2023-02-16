<p align="center" width="100%">
<img src="https://github.com/benoitlahoz/vue-diod/raw/main/packages/vue-diod/docs/public/logo-vue-diod%40512px.png" width="200" height="237" />

<h1 align="center">Vue DIOD</h1>

<h3 align="center">Dependency Injection On Demand in Vue.js thanks to DIOD library.</h3>

---

</p>

[Documentation & Examples](https://benoitlahoz.github.io/vue-diod)

## Quick Start

### Install dependencies

Considering **you already have a working [Vue 3](https://vuejs.org/) project**, you'll have
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

### Typescript configuration

Modify your `tsconfig.json`to include the following settings:

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

### Vite configuration

As stated in the Vite GitHub issues
([here](https://github.com/evanw/esbuild/issues/257#issuecomment-658053616)):

> The emitDecoratorMetadata flag is intentionally not supported.

To enable this support, we have to disable esbuild and use SWC instead, thanks
to the
[`rollup-plugin-swc3`](https://www.npmjs.com/package/rollup-plugin-swc3/v/0.3.0)
package.

```sh
npm install --save-dev @swc/core rollup-plugin-swc3

# OR

yarn add -D @swc/core rollup-plugin-swc3
```

Then, in our `vite.config.js` or `vite.config.ts` file, we simply have to add:

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
