import type { App, InjectionKey } from 'vue';
import type { Container, Abstract, ConfigurableRegistration } from 'diod';
import { VueDiodConfiguration, VueDiodScope } from '../types';
import { ContainerBuilder } from 'diod';

const DEFAULT_TAG_PREFIX = 'tag';
/**
 * The VueDiod builder for injectables.
 */
export class VueDiodBuilder {
  /**
   * The Diod builder.
   */
  private readonly _builder = new ContainerBuilder();

  /**
   * The built container.
   */
  private _container?: Container;

  /**
   * Registers and use the couples abstraction / implementation to be injected.
   *
   * @param { Array<VueDiodInjectable> } services An array of objects that
   * contain both the abstraction to register and the concrete class associated.
   */
  public bootstrap(app: App, config: VueDiodConfiguration): void {
    /***************************************************************************
     *
     * First pass: Register all abstractions in DIOD
     * and 'use' their given implementations.
     *
     **************************************************************************/

    for (const service of config.injectables) {
      let registered: ConfigurableRegistration | null = null;

      if (service.use || service.useFactory) {
        let registered;
        if (service.use) {
          registered = this._builder
            .register(service.register)
            .use(service.use);

          if (service.dependencies) {
            // Disables autowire in DIOD.

            registered = registered.withDependencies(service.dependencies);
          }
        } else {
          registered = this._builder
            .register(service.register)
            .useFactory(service.useFactory!);
        }

        switch (service.scope) {
          case VueDiodScope.Request: {
            /**
             * Registers the given service to return
             * a single instance per request.
             * @see https://github.com/artberri/diod/blob/main/docs/scope.md
             */

            registered.asInstancePerRequest();
            break;
          }
          case VueDiodScope.Singleton: {
            /**
             * Registers the given service as singleton.
             */

            registered.asSingleton();
            break;
          }
          case VueDiodScope.Transient:
          /**
           * Registers the given service to return a new instance.
           */
          default: {
            break;
          }
        }
      } else if (service.useInstance) {
        registered = this._builder
          .register(service.register)
          .useInstance(service.useInstance);
      } else {
        throw new Error(
          `Service registered as '${service.register.name}' ` +
            `must provide an implementation via 'use', ` +
            `'useInstance' or 'useFactory' properties.`
        );
      }

      if (registered && service.private) {
        registered = registered.private();
      }

      if (registered && service.tag) {
        registered.addTag(service.tag);
      }
    }

    // Get builder options.

    const options =
      typeof config.autowire !== 'undefined'
        ? { autowire: config.autowire }
        : undefined;

    // Build the container and seal the result.

    this._container = this._builder.build(options);
    Object.seal(this._container);

    /***************************************************************************
     *
     * Second pass: Configure Vue.js application providers.
     *
     **************************************************************************/

    // Keep a cache of already set tags.

    const tags: Array<string> = [];

    // Global configuration for vue injection.

    const globalVue = config.vue || true;

    if (globalVue) {
      // Inject all services in Vue application via their abstraction class name.

      for (const service of config.injectables) {
        let vue = service.vue || true;

        if (!vue) continue; // Skips Vue.js injection.

        if (service.private) continue; // Don't inject private services.

        // By default provide the abstract class itself as InjectionKey.

        const Key = service.register as unknown;

        app.provide(Key as InjectionKey<Abstract<typeof Key>>, () =>
          this._container!.get(service.register)
        );

        // If token is set, register the injection for token name too.

        let Token;
        if (typeof service.token === 'boolean') {
          // Dependency can be found by the abstract class's name.

          Token = service.register.name;
          app.provide(Token, () => this._container!.get(service.register));
        } else if (
          // Dependency can be found by the given string or symbol.

          typeof service.token === 'string' ||
          typeof service.token === 'symbol'
        ) {
          Token = service.token;
          app.provide(Token, () => this._container!.get(service.register));
        }

        // If tag property is set, provides also the key
        // '[tagPrefix]:${actual tag}' to find tagged services.

        if (service.tag && !tags.includes(service.tag)) {
          const tag = service.tag;

          app.provide(`${config.tagPrefix || DEFAULT_TAG_PREFIX}:${tag}`, () =>
            this._container!.findTaggedServiceIdentifiers<any>(tag).map(
              (identifier) => this._container!.get(identifier)
            )
          );

          // Keep tag in cache to provide it only once.

          tags.push(tag);
        }
      }
    }
  }

  /**
   * The native DIOD container for this instance.
   * @see https://github.com/artberri/diod/blob/main/docs/README.md
   */
  public get container(): Container | undefined {
    return this._container;
  }
}
