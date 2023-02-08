import type { Newable, Abstract } from 'diod';

/**
 * Scope of the instance returned by DIOD container.
 * @see https://github.com/artberri/diod/blob/main/docs/scope.md
 */
export enum VueDiodScope {
  Transient = 'transient',
  Request = 'request',
  Singleton = 'singleton',
}

/**
 * The definition of a couple abstraction / service to be
 * injected through DIOD.
 */
export interface VueDiodInjectable {
  /**
   * The abstraction or concrete implementation
   * to pass to Diod to register a service.
   */
  register: Newable<unknown> | Abstract<unknown>;
  /**
   * The service implementation to use.
   */
  use: Newable<any>;
  /**
   * Socpe of the dependency.
   */
  scope?: VueDiodScope;
}
