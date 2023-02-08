import type { App, InjectionKey } from 'vue';
import type { Container, Abstract, Newable } from 'diod';
import { VueDiodInjectable, VueDiodScope } from '../types';
import { ContainerBuilder } from 'diod';
import { IsDefined } from 'class-validator';

/**
 * The VueDiod builder for injectables.
 */
export class VueDiodBuilder {
  /**
   * The Diod builder.
   */
  @IsDefined()
  private static readonly _builder = new ContainerBuilder();

  /**
   * The build container.
   */
  @IsDefined()
  private static _container: Container;

  /**
   * Registers and use the couples abstraction / implementation to be injected.
   *
   * @param { Array<VueDiodInjectable> } services An array of objects that
   * contain both the abstraction to register and the concrete class associated.
   */
  public static bootstrap(
    app: App,
    services: Array<VueDiodInjectable>
  ): VueDiodBuilder {
    // Register all abstractions and use their given implementations.

    for (const service of services) {
      const registration = VueDiodBuilder._builder
        .register(service.register)
        .use(service.use);

      switch (service.scope) {
        case VueDiodScope.Request: {
          registration.asInstancePerRequest();
          break;
        }
        case VueDiodScope.Singleton: {
          registration.asSingleton();
          break;
        }
        case VueDiodScope.Transient:
        default: {
          break;
        }
      }
    }

    // Build the container and seal the result.

    VueDiodBuilder._container = VueDiodBuilder._builder.build();
    Object.seal(VueDiodBuilder._container);

    // Inject all services in Vue application via their abstraction class name.

    for (const service of services) {
      // TODO: When 'tagged' pass only name.
      /*
      app.provide(
        // Get the name of the class (concrete or abstract)
        // passed as identifier.

        service.register.name,
        VueDiodBuilder._container.get(service.register)
      );
      */

      // By default provide the class as InjectionKey.
      const Key = service.register as unknown;
      app.provide(
        Key as InjectionKey<Abstract<typeof Key>>,
        VueDiodBuilder._container.get(service.register)
      );
    }

    return VueDiodBuilder;
  }

  public static get(identifier: Abstract<unknown>): any {
    return VueDiodBuilder._container.get(identifier);
  }
}
