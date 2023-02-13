---
title: Custom Logger
---

# {{ $frontmatter.title }}

Here we create the same counter as in the [Simple Counter](simple-counter.md)
example, but our `AbstractCounter` now takes an `AbstractLogger` as
constructor dependency.

## Abstractions

The counter abstract class.

:::info NOTA BENE
This is the same abstraction used in the
[Simple Counter](simple-counter.md) example.
We will provide a new implementation, including the logger as dependency.
:::

```typescript
export abstract class AbstractCounter {
  public abstract increment(value: number): number;
  public abstract decrement(value: number): number;
}
```

The logger abstract class.

```typescript
export abstract class AbstractLogger {
  public abstract log(...args: any[]): void;
  public abstract info(...args: any[]): void;
  public abstract warn(...args: any[]): void;
  public abstract error(...args: any[]): void;
}
```

## Services

We now have a new implementation of the counter's abstract class, that calls
the `log` method of the logger implementation we'll be using for the
`AbstractLogger` class.

```typescript
import { Service } from 'diod';
import { AbstractLogger } from '../logger';
import { AbstractCounter } from './counter.abstract';

@Service()
export class Counter implements AbstractCounter {
  // WARNING: Injected dependencies must be public.
  constructor(public readonly logger: AbstractLogger) {}

  public increment(value: number): number {
    const count = value + 1;
    this.logger.log(`In Counter: Count was %d and is now %d`, value, count);

    return count;
  }

  public decrement(value: number): number {
    const count = value - 1;
    this.logger.log(`In Counter: Count was %d and is now %d`, value, count);

    return count;
  }
}
```

## Application

```typescript
// main.ts

import 'reflect-metadata';

import { createApp } from 'vue';
import VueDiod from 'vue-diod';

// Import abstractions.

import { AbstractCounter } from './counter.abstract';
import { AbstractLogger } from './logger.abstract';

// Import concrete classes.
import { Counter } from './counter.service';
import { Logger } from './logger.service';

import App from './App.vue';

const app = createApp(App);
app.use(VueDiod, {
  injectables: [
    {
      register: AbstractCounter,
      use: Counter,
    },
    // This one will be 'autowired' to Counter implementation above.
    {
      register: AbstractLogger,
      use: Logger,
    },
  ],
});

app.mount('#app');
```

## Component

We can re-use our [Simple Counter](simple-counter.md) example component.
The counter implementation's dependency is set at the application bootstrap.

```typescript
<script setup lang="ts">
  import type { Ref } from 'vue';
  import { ref } from 'vue';
  import { useVueDiod } from 'vue-diod';
  import { AbstractCounter } from '../modules';

  // Use the injection helper.

  const { injectService } = useVueDiod();

  // Setup the (optional) fallback.

  const fallback = () => {
    return {
      increment(value: number) {
        console.warn('Function increment was called from fallback.');
        return value++;
      },
      decrement(value: number) {
        console.warn('Function decrement was called from fallback.');
        return value--;
      },
    };
  };

  const counter = injectService<AbstractCounter | any>(
    AbstractCounter,
    fallback
  );

  const count: Ref<number> = ref(0);

  const increment = counter.increment.bind(counter);
  const decrement = counter.decrement.bind(counter);

</script>
```

With the same template:

```html
<template>
  <button @click="increment(count)">Increment</button>
  <button @click="decrement(count)">Decrement</button>
</template>
```

## Result

::: warning ACTION REQUIRED
Open your devtools to see custom logs.
:::

<script setup>
import CustomLogger from '../.vitepress/theme/components/custom-logger.component.vue';
import LoggerOnly from '../.vitepress/theme/components/logger-only.component.vue';
</script>

<div style="width: 100%; display: flex; justify-content: center; margin: 4rem 0;">
  <CustomLogger />
</div>

::: info Logger

A logger component using the same injected dependency as our counter above.

<div style="width: 100%; display: flex; justify-content: center; margin: 2rem 0;">
  <LoggerOnly />
</div>
:::
