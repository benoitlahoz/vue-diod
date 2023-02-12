---
title: Simple Counter example
---

# {{ $frontmatter.title }}

VueDiod comes with a plugin you can `use` as any other plugin in Vue,
that will create a global DI container, which classes will be available in the
whole application by calling Vue's `inject`.

## Create application

```typescript
// main.ts

// Import once in the application: Sooner the better.
import 'reflect-metadata';

import { createApp } from 'vue';
import VueDiod from 'vue-diod';

import { AbstractCounter } from './counter.abstract';
import { Counter } from './counter.service';

import App from './App.vue';

const app = createApp(App);
app.use(VueDiod, {
  injectables: [
    {
      // Registers your abstract class as 'key' for...

      register: AbstractCounter,

      // ... your implementation.

      use: Counter,
    },
  ],
});

app.mount('#app');
```
