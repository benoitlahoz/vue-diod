import 'reflect-metadata';
import DefaultTheme from 'vitepress/theme';
import { createPinia } from 'pinia';
import VueDiod from '../../../src';
import {
  // Abstractions.

  AbstractSimpleCounter,
  AbstractCounter,
  AbstractLogger,

  // Implementations.
  SimpleCounter,
  Counter,
  Logger,
} from './generic-modules';

export default {
  ...DefaultTheme,
  enhanceApp(context: any) {
    // Register vitepress's default theme components.

    DefaultTheme.enhanceApp(context);

    /***************************************************************************
     *
     * Use global VueDiod container.
     *
     **************************************************************************/

    const app = context.app;

    app.use(VueDiod, {
      injectables: [
        { register: AbstractSimpleCounter, use: SimpleCounter },
        { register: AbstractCounter, use: Counter },
        { register: AbstractLogger, use: Logger },
      ],
    });

    // For our examples, Pinia must be created after VueDiod
    // has been bootstrapped.
    app.use(createPinia());
  },
  setup() {
    //
  },
};
