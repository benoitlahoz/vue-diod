import 'reflect-metadata';

import type { App } from 'vue';
import type { VueDiodConfiguration, VueDiodInjectable } from './types';
import { VueDiodScope } from './types';
import { VueDiodBuilder } from './builder';
import { VueDiodHelper } from './helpers/vue-diod-private-helper';

const plugin = {
  install(app: App, config: VueDiodConfiguration) {
    // Bootstraps [Vue]Diod container with given instances.

    buildContainer(config, app);

    // TODO: Components and directives (mixins?).
  },
};

const buildContainer = (config: VueDiodConfiguration, app: App) => {
  // Creates a VuozBuilder instance.

  const builder = new VueDiodBuilder();

  // Registers and provide injectables at the app level.

  builder.bootstrap(config, app);

  // Keep the builder in cache to allow getting it from composable.

  VueDiodHelper.defaultBuilder = builder;
};

// Default, in order to be able to use app.use.
export default plugin;

// Individual exports.
export { VueDiodBuilder };

// Composables.
export * from './helpers';

// Enum.

export { VueDiodScope };

// Types.
export type { VueDiodConfiguration, VueDiodInjectable };
