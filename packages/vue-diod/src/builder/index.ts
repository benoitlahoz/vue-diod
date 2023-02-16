import type { App, ComponentInternalInstance, InjectionKey } from 'vue';
import type {
  Container,
  Abstract,
  ConfigurableRegistration,
  Newable,
} from 'diod';
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
   * @param { App | (T extends Component<infer P> ? Partial<P> : never) }
   * The application or component to inject the dependencies in.
   * @param { VueDiodConfiguration } config The VueDiod configuration object,
   */
  public bootstrap(
    // See: https://stackoverflow.com/a/74472058

    target: App | ComponentInternalInstance | undefined | null,
    config: VueDiodConfiguration
  ): void {
    if (!target) throw new Error(`'target' must be defined.`);
    /***************************************************************************
     *
     * First pass: Register all abstractions in DIOD
     * and 'use' their given implementations.
     *
     **************************************************************************/

    for (const service of config.injectables) {
      let registered;

      if (service.registerAndUse || service.use || service.useFactory) {
        if (service.registerAndUse) {
          registered = this._builder.registerAndUse(service.registerAndUse);

          if (service.dependencies) {
            // NB: Disables autowire for this service.

            registered = registered.withDependencies(service.dependencies);
          }
        } else if (service.use) {
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
     * Second pass: Configure Vue.js providers.
     *
     **************************************************************************/

    // Global configuration for vue injection.

    const globalVue = config.vue || true;

    if (globalVue) {
      if ((target as App).provide) {
        // 'target' exposes 'provide' method.

        this._provide(target as App, config);
      } else if (
        (target as ComponentInternalInstance).vnode &&
        (target as ComponentInternalInstance).vnode.component
      ) {
        // 'target' doesn't expose 'provide' method
        // but has 'vnode' and 'component'.

        this._provideComponent(
          (target as any).vnode.component as ComponentInternalInstance,
          config
        );
      } else {
        // For SSR.
        // TODO: Check if we are in SSR mode and if not throw an error.
        console.error(
          `'target' is neither an application object nor a valid component.`
        );
      }
    }
  }

  /**
   * 'Provide' the bootstrapped services at app or component level.
   * Method is also responsible of providing tagged services or services
   * that have been referenced by a token.
   *
   * @param target
   * @param config
   * @private
   */
  private _provide(target: any, config: VueDiodConfiguration): void {
    // Keep a cache of already set tags.

    const tags: Array<string> = [];
    const tokens: Array<string | symbol> = [];

    // Inject all services in Vue application via their abstraction class name.

    for (const service of config.injectables) {
      let vue = service.vue || true;

      if (!vue) continue; // Skips Vue.js injection.

      if (service.private) continue; // Don't inject private services.

      // By default provide the abstract class itself as InjectionKey.

      const Key = service.register as unknown;

      target.provide(Key as InjectionKey<Abstract<typeof Key>>, () =>
        this._container!.get(service.register)
      );

      // If token is set, register the injection for token name too.

      let Token;
      if (typeof service.token === 'boolean' && service.token === true) {
        if (!tokens.includes(service.register.name)) {
          // Dependency can be found by the abstract class's name.

          Token = service.register.name;
          target.provide(Token, () => this._container!.get(service.register));

          tokens.push(Token);
        } else {
          console.warn(
            `Token with class name '${service.register.name}' was already registered.`
          );
        }
      } else if (
        typeof service.token === 'string' ||
        typeof service.token === 'symbol'
      ) {
        if (!tokens.includes(service.token)) {
          // Dependency can be found by the given string or symbol.

          Token = service.token;
          target.provide(Token, () => this._container!.get(service.register));

          tokens.push(Token);
        } else {
          console.warn(
            `Token '${String(service.token)}' was already registered.`
          );
        }
      }

      // If tag property is set, provides also the key
      // '[tagPrefix]:${actual tag}' to find tagged services.

      if (service.tag && !tags.includes(service.tag)) {
        const tag = service.tag;

        target.provide(`${config.tagPrefix || DEFAULT_TAG_PREFIX}:${tag}`, () =>
          this._container!.findTaggedServiceIdentifiers<any>(tag).map(
            (identifier) => this._container!.get(identifier)
          )
        );

        // Keep tag in cache to provide it only once.

        tags.push(tag);
      }
    }
  }

  /**
   * Prepares component by adding a custom 'provide' method, then calls the
   * private method '_provide'.
   *
   * @param { any } target
   * The component to inject the dependencies in.
   * @param { VueDiodConfiguration } config The VueDiod configuration object,
   * with the mandatory entry 'injectables'.
   * @private
   */
  private _provideComponent(target: any, config: VueDiodConfiguration): void {
    const component = target as any;

    component.provide = (
      key: string | InjectionKey<() => unknown>,
      value: () => unknown
    ) => {
      component.provides = {
        ...(component.provides || {}),
        [key as any]: value,
      };
    };

    this._provide(component, config);
  }

  /**
   * Checks if a given valass is registered.
   * @param { Abstract<T> | Newable<T> } identifier The identifier of
   * the dependency.
   * @returns { boolean } true if registered, false if not.
   */
  public isRegistered<T>(identifier: Abstract<T> | Newable<T>): boolean {
    return this._builder.isRegistered(identifier);
  }

  /**
   * The native DIOD builder for this instance of VueDiodBuilder.
   * @see https://github.com/artberri/diod/blob/main/docs/README.md
   */
  public get builder(): ContainerBuilder | undefined {
    return this._builder;
  }

  /**
   * The native DIOD container for this instance of VueDiodBuilder.
   * @see https://github.com/artberri/diod/blob/main/docs/README.md
   */
  public get container(): Container | undefined {
    return this._container;
  }
}
