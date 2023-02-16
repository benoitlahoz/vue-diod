<p align="center" width="100%">
<img src="https://github.com/benoitlahoz/vue-diod/raw/main/packages/vue-diod/docs/public/logo-vue-diod%40512px.png" width="200" height="237" />

<h1 align="center">Vue DIOD</h1>

<p align="center" style="font-size: 1.3em; font-weight: bold;">Dependency Injection in Vue.js thanks to DIOD library.</p>

---

</p>

[Documentation & Examples](https://benoitlahoz.github.io/vue-diod) | [DIOD on GitHub](https://github.com/artberri/diod)

## About

As stated by its [author](https://github.com/artberri) on [GitHub](https://github.com/artberri/diod), DIOD is:

> A very opinionated and lightweight (under 2kB minified and gzipped) inversion of control container and dependency injector for Node.js or browser apps. It is available for vanilla Javascript usage but its true power will be shown by building Typescript apps.

**Vue DIOD** is made on top of DIOD and helps avoiding [SOLID](https://en.wikipedia.org/wiki/SOLID) principles violations in [Vue 3](https://vuejs.org/) applications. It allows to configure dependencies at the app level and / or at component level, without children knowing abour the actual implementations.

Basically, it wraps DIOD functionalities in a plugin which uses Vue's `provide` method to make dependencies available to subtree components, by calling `inject` with the registered abstract class as key.

It also provides its [builder](https://benoitlahoz.github.io/vue-diod/composable-and-builder/builder) for bootstrapping dependencies at component level, and a [composable](https://benoitlahoz.github.io/vue-diod/composable-and-builder/use-vue-diod) which main purpose is helping with injection key typings.

## Quick example (with plugin)

#### Define abstraction

```typescript
export abstract class AbstractCounter {
  increment(value: number): number;
  decrement(value: number): number;
}
```

#### Create implementation

```typescript
export class Counter implements AbstractCounter {
  public increment(value: number): number {
    return value + 1;
  }

  public decrement(value: number): number {
    return value - 1;
  }
}
```

#### Bootstrap dependency container

In your `main.ts` file, for example.

```typescript
import('reflect-metadata');

// ...

app.use(VueDiod, {
  injectables: [{ register: AbstractCounter, use: Counter }],
});

// ...
```

#### Inject in component

**Without helper**

**NB**: Keeping your application decoupled from Vue DIOD.

In the component's `<script setup>`.

```typescript
// ...

import type { InjectionKey } from 'vue';
import { inject } from 'vue';

const Key = AbstractCounter as unknown;
const counter = inject<() => AbstractCounter>(
  Key as InjectionKey<AbstractCounter>
  /* Optional fallback */
);

const increment = counter.increment.bind(counter);
const decrement = counter.decrement.bind(counter);

// ...
```

```html
<template>
  <!-- Use in your template -->
</template>
```

**With Vue DIOD helper**

```typescript
// ...

import { useVueDiod } from 'vue-diod';
const { injectServiceInstance } = useVueDiod();

const counter = injectServiceInstance<AbstractCounter>(
  AbstractCounter
  /* Optional fallback */
);

const increment = counter.increment.bind(counter);
const decrement = counter.decrement.bind(counter);

// ...
```

For other examples, please check the [documentation](https://benoitlahoz.github.io/vue-diod) that provides an [example](https://benoitlahoz.github.io/vue-diod/examples/storage/introduction) for bootstrapping the container at component level, and demonstrate DIOD's powerful `autowire` for constructor's dependencies.

## Install

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

## TODO

- [ ] Tests
- [ ] Improve documentation
- [ ] Complete examples in the monorepo packages
