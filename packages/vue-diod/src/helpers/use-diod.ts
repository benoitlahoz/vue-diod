import type { InjectionKey } from 'vue';
import type { Container } from 'diod';
import { inject } from 'vue';
import { VueDiodHelper } from './vue-diod-helper';

export const useDiod = () => {
  /**
   * Injects a new instance associated with passed abstract class (key),
   * by calling 'get' on the passed container or, if undefined, on the default
   * VueDiod plugin's global container.
   *
   * @param { InjectionKey<T> } key The key our service is
   * bound to.
   * @param { Container | undefined } container The container we want to ask
   * an instance from. If undefoned, will ask to the default VueDiod plugin
   * global container.
   *
   * @returns { T | undefined } An instance of the bound service or
   * undefined if it was not added at bootstrap.
   */
  const injectService = <T>(
    key: InjectionKey<T>,
    container?: Container
  ): T | undefined => {
    const ctr = container ?? getDefaultContainer();

    if (ctr) {
      const injectedFn = inject<() => T>(injectionKeyForClass(key));
      if (injectedFn) {
        return <T>injectedFn() || undefined;
      }
    }
    return;
  };

  /**
   * Returns the Vue.js injection key with the given registered class.
   * @param { unknown } registered The already registered class.
   * @returns The typesafe InjectionKey for the given class.
   */
  const injectionKeyForClass = <T>(registered: unknown): InjectionKey<T> => {
    return registered as InjectionKey<T>;
  };

  /**
   * Get the default VueDiod container (registered through app.use(VueDiod))
   * @returns { Container | undefined } The default container built when
   * bootstraping the Vue.js application.
   */
  const getDefaultContainer = (): Container | undefined => {
    return VueDiodHelper.defaultBuilder.container;
  };

  return {
    injectionKeyForClass,
    injectService,
    getDefaultContainer,
  };
};
