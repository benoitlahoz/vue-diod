---
title: Use with Pinia
---

# {{ $frontmatter.title }}

[Pinia](https://pinia.vuejs.org/) is a very powerful store for Vue.js.
And it is simple to use!

Here, we will reuse our `AbstractCounter` which is already registered for our
whole app. It is stateless, that means we could have registered it with the
[`VueDiodScope.Singleton`](../../getting-started/configuration.md#vuediodscope)
scope as we use it as a
[Command](https://refactoring.guru/design-patterns/command) we provide with
a value that is returned modified.

## Injection in Pinia

Pinia (as Vuex) doesn't allow us to use Vue's `inject` method except in its
`getters`, which are the store's version of the component's `computed`
properties.

So, we have to find a way to inject our services out of the components' scope.

[`useVueDiod`](../../composable-and-builder/use-vue-diod.md) composable offers
a method to get the service directly from given DIOD container:
`injectFromContainer`.

This method accepts the two usual parameters `identifier` (key) and `fallback`,
plus a third optional one for the container. If the container parameter is
undefined, the function will call for a global container (the one we have set at
the root of our application by calling `app.use(VueDiod, { injectables })`).

::: warning ROADMAP
In order to not have to pass container as prop from parent to children
components, we're working on providing the same functionality as Vue does,
namely: the capability to traverse a component's tree upward to get the first
container that exposes a given 'key'. But, with Pinia usage we can stay with
this 'root' container, as the store is itself a global object.

**For the time being, the only way to access component level containers is to
`provide / inject` them, or to pass them as properties.**
:::

## Boostrapping

On app creation:

```typescript
import 'reflect-metadata';
import { createPinia } from 'pinia';
import VueDiod from 'vue-diod';
import { AbstractCounter, Counter } from './modules';

// ...

app.use(VueDiod, {
  injectables: [{ register: AbstractCounter, use: Counter }],
});

// For our examples, that use the Vue DIOD composable at global scope,
// Pinia must be created after VueDiod has already been bootstrapped.

app.use(createPinia());
```

## Pinia Store

Instead of defining our store's functions directly in its actions, we'll
pass the instances injected by calling the abstract classes.

```typescript
import { defineStore } from 'pinia';
import { useVueDiod } from 'vue-diod';
import { AbstractCounter } from './modules';

const { injectFromContainer } = useVueDiod();

export const useCounterStore = defineStore({
  id: 'counter',
  state: () => ({
    count: 0,
  }),
  getters: {
    doubleCount: (state) => () => {
      return state.count * 2;
    },
  },
  actions: {
    increment() {
      // Inject the service directly from the VueDiod plugin container.

      const counter = injectFromContainer(AbstractCounter);
      this.count = counter!.increment(this.count);
    },
    decrement() {
      // If we are sure the service exists, we can also pass any as return type,
      // for Typescript not to complain.

      const counter = injectFromContainer<AbstractCOunter | any>(
        AbstractCounter
      );

      this.count = counter.decrement(this.count); // Note the absence of the '!'
    },
  },
});
```

## Component

Then we can use it as usual with Pinia in our components.

```typescript
import { storeToRefs } from 'pinia';
import { useCounterStore } from '../../stores/counter.store';

const store = useCounterStore();

const { count } = storeToRefs(useCounterStore());
const { doubleCount } = useCounterStore();

// The store actions.

const increment = store.increment;
const decrement = store.decrement;
```

::: details \<template\>

```html
<template>
  <div>
    <div>
      <button @click="decrement()">Decrement</button>
      <div>{{ count }}</div>
      <button @click="increment()">Increment</button>
    </div>
    <div>
      <h3>Pinia Getters</h3>
      <table>
        <thead>
          <tr>
            <th>Getter</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>doubleCount</td>
            <td>{{ doubleCount() }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
```

:::

## Result

<script setup>
import PiniaComponent from '../../.vitepress/theme/examples-components/pinia/pinia.component.vue';
</script>

<div style="width: 100%; display: flex; justify-content: center; margin: 4rem 0;">
  <PiniaComponent />
</div>
