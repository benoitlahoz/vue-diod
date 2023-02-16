---
title: Vue.js Composition
---

# {{ $frontmatter.title }}

At this point, we have to put it all this together. From a container component
in our application we will provide services to its children.

Our main component will be the place where we bootstrap the dependencies
expected by its children.

We already declared and implemented the following.

## Abstractions

We have 3 types of dependencies that can be injected:

- `StorageUseCase`: Actually not injected, but provides a generic type for other
  abstract classes
- `LocalStorageUseCase`: Provides a type for local storage.
- `FileSaveUseCase`: Provides a type for local file saving.

## Implementations

On top of these types we wrote 2 concrete classes:

- `LocalStorage`: Will actually store data in browser's `localStorage`.
  It is found by children with `LocalStorageUseCase` key
- `FileSaver`: Will save content from `localStorage` in a local file.
  It is found by children by `FileSaveUseCase` key.

## Provider Component

Now we need a components wrapper that will provide these
functionalities to its children.

```vue
// storage-provider.component.vue

<script setup lang="ts">
  import { VueDiodBuilder, VueDiodInjectable, VueDiodScope } from 'vue-diod';
  import {
    // Abstractions.

    LocalStorageUseCase,
    FileSaveUseCase,

    // Implementations.
    LocalStorage,
    FileSaver,
  } from './modules/services';

  // Create a new builder.
  const builder = new VueDiodBuilder();

  // Define the prefix to set / get values from localStorage.
  const STORAGE_PREFIX: string = 'vue-diod-example';

  // Define services and the abstraction they implement.
  const injectables: Array<VueDiodInjectable> = [
    {
      register: LocalStorageUseCase,
      useFactory: () => {
        // Here we use a factory to be able tp set our
        // prefix in the constructor.

        return new LocalStorage(STORAGE_PREFIX);
      },

      // As browser's 'localStorage' is unique and LocalStorage service keeps
      // values in cache, we want to get a singleton when injecting this
      // service.
      scope: VueDiodScope.Singleton,
    },

    // This will be passed to LocalStorage 'save' method.
    { register: FileSaveUseCase, use: FileSaver },
  ];

  // Bootstrap and build the dependency container.
  builder.bootstrap({ injectables });
</script>
<template>
  <!-- Here we could use multiple components. -->
  <storage-service />
</template>
```

## Injector Component(s)

Now, we have to create our components to inject the services we bootstrapped
in our main provider component.

::: info NOTA BENE
Everything is put in a single component here for simplicity, but we could have
split the following component into a few ones, each with its
specific functionality and injecting necessary dependencies.
:::

```vue
<script setup lang="ts">
  import type { Ref } from 'vue';
  import { ref, watch } from 'vue';
  import { useVueDiod } from 'vue-diod';
  import { LocalStorageUseCase, FileSaveUseCase } from '../modules/services';

  const { injectServiceInstance } = useVueDiod();
  const localStorage = injectServiceInstance(LocalStorageUseCase);
  const fileSaver = injectServiceInstance(FileSaveUseCase);

  /**
   * Store.
   * THAT IS THE IMPORTANT PART!
   *
   * The 'content' value is set by tranforming the LocalStorage service's
   * content from an object to an array of arrays that contains:
   *  - [0]:  The key (string)
   *  - [1]:  The value (string | number)
   */
  const content: Ref<Array<[string, string | number]>> = ref([]);
  watch(
    localStorage!.content,
    () => {
      content.value = Object.entries(localStorage!.content.value);
    },
    { immediate: true, deep: true }
  );
  const store = () => {
    if (!disabled.value) {
      // See 'key' below.
      key.value = key.value.trim();

      // See 'value' below.
      value.value = value.value.trim();

      localStorage?.set(key.value, value.value);
      // We could also write...
      // localStorage?.set(Symbol(key.value), value.value);

      resetInputs();
    }
  };
  const get = (storageKey: string) => {
    const result: Record<string, any> | undefined =
      localStorage!.get(storageKey);

    alert(
      `Local storage service returned\n\n${JSON.stringify(result, null, 2)}`
    );
  };
  const remove = (storageKey: string) => {
    localStorage?.remove(storageKey);
  };
  const save = () => {
    // LocalStorage service handles itself the case FileSaver is undefined.
    localStorage?.save(fileSaver);
  };

  /**
   * END OF THE IMPORTANT PART!
   * See next section for the end of the <script setup>
   */
</script>
```

:::details \<script setup lang="ts"\>

