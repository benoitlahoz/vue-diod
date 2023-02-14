import type { InjectionKey } from 'vue';
import { inject } from 'vue';

import type { Container, Abstract, Newable } from 'diod';
import { VueDiodHelper } from './vue-diod-private-helper';
import { VueDiodBuilder } from '../builder';

export const useVueDiod = () => {
  /**
   * Injects a new instance associated with passed abstract class (key),
   * by calling the function that was injected in Vue.js. Under the hood,
   * the injected function is calling 'get' on the container the abstract class
   * was registered in.
   *
   * @param { Abstract<T> || Newable<T> } identifier The identifier our service
   * is bound to.
   * @param { () => T | undefined } fallback An optional fallback to return
   * if the key wasn't found.
   *
   * @returns { T | undefined } An instance of the bound service or
   * undefined if it was not added at bootstrap.
   */
  const injectServiceInstance = <T>(
    identifier: Abstract<T> | Newable<T>,
    fallback?: () => T
  ): T | undefined => {
    // Gets the function for the abstract class.

    const injectedFn = injectServiceGetter(identifier, fallback);

    // Calls the function and return the result.

    return <T | undefined>injectedFn();
  };

  /**
   * Injects a new instance getter associated with passed abstract class (key),
   * by returning the function that was injected in Vue.js. Under the hood,
   * the injected function will call 'get' on the container the abstract class
   * was registered in.
   *
   * @param { Abstract<T> || Newable<T> } identifier The identifier our service
   * is bound to.
   * @param { () => T | undefined } fallback An optional fallback to return
   * if the key wasn't found.
   *
   * @returns { () => T | () => undefined } A function to get an instance of
   * the bound service or undefined if it was not added at bootstrap and no
   * fallback was provided.
   */
  const injectServiceGetter = <T>(
    identifier: Abstract<T> | Newable<T>,
    fallback?: () => T
  ): (() => T) | (() => undefined) => {
    // Gets the function for the abstract class.

    const injectedFn = inject<(() => T) | (() => undefined)>(
      injectionKeyForClass(identifier),
      fallback ? fallback : () => undefined
    );

    // Returns the function to get an instance of the service.

    return injectedFn;
  };

  /**
   * Returns the Vue.js injection key with the given registered class.
   * @param { unknown } identifier The already registered class as 'unknown'.
   * @returns { InjectionKey<T> } The typesafe InjectionKey for the given class.
   */
  const injectionKeyForClass = <T>(identifier: unknown): InjectionKey<T> => {
    return identifier as InjectionKey<T>;
  };

  /**
   * Checks if a class is registered.
   * @param { Abstract<T> | Newable<T> } identifier The identifier our concrete
   * class is bound to.
   * @param { VueDiodBuilder | undefined } builder The builder we wan't to check
   * registration on.
   * @returns { boolean } true if the class is already registered, false if not.
   */
  const isRegistered = <T>(
    identifier: Abstract<T> | Newable<T>,
    builder?: VueDiodBuilder
  ): boolean => {
    if (builder && builder instanceof VueDiodBuilder) {
      return builder.isRegistered(identifier);
    }

    return VueDiodHelper.defaultBuilder.isRegistered(identifier);
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
    injectServiceInstance,
    injectServiceGetter,
    isRegistered,
    getDefaultContainer,
  };
};
