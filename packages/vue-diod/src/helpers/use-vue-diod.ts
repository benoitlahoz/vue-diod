import type { InjectionKey } from 'vue';
import type { Container, Abstract, Newable } from 'diod';
import type { VueDiodInjectable } from '../types';

import { inject, provide, getCurrentInstance } from 'vue';
import { VueDiodHelper } from './vue-diod-private-helper';
import { VueDiodBuilder } from '../builder';

export const useVueDiod = () => {
  /**
   * Injects a new instance associated with passed abstract class (key),
   * by calling the function that was injected in Vue.js. Under the hood,
   * the injected function is calling get on the container the abstract class
   * was registered in.
   *
   * @param { Abstract<T> || Newable<T> } key The key our service is bound to.
   * @param { Function | undefined } fallback An optional fallback to return
   * if the key wasn't found.
   *
   * @returns { T | undefined } An instance of the bound service or
   * undefined if it was not added at bootstrap.
   */
  const injectService = <T>(
    key: Abstract<T> | Newable<T>,
    fallback?: () => T
  ): T | undefined => {
    // Gets the function for the abstract class.

    const injectedFn = inject<() => T | undefined>(
      injectionKeyForClass(key),
      fallback ? fallback : () => undefined
    );

    return <T | undefined>injectedFn();
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