```typescript
/**
 * Component's state handling.
 */
const keyInputRef = ref(null);
const key: Ref<string> = ref('');
const validateKey = () => {
  if (keyInputRef.value) {
    const keyElement: HTMLInputElement = keyInputRef.value;

    // Triggers change immediately.
    key.value = keyElement.value.replace(/[^a-z0-9]/gi, '').trim();
  }
};

const valueInputRef = ref(null);
const value: Ref<string> = ref('');
const validateValue = () => {
  if (valueInputRef.value) {
    const valueElement: HTMLInputElement = valueInputRef.value;
    value.value = valueElement.value
      .replace(/[^a-z 0-9]/gi, '')
      .replace(/ +(?= )/g, '');

    // Triggers change immediately.
    valueElement.value = value.value;
  }
};

const disabled = ref(true);
watch([key, value], () => {
  disabled.value = key.value.length === 0 || value.value.length === 0;
});

const resetInputs = () => {
  if (keyInputRef.value && valueInputRef.value) {
    // Reset and blur.

    const keyElement: HTMLInputElement = keyInputRef.value;
    const valueElement: HTMLInputElement = valueInputRef.value;

    key.value = '';
    value.value = '';

    keyElement.value = key.value;
    valueElement.value = value.value;

    keyElement.blur();
    valueElement.blur();
  }
};
```

:::

:::details \<template\>

```html
<template>
  <div class="container">
    <div>
      <span style="font-weight: bold">Prefix: </span>
      <span>{{ localStorage?.prefix }}</span>
    </div>
    <div class="form">
      <div>
        <input
          ref="keyInputRef"
          type="text"
          placeholder="Enter the key"
          class="item"
          @input="validateKey"
          @keyup.enter="store"
        />
        <input
          ref="valueInputRef"
          type="text"
          placeholder="Enter the value"
          class="item"
          @input="validateValue"
          @keyup.enter="store"
        />
        <button
          :disabled="key.length == 0 || value.length == 0"
          class="item"
          :style="{
            backgroundColor: disabled ? 'grey' : '',
            borderColor: disabled ? 'darkgrey' : '',
          }"
          @mouseup="store"
        >
          Store
        </div>
      </div>
    </div>
    <div
      style="
        align-self: center;
        width: 100%;
        border-top: 1px solid var(--vp-c-divider);
        margin-top: 24px;
      "
    >
      <table>
        <thead>
          <th>Key</th>
          <th>Value</th>
        </thead>
        <tbody>
          <template v-if="content.length > 0">
            <tr v-for="entry in content">
              <td style="font-weight: 600">
                <div
                  style="
                    display: flex;
                    align-items: center;
                    width: 100%;
                    flex-wrap: wrap;
                  "
                >
                  <div>
                    {{ entry[0] }}
                  </div>
                  <div style="margin-left: auto">
                    <button @mouseup="get(entry[0])">Get</button>
                  </div>
                </div>
              </td>
              <td>
                <div
                  style="
                    display: flex;
                    align-items: center;
                    flex-grow: 1;
                    width: 100%;
                    flex-wrap: wrap;
                  "
                >
                  <div>{{ entry[1] }}</div>
                  <div style="margin-left: auto">
                    <button @mouseup="remove(entry[0])">Remove</button>
                  </div>
                </div>
              </td>
            </tr>
          </template>
          <template v-else>
            <tr style="width: 100%">
              <td
                colspan="2"
                style="text-align: center"
              >
                Nothing stored yet
              </td>
            </tr></template
          >
        </tbody>
      </table>
    </div>
    <div>
      <button @mouseup="save">Save to File</button>
    </div>
  </div>
</template>
```

:::
:::details \<style\>

```html
<style scoped>
  .container {
    display: flex;
    flex-direction: column;
  }

  .form {
    display: flex;
  }

  .form .item {
    margin-top: 24px;
  }

  input {
    border: 1px solid var(--vp-c-text-1);
    border-radius: 0.5rem;
    color: var(--vp-c-text-1);
    padding: 0.2rem 0.2rem 0.2rem 1rem;
    margin-right: 1rem;
  }

  table {
    display: table;
    width: 100%;
    min-width: 100%;
    table-layout: fixed;
    overflow-wrap: break-word;
  }
</style>
```

:::

We now have a fully functional component expecting functionalities without
knowing their concrete implementations. Obviously, if we wanted to add
more it would require to modify the code of the 'injector' component...
or not... 🙃

But this will be the subject of another example.
