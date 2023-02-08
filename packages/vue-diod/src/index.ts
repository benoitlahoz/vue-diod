import 'reflect-metadata';

import type { App } from 'vue';
import type { VueDiodInjectable } from './types';
import { VueDiodBuilder } from './builder';

const plugin = {
  install(
    app: App,
    { injectables }: { injectables: Array<VueDiodInjectable> }
  ) {
    // Registers and provide injectbales at the app level.

    VueDiodBuilder.bootstrap(app, injectables);

    // TODO: Components and all
  },
};

export default plugin;
