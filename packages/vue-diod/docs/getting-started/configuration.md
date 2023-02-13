---
title: Configuration
---

# {{ $frontmatter.title }}

## Plugin

When we want to use Vue DIOD globally with Vue's `use`, we have to pass
it a configuration object with the following properties.

| Property        |            Type            | Usage                                              | Required |     Default |
| --------------- | :------------------------: | :------------------------------------------------- | :------: | ----------: |
| **injectables** | Array\<VueDiodInjectable\> | [See below](configuration#injectables)             |   true   | `undefined` |
| **autowire**    |          boolean           | Toggle _autowire_                                  |  false   |      `true` |
| **tagPrefix**   |           string           | The prefix used to get tagged dependencies         |  false   |     `'tag'` |
| **vue**         |          boolean           | Inject classes in Vue.js via the `provide` method. |  false   |      `true` |

::: info DIOD
The `vue` plugin option is provided as a helper. In the case we pass it `false` we could simply use **DIOD**.
:::

## Injectables

The `injectables` property is an `Array` of `VueDiodInjectable` objects.

#### dependencies <badge type="info" text="optional" />

| Type                         | Usage                                                     |   Default   |
| ---------------------------- | :-------------------------------------------------------- | :---------: |
| Array\<Abstract\<unknown\>\> | Manually set dependencies for service (disables autowire) | `undefined` |

#### private <badge type="info" text="optional" />

| Type    | Usage                                                                             |   Default   |
| ------- | :-------------------------------------------------------------------------------- | :---------: |
| boolean | Set the service as private, so user **can't** get it directly from the container. | `undefined` |

#### register <badge type="danger" text="required" />

| Type                                      | Usage                                                      |   Default   |
| ----------------------------------------- | :--------------------------------------------------------- | :---------: |
| Newable\<unknown\> \| Abstract\<unknown\> | Register the abstract / concrete class as a dependency key | `undefined` |

#### scope <badge type="info" text="optional" />

| Type          | Usage                                                                 | Default                  |
| ------------- | :-------------------------------------------------------------------- | ------------------------ |
| VuozDiodScope | Set the scope for the dependency ([See below](configuration#scope-1)) | `VueDiodScope.Transient` |

#### tag <badge type="info" text="optional" />

| Type   | Usage                                                                                                                                                                                                                        | Default     |
| ------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| string | Tag the service, it can then be found via its tag with other services tagged with the same string. In components, tagged services can be injected with the [`tagPrefix`](configuration#plugin) (e.g. `inject('tag:myTag')`). | `undefined` |

#### token <badge type="info" text="optional" />

| Type                        | Usage                                                                                                                                       | Default     |
| --------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------ | ----------- |
| boolean \| string \| symbol | A token to find dependency in Vue's `inject`. If set to `true` the token will be set to the registered class name (e.g. `'AbstractClass'`). | `undefined` |

#### use <badge type="warning" text="one of" />

| Type               | Usage                                                |   Default   |
| ------------------ | :--------------------------------------------------- | :---------: |
| Newable\<unknown\> | Use the concrete service class for registered class. | `undefined` |

#### useInstance <badge type="warning" text="one of" />

| Type                | Usage                               |   Default   |
| ------------------- | :---------------------------------- | :---------: |
| Instance\<unknown\> | Use an already instantiated object. | `undefined` |

#### useFactory <badge type="warning" text="one of" />

| Type               | Usage                               |   Default   |
| ------------------ | :---------------------------------- | :---------: |
| Factory\<unknown\> | Use a factory to create the object. | `undefined` |

#### vue <badge type="info" text="optional" />

| Type    | Usage                                          | Default |
| ------- | :--------------------------------------------- | :-----: |
| boolean | Inject the dependencies with Vue.js `provide`. | `true`  |

::: warning ONE OF
`use`, `useInstance`and `useFactory`are mutually exclusive.
Their presence is checked in this order:

- `use`
- `useFactory`
- `useInstance`

:::

## Scope

From **DIOD** documentation:

> Instance scope determines how an instance is shared between requests for the same service. When a request is made for a service, DIOD can return a new instance (transient) which is the default behaviour, a single instance (singleton) or a single instance within the same request (request).

> This applies to instances returned from an explicit container.get(/\* \*/) call as well as instances created internally by the container to satisfy the dependencies of another service.

| Property                                           |         Value          | Returns                                    |
| -------------------------------------------------- | :--------------------: | :----------------------------------------- |
| **Request**                                        |  `'vue-diod:request'`  | A single instance within the same request. |
| **Singleton**                                      | `'vue-diod:singleton'` | A single instance.                         |
| **Transient** <badge type="info" text="default" /> | `'vue-diod:transient'` | A new instance.                            |

## Types

```typescript
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
```
