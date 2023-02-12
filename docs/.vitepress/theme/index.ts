import type { App } from 'vue';
import DefaultTheme from 'vitepress/theme';
import VueDiod from '../../../packages/vue-diod';
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

    const logger = new Logger();

    app.use(VueDiod, {
      injectables: [
        {
          register: AbstractSimpleCounter,
          use: SimpleCounter,
        },
        {
          register: AbstractCounter,
          use: Counter,
          tag: 'my.group',
          token: 'counter',

          // Here we manually provide logger dependency to counter.

          dependencies: [AbstractLogger],
        },
        {
          register: AbstractLogger,

          // Here we use our created instance, instead of passing the
          // concrete class, like in Counter above.

          useInstance: logger,
          tag: 'my.group',
        },
      ],
    });
  },
  setup() {
    //
  },
};
