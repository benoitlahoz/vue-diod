import 'reflect-metadata';

import type { App } from 'vue';
import type {
  VueDiodConfiguration,
  VueDiodInjectable,
  VueDiodScope,
} from './types';
import { VueDiodBuilder } from './builder';
import { VueDiodHelper } from './helpers/vue-diod-helper';

const plugin = {
  install(app: App, config: VueDiodConfiguration) {
    // Bootstraps [Vue]Diod container with given instances.

    buildContainer(app, config);

    // TODO: Components and directives
  },
};

const buildContainer = (app: App, config: VueDiodConfiguration) => {
  // Creates a VuozBuilder instance.

  const builder = new VueDiodBuilder();

  // Registers and provide injectables at the app level.

  builder.bootstrap(app, config);

  // Keep the builder in cache to allow getting it from composable.

  VueDiodHelper.defaultBuilder = builder;
};

// Default, in order to be able to use app.use.
export default plugin;

// Individual exports.
export { VueDiodBuilder };

// Composables.
export * from './helpers';

// Types.
export type { VueDiodConfiguration, VueDiodInjectable, VueDiodScope };
