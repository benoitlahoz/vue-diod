import type { Newable, Abstract, Instance, Factory } from 'diod';

/**
 * The plugin options.
 */
export interface VueDiodConfiguration {
  autowire?: boolean;
  injectables: Array<VueDiodInjectable>;
  tagPrefix?: string;
  vue?: boolean;
}

/**
 * Scope of the instance returned by DIOD container.
 * @see https://github.com/artberri/diod/blob/main/docs/scope.md
 */
export enum VueDiodScope {
  Request = 'vue-diod:request',
  Singleton = 'vue-diod:singleton',
  Transient = 'vue-diod:transient',
}

/**
 * The definition of a couple abstraction / service to be
 * injected through DIOD.
 */
export interface VueDiodInjectable {
  /**
   * Disable autowiring by passing dependencies.
   * @see https://github.com/artberri/diod/blob/main/docs/disable-autowire.md
   */
  dependencies?: Array<Abstract<unknown>>;
  /**
   * Mark the dependency as private: It will not be callable by the container,
   * thus not injected in Vue via 'provide' method, but will serve only as
   * dependency for other injected classes.
   */
  private?: boolean;
  /**
   * The abstraction or concrete implementation
   * to pass to Diod to register a service.
   */
  register: Newable<unknown> | Abstract<unknown>;
  /**
   * Scope of the dependency.
   */
  scope?: VueDiodScope;
  /**
   * Tag for the dependency.
   * @see https://github.com/artberri/diod/blob/main/docs/tagging.md
   */
  tag?: string;
  /**
   * Use a token to find dependency.
   * In case token property is a boolean, token will be set to the
   * abstract class name.
   */
  token?: boolean | string | symbol;
  /**
   * The service implementation to use.
   */
  use?: Newable<unknown>;
  /**
   * The instance to use as dependency.
   * @see https://github.com/artberri/diod/blob/main/docs/instances.md
   */
  useInstance?: Instance<unknown>;
  /**
   * The factory function to build instance.
   * @see https://github.com/artberri/diod/blob/main/docs/factories.md
   */
  useFactory?: Factory<unknown>;
  /**
   * Inject dependencies in Vue with 'provide'.
   */
  vue?: boolean;
}
