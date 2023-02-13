---
title: Simple Counter
---

# {{ $frontmatter.title }}

Here we create a very simple counter and use Vue DIOD helper `useVueDiod`
to inject our service.

## Abstraction

Create the abstract class our service will implement, and that will serve
as key to get an instance.

```typescript
// counter.abstract.ts

export abstract class AbstractSimpleCounter {
  public abstract increment(value: number): number;
  public abstract decrement(value: number): number;
}
```

## Service

Create the service that implements the abstract class.

```typescript
// counter-by-one.service.ts

import { Service } from 'diod';
import { AbstractCounter } from './counter.abstract';

@Service()
export class CounterByOne implements AbstractCounter {
  constructor() {}

  public increment(value: number): number {
    const count = value + 1;
    return count;
  }

  public decrement(value: number): number {
    const count = value - 1;
    return count;
  }
}
```

## Application

At the Vue.js application bootstrap, setup the app to `use` Vue DIOD and pass
abstraction and concrete class to module's configuration.

<!--@include: ../snippets/simple-counter.example.md-->

## Component

To inject the counter in our component we can use the `injectService` method
from the Vue DIOD composable `useVueDiod`. For other ways to inject our service,
please refer to [Basic usage](../getting-started/basic-usage.md) section.

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
    // Pass the abstract class as key.

    AbstractCounter,

    // NB: Vue DIOD allows not to pass fallback, if you're sure the key exists
    // and pass 'any' in the return type: '<AbstractCounter | any>'.

    fallback
  );

  /*

  // NB: Things could also be done like this.

  const Key = AbstractCounter as unknown;

  const counter = inject<() => AbstractCounter>(
    Key as InjectionKey<AbstractCounter>,

    // Pass a fallback to avoid further checks.
    () => {
      return {
        increment(value: number) {
          return value++;
        },
        decrement(value: number) {
          return value--;
        },
      };
    }
  )(); // Note the injection returns a function that calls 'get' on the DIOD container.
  */

  const count: Ref<number> = ref(0);

  // Our component's methods.

  // WARNING: Typescript will not complain if you didn't pass a fallback
  // to the injectService method above as we ensured it returns
  // 'AbstractCounter' or 'any'.

  const increment = counter.increment.bind(counter);
  const decrement = counter.decrement.bind(counter);

</script>
```

Then, in our template:

```html
<template>
  <button @click="increment(count)">Increment</button>
  <button @click="decrement(count)">Decrement</button>
</template>
```

## Result

<script setup>
import SimpleCounter from '../.vitepress/theme/components/simple-counter.component.vue';
</script>

<div style="width: 100%; display: flex; justify-content: center; margin: 4rem 0;">
  <SimpleCounter />
</div>
