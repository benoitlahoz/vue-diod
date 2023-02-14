---
title: useVueDiod
---

# {{ $frontmatter.title }}

Vue DIOD comes with a composable that provide a few function to help with
injection at component level.

## injectionKeyForClass

For Typescript not to complain, injecting a dependency in Vue component
by its abstraction class name suppose to do:

```typescript
import type { InjectionKey } from 'vue';
import { AbstractCounter } from './counter.abstract';

// Cast the abstract class to unknown.

const CounterKey = AbstractCounter as unknown;

// Inject the instance getter with this key cast to 'InjectionKey<AbstractCounter>'

const counterGetter = inject<() => AbstractCounter>(
  CounterKey as InjectionKey<AbstractCounter>

  // ... optional fallback (function that returns an object)
);

let counterInstance;

// No fallback was provided, check if not 'undefined'.
if (counterGetter) {
  counterInstance = counterGetter();
}
```

Vue DIOD provides a helper to get the injection key without the verbosity
of type casting the abstract class, then the 'unknown' key.

```typescript
// Other imports...

import { useVueDiod } from 'vue-diod';

const { injectionKeyForClass } = useVueDiod();

const CounterKey = injectionKeyForClass(AbstractCounter);
const counterGetter = inject(CounterKey /*, optional fallback (function) */);
```

### Types

```typescript
injectionKeyForClass: <T>(registered: unknown) => InjectionKey<T>;
```

## injectServiceGetter

As seen in the previous section and to preserve [DIOD scopes](https://github.com/artberri/diod/blob/main/docs/scope.md#scope-of-the-dependencies),
calling `inject` on a dependency registered via Vue DIOD doesn't actually return
the instance itself, but a function to get it,
_via_ [DIOD's container `get` function](https://github.com/artberri/diod/blob/main/docs/classes.md#injecting-classes).

`useVueDiod` provides a helper to get this function directly.

```typescript
// Other imports...

import { useVueDiod } from 'vue-diod';

const { injectServiceGetter } = useVueDiod();

const instanceGetter = injectServiceGetter(AbstractCounter);

// 'instanceGetter' is a function that returns an instance
// of our concrete class or 'undefined'.

const actualInstance: Counter | undefined = instanceGetter();
```

### Types

```typescript
injectServiceGetter: <T>(
  key: Abstract<T> | Newable<T>,
  fallback?: (() => T) | undefined
) => (() => T) | (() => undefined);
```

## injectServiceInstance

If we are sure the injected class exists, we can call `injectServiceInstance`
that will preserve us from calling the getter manually.

```typescript
// Other imports...

import { useVueDiod } from 'vue-diod';

const { injectServiceInstance } = useVueDiod();

// Our 'count' value.

const count = ref(0);

// Get the instance.

const instance = inject(AbstractCounter /* , optional fallback (object) **/);

// We have the instance, we can now bind its methods
// to our component's ones like this.
// NB: template's button will have to pass 'count' to the function.

const increment = instance.increment.bind(instance);
const decrement = instance.decrement.bind(instance);

// Or like this.
const increment = () => {
  count.value = instance.increment(count.value);
};

const decrement = () => {
  count.value = instance.decrement(count.value);
};
```

### Types

```typescript
injectServiceInstance: <T>(
  key: Abstract<T> | Newable<T>,
  fallback?: (() => T) | undefined
) => T | undefined;
```

## isRegistered

Before injecting a dependency, we can check if it has actually been registered.
This prevents from further checks and is another way to provide a fallback
to our component.

### On global (plugin) builder.

```typescript
const { isRegistered } = useVueDiod();

let counter;

if (isRegistered(AbstractCounter)) {
  counter = inject(AbstractCounter);
}

// ...
```

### On local (component) builder.

If we created a builder at component level (i.e. to provide dependencies to
component's children only), we'll have to pass the builder to the function.

For the time being, the only ways to have access to a parent's builder are:

- Passing it through `props`, which has the drawback to couple our children
  components to their parent.
- Providing it via Vue's `provide` with an unique key.

```typescript
const { isRegistered } = useVueDiod();

const builder = /* TODO: get a parent builder */

let counter;

if (isRegistered(AbstractCounter, builder)) {
  counter = inject(AbstractCounter);
}

// ...
```

::: danger TODO
Register builders created at component level and find a way to get them by
caching in a `Map` and recursively checking component's parents and registered
classes _via_ the components' `vnode.component.provides` property.
:::

### Types

```typescript
isRegistered: <T>(identifier: Abstract<T> | Newable<T>) => boolean;
```

## getDefaultContainer

If we have the use to manage with native DIOD's container, we can get it with
`useVueDiod` method `getDefaultContainer`.

```typescript
const { getDefaultContainer } = useVueDiod();

const container = getDefaultContainer();
const instance = container.get(AbstractCounter);
const taggedServices = container.findTaggedServiceIdentifiers('tag');
```

### Types

```typescript
getDefaultContainer: () => Container | undefined;
```
