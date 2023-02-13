---
title: Basic Usage
---

# {{ $frontmatter.title }}

::: info ADVANCED
Read the **DIOD** documentation on [Github](https://github.com/artberri/diod/blob/main/docs/README.md).
:::

## Abstract classes as keys

**DIOD** provides a way to register our implementations and their dependencies
and find them back by passing the abstractioon they implement as key.
We'll see here how to configure container with VueDiod for an usage in Vue 3.

## Abstractions

Let's say we want to create a simple counter to increment or decrement a number. Its
definition could be:

```typescript
export abstract class AbstractCounter {
  public abstract increment(value: number): number;
  public abstract decrement(value: number): number;
}
```

## Implementations

Then, we could implement this counter like this (count by 1):

```typescript
import { Service } from 'diod';
import { AbstractCounter } from './counter.abstract';

@Service()
export class CounterByOne implements AbstractCounter {
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

... or like that (count by 5):

```typescript
import { Service } from 'diod';
import { AbstractCounter } from './counter.abstract';

@Service()
export class CounterByFive implements AbstractCounter {
  public increment(value: number): number {
    const count = value + 5;
    return count;
  }

  public decrement(value: number): number {
    const count = value - 5;
    return count;
  }
}
```

## Binding in DIOD

At this point we can bind our chosen implementation to its abstraction,
in order to be able to retrieve it only with the abstraction key.

**DIOD** offers the following for registering our dependencies:

```typescript
import { ContainerBuilder } from 'diod';
import { AbstractCounter } from 'counter.abstract';
import { CounterByOne } from 'counter-by-one.service';

const builder = new ContainerBuilder();
builder
  .register(AbstractCounter) // Will be used as key.
  .use(CounterByOne); // Will return a concrete class instance.

const container = builder.build();
```

Then we can get our `CounterByOne` instance by calling:

```typescript
// Returns an instance of CounterByOne.
const counter = container.get(AbstractCounter);
```

If we wanted another implementation of the same aabstract class we could write:

```typescript
// ...

import { CounterByFive } from 'counter-by-five.service';

// ...

builder.register(AbstractCounter).use(CounterByFive);

// ...

// Returns an instance of CounterByFive.
const counter = container.get(AbstractCounter);

// ...
```

The same abstraction would then return a different implementation,
here `CounterByFive`

## VueDiod

VueDiod wraps DIOD bootstrap and methods, and allows components to get instances
_via_ the Vue's `inject` method. Once VueDiod is configured and `use`d by the
application, we can inject the function that will create an instance of our
service. The return type of `inject([MY_KEY])` is a function that returns the
actual instance of the service.

```typescript
const getter = inject(AbstractClass);
const instance = getter();
```

To register globally our dependencies, we can `use` VueDiod as a plugin in
the `main.ts` file, and pass the bindings through the configuration object.

```typescript
import 'reflect-metadata';

import { createApp } from 'vue';
import VueDiod from 'vue-diod';

import { AbstractCounter } from './counter.abstract';
import { CounterByOne } from './counter-by-one.service';

import App from './App.vue';

const app = createApp(App);
app.use(VueDiod, {
  injectables: [
    {
      register: AbstractCounter,
      use: CounterByOne,
    },
  ],
});

app.mount('#app');
```

## Inject in components

Then in each app's component, we can inject our class instance by calling:

```typescript
<script setup lang="ts">
// ...

import { AbstractCounter } from '@/domain/counter.abstract';

// Inject directly.
const CounterKey = AbstractCounter as unknown;
const counter = inject<() => AbstractCounter>(CounterKey as InjectionKey<AbstractCounter>)();

// OR: Use VueDiod helper to get type.
import { useDiod } from 'vue-diod';
const diod = useDiod();

const counter = inject<() => AbstractCounter>(
  diod.injectionKeyForClass(AbstractCounter),

  // Fallback (optional, but it frees us
  // from checking that the result is defined).
  () => {
    increment (value: number) {
      console.warn('Fallback increment');
      return value++;
    },
    decrement (value: number) {
      console.warn('Fallback increment');
      return value--;
    },
  }
)();

// Bind to component's methods.

const increment = counter.increment;
const decrement = counter.decrement;

// Counter value.

const count: Ref<number> = ref(0)

</script>
```

```html
<template>
  <button @click="increment(count)">Increment</button>
  <button @click="decrement(count)">Decrement</button>
</template>
```

And here is the result... Impressive, isn't it? :smile:

<script setup>
import SimpleCounter from '../.vitepress/theme/components/simple-counter.component.vue';
</script>

<div style="width: 100%; display: flex; justify-content: center; margin: 4rem 0;">
  <SimpleCounter />
</div>

:::tip
If we want to configure a dependency in the **DIOD** container without making it
available in Vue components, we can pass `vue: false` to the specific service
in VueDiod configuration.

[See configuration](configuration)
:::
