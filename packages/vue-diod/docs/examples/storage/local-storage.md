---
title: Local Storage
---

# {{ $frontmatter.title }}

Our local storage service will provide the ability to:

- Store data for a given key.
- Get typesafe data for a given key.
- Remove an entry with its key.
- Save the data to a file.

::: info NOTA BENE
We could have built a `SaveUseCase` abstraction and defined it as
parameter's type for the LocalStorage service's `save` method, in order to save
to any place defined by the provided saver's implementation.
:::

## Properties

`LocalStorage` service properties are:

```typescript
// The prefix for our application stored values:
// A global 'DEFAULT_KEY_PREFIX' is provided.

private _prefix: string = DEFAULT_KEY_PREFIX;

// The reactive content of our stored key / value pairs (see below).

private _content: Ref<Record<string, string | number>> = ref({});

// Getters.

public get prefix(): string {
  return this._prefix;
}

public get content(): Ref<Record<string, any>> {
  return this._content;
}
```

The 'content' object is made a `ref`, in order for components using it
to reactively display its content.

::: info NOTA BENE
We'll see in the [Final Component](final-component.md) that we actually
watch its value and convert it to an array, to be displayed in a `table`.
:::

## Constructor

When instantiating our service, we need to pass it the prefix we want to use.
For this purpose, we'll use the
[`VueDiodInjectable`](../../getting-started/configuration.md#injectables)
configuration property `useFactory` to provide a way to DIOD
to build our instance.

Also, we need our service to be a singleton, as there is only one localStorage
and many components may need to access it. When bootstrapping our provider
component, we will also pass the property
[`scope: VueDiodScope.Singleton`](../../getting-started/configuration.md#scope-1)

::: tip
See --> [Vue.js Composition](composition.md).
:::

On instantiation, our singleton will:

- Read the `localStorage` values.
- Filter the ones which begin with our `prefix`
- Assign the key / value pairs to the `_content` property of
  our service's instance.

**E.g.:** For a key / value pair `'vue-diod:foo': 'bar'` in the browser's
localStorage, our 'content' object will contain `foo: 'bar'`

::: details CODE

```typescript
constructor(prefix: string) {
  this._prefix = prefix;

  // Get local storage and set values in content object without the prefix.

  this._content.value = Object.keys(localStorage)

    // Filter by keys that begin with our prefix.

    .filter((key) => key.startsWith(this._prefix))
    .reduce((obj, key) => {
      // Get localStorage value.
      const stored = localStorage[key];

      // Check if the value is a number.
      const isNumber =
        !isNaN(+stored) && !isNaN(parseFloat(stored as string));

      // The value that we will store in our content object.
      const value = isNumber ? +localStorage[key] : localStorage[key];

      // Assign key/value to our content object.
      return Object.assign(obj, {
        [key.replace(`${this._prefix}:`, '')]: value,
      });
    }, {});
  }
```

:::

## Methods

Our implementation provides, as expected, the following methods. Typescript will
complain if our service doesn't implement the methods declared in
the `LocalStorageUseCase` and our injecting component wil throw error at compile
time.

### set

To store a value, we will both store the actual value in
browser's `localStorage` and keep it in cache in our 'content' object.
This allows us to convert any `string` containing only numbers
in an actual `number` in our object.
Furthermore, the `set` method sorts the 'content' by its keys so it will
always be displayed in a coherent order for `Client`.

::: details CODE

```typescript
public set(key: string | symbol, value: string | number): void {
  const storageKey = `${this._prefix}:${String(key)}`;

  // Store with the prefix.
  localStorage.setItem(storageKey, String(value));

  // Check if value is a number.
  const isNumber = !isNaN(+value) && !isNaN(parseFloat(value as string));

  // Cache without the prefix.
  this._content.value[String(key)] = isNumber ? +value : value;

  // Order object by keys.
  this._content.value = Object.keys(this._content.value)
    .sort((keyA: string, keyB: string) =>
      keyA.toLowerCase().localeCompare(keyB.toLowerCase())
    )
    .reduce((obj: Record<string, any>, key: string) => {
      obj[key] = this._content.value[key];
      return obj;
    }, {});
}
```

:::

### get

The `get` method returns an entry of our 'content' object that stays in sync
with the `localStorage` as long as all components use our service.

::: tip ENHANCEMENT
We could parse the browser's `localStorage` for each call to one of our
methods, so the 'content' object would be in sync even when not
using our service.
:::

::: details CODE

```typescript
public get(key: string | symbol): Record<string, any> | undefined {
  if (!this._content.value[String(key)]) return;

  // Return our content object's value.
  // NB: Not the actual localStorage one.

  return {
    key: key,
    value: this._content.value[String(key)],
  };
  }
```

:::

### remove

The `remove` method... removes an entry from both `localStorage` and our
'content' object. The latter being made reactive, any component using it will
automatically update according to its changes.

::: details CODE

```typescript
public remove(key: string | symbol): void {
  const storageKey = `${this._prefix}:${String(key)}`;

  // Remove item with its prefix.
  localStorage.removeItem(storageKey);

  if (this._content.value[String(key)])
    // Remove item that was stored without the prefix in our content object.
    delete this._content.value[String(key)];
}
```

:::

### save

`save` method allows us to pass an implementation of `FileSaveUseCase` abstract
class to save the content of our store to a local file.

:::details CODE

```typescript
public save(fileSaver?: FileSaveUseCase): void {
  if (fileSaver) {

    // NB: This could / should have a specific type.

    const content = {
      prefix: this._prefix,
      content: {
        ...this._content.value,
      },
    };
    fileSaver.save(content);
  }
}
```

:::
