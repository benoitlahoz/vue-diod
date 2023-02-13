import 'reflect-metadata';
import DefaultTheme from 'vitepress/theme';
import VueDiod from '../../../src';
import {
  AbstractSimpleCounter,
  AbstractCounter,
  AbstractLogger,
  SimpleCounter,
  Counter,
  Logger,
} from './modules';

export default {
  ...DefaultTheme,
  enhanceApp(context: any) {
    DefaultTheme.enhanceApp(context);
    const app = context.app;
    /***************************************************************************
     *
     * Use global VueDiod container.
     *
     **************************************************************************/

    // Create an instance we want to force as dependency.

    app.use(VueDiod, {
      injectables: [
        {
          register: AbstractSimpleCounter,
          use: SimpleCounter,
        },
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
  },
  setup() {
    //
  },
};
