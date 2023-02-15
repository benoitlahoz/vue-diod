---
title: Abstractions
---

# {{ $frontmatter.title }}

We know that we will have to save data in the `localStorage` and retrieve data
from it, and that we need to be able to save that data to a local file.

But later, we could be asked to store data to a database and `post` it to an
API, or to `commit` our changes to a store like [Vuex](https://vuex.vuejs.org/)
or [Pinia](https://pinia.vuejs.org/). It is better to create a first abstract
class to define generic data storage service.

::: info NOTA BENE
We could also create a generic 'save' abstraction, as it could reused later for
e.g. `node` vs `browser` file saving.
:::

## Generic Storage

To handle data in our store, we need to be able to `set` a key / value pair,
to `get` a value for a given key, and to `remove` the key / value pair.

```typescript
export abstract class StorageUseCase {
  public abstract set(key: string | symbol, value: any): void;
  public abstract get(key: string | symbol): any;
  public abstract remove(key: string | symbol): void;
}
```

## Local Storage

In our local storage abstraction we introduce both a `save` (**US6**)
functionality, the `prefix` to filter (**US1**) the data specific to our
application / page and a typesafe (**US4**) `content` object we encapsulate in
a Vue.js `ref` for reactivity (**US5**).

```typescript
export abstract class LocalStorageUseCase extends StorageUseCase {
  public abstract prefix: string;
  public abstract content: Ref<Record<string, string | number>>;

  public abstract set(key: string | symbol, value: any): void;
  public abstract get(key: string | symbol): Record<string, any> | undefined;
  public abstract remove(key: string | symbol): void;

  public abstract save(fileSaver?: FileSaveUseCase): void;
}
```

::: info NOTA BENE
The `save` method uses the
[Visitor Pattern](https://refactoring.guru/design-patterns/visitor).
In the implementation, we will have to check if `fileSaver` is provided and,
if not... do nothing. This will allow us to call `save` from components,
event if dependency was not injected.
:::

## File Save

File Save use case abstraction is quite simple. It only exposes `save` method
as this is its only use.

```typescript
export abstract class FileSaveUseCase {
  public abstract save(content: Record<string, any>): void;
}
```
