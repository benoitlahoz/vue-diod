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

### On local (component / composable) builder.

If we created a builder at component level (i.e. to provide dependencies to
component's children only), we'll have to pass the builder to the function.

For the time being, the only ways to have access to a parent's builder are:

- Passing it through `props`, which has the drawback to couple our children
  components to their parent.
- Providing it via Vue's `provide` with an unique key.

The `isRegistered` function, in this case, is mostly a way to check if the class
was actually registered just after builder's bootstrap. It can also be used
in a custom composable or in a state manager (Vuex, Pinia, ...) by passing the
Vue.js application as target (`self` below).

```typescript
const { isRegistered } = useVueDiod();

const self = getCurrentInstance();

const builder = new VueDiodBuilder();
builder.bootstrap(self, {
  register: AbstractCounter,
  use: Counter,
});

if (isRegistered(AbstractCounter, builder)) {
  console.log(`${AbstractCounter} was successfully registered.`);
}

// ...
```

### Types

```typescript
isRegistered: <T>(identifier: Abstract<T> | Newable<T>) => boolean;
```

## isProvided

The `isProvided` helper is more interesting. It will check if the class as key
is provided by:

1. The component itself (i.e. its parent).
2. The application (i.e. it was registered at application bootstrap).

```typescript
const { isProvided } = useVueDiod();

// If we take this documentation example components, it will return 'true':
// 'AbstractCounter' was provided on application bootstrap.

const counterProvided = isProvided(AbstractCounter);

// If we look at the 'parent->child' example, this will return true if
// we call it from the child component (injector), but false is called
// from outside the parent component (provider) children tree.
const mealProvided = isProvided(AbstractMeal);

if (counterProvided && mealProvided) {
  // Super-extra stuff...
}
```

### Types

```typescript
isProvided: <T>(identifier: Abstract<T> | Newable<T>) => boolean;
```

## getDefaultBuilder

If we have the use of native DIOD's builder, we can get it with
`useVueDiod` method `getDefaultBuilder`. This method is mainly provided
to handle eventual DIOD functionalities changes.

```typescript
const { getDefaultBuilder } = useVueDiod();

const builder = getDefaultBuilder();

const isRegistered = builder.isRegistered(AbstractCounter);

if (isRegistered) {
  // Some cool stuff...
}
```

### Types

```typescript
getDefaultBuilder: () => ContainerBuilder | undefined;
```

## getDefaultContainer

If we have the use of native DIOD's container, we can get it with
`useVueDiod` method `getDefaultContainer`. This method is mainly provided
to handle eventual DIOD functionalities changes.

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
