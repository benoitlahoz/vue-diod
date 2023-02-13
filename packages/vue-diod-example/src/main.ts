import 'reflect-metadata';
import { createApp } from 'vue';
import App from './App.vue';

import VueDiod from 'vue-diod';
import { AbstractCounter, AbstractLogger, Counter, Logger } from './modules';

import './style.css';

// Create an instance we want to force as dependency.
const logger = new Logger();

const app = createApp(App);
app.use(VueDiod, {
  injectables: [
    {
      register: AbstractCounter,
      use: Counter,
      // tag: 'my.group',
      // token: 'counter',

      // Here we provide logger dependency to counter.

      // dependencies: [AbstractLogger],
    },
    {
      register: AbstractLogger,

      // Here we use our created instance, instead of passing the
      // concrete class, like in Counter above.
      use: Logger,
      // useInstance: logger,
      // tag: 'my.group',
    },
  ],
});

app.mount('#app');
