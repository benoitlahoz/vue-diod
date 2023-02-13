```typescript
// main.ts

// Import once in the application: Sooner the better.
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
      // Registers our abstract class as 'key' for...

      register: AbstractCounter,

      // ... our implementation.

      use: CounterByOne,
    },
  ],
});

app.mount('#app');
```
