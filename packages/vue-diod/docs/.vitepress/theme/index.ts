import 'reflect-metadata';
import DefaultTheme from 'vitepress/theme';
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
} from './modules';

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
  },
  setup() {
    //
  },
};
