import 'reflect-metadata';
import { createApp } from 'vue';
import './style.css';
import App from './App.vue';

import VueDiod from 'vue-diod';
import { AbstractCounter, AbstractLogger, Counter, Logger } from './modules';

const app = createApp(App);
app.use(VueDiod, {
  injectables: [
    {
      register: AbstractLogger,
      use: Logger,
    },
    {
      register: AbstractCounter,
      use: Counter,
    },
  ],
});

app.mount('#app');
