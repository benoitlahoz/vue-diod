---
title: Parent → Child
---

# {{ $frontmatter.title }}

Instead or in addition of providing
[global services](../getting-started/basic-usage#vue-diod), we can configure
a new builder object at the component level, which container will provide
services to its children.

Let's create a meal service for our children!

## Abstraction

First we create the meal abstraction: let's say a meal consists of
a main course and a side dish.

```typescript
export abstract class AbstractMeal {
  public abstract main: string;
  public abstract side: string;
}
```

## Services

At this point, as a parent, we can provide different kinds of meals:
omnivore, vegetarian, carnivore...
Here we focus on the vegetarian one, but we could implement `any` kind of diet.

```typescript
import { Service } from 'diod';
import { AbstractMeal } from './meal.abstract';

@Service()
export class VegetarianMeal implements AbstractMeal {
  public main: string = 'rice';
  public side: string = 'vegetables';
}
```

## Application

There is nothing special to do at the application level. But we will now create
two components: a parent and a child. The parent is responsible to provide the
actual services to its children, given their types (abstract classes).

::: warning
In the next section, by creating a dependencies container at component level,
we will be coupling our provider (parent) component to the `VegetarianMeal`
concrete class.
:::

## Parent component

The parent registers the abstract class and bind it to the `VegetarianMeal`
actual implementation.

```vue
// provider.component.vue

<script setup lang="ts">
  import { getCurrentInstance } from 'vue';
  import { VueDiodBuilder } from 'vue-diod';
  import { AbstractMeal, VegetarianMeal } from '../modules';

  // Import our child component.

  import Injector from './injector.component.vue';

  // Creates a new builder.

  const builder = new VueDiodBuilder();

  // Get instance of 'this' component.

  const self = getCurrentInstance();

  // Bootstraps the builder we just created,
  // as in global plugin's configuration
  // but on the component's instance.

  builder.bootstrap(self, {
    injectables: [
      {
        register: AbstractMeal, // This is what the child is waiting for.
        use: VegetarianMeal, // This is what it will receive actually.
      },
    ],
  });
</script>
```

::: details \<template\>

```vue
<template>
  <div class="container">
    <div class="card">
      <h3>I'm the parent component 🧑</h3>
      <div class="content">
        <span>I promised an&nbsp;</span>
        <pre>{{ AbstractMeal.name }}</pre>
        <span>&nbsp;and provided a&nbsp;</span>
        <pre>{{ VegetarianMeal.name }}</pre>
      </div>
      <h4>to my child 💪 component below</h4>
    </div>

    <!-- Here is our child! NB: It could also be a slot. -->

    <injector class="child" />

    <!-- End of child (yes, I know...)-->
  </div>
</template>
```

:::
::: details \<style\>

```vue
<style scoped>
  .container {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .container .card {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 0.5rem;
    border: 2px solid rgba(235, 201, 92, 1);
    background-color: rgba(235, 201, 92, 0.25);
    padding: 1rem 0;
  }

  .container .content {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
  }

  .container h3 {
    margin: 0 0 1rem 0;
  }

  .container pre {
    margin: 0;
  }

  .container .child {
    margin: 1rem 0;
  }
</style>
```

:::

## Child component

The child component 'knows' it depends on the `AbstractMeal` class.
It must be prepared to receive whatever implementation of `AbstractMeal` will
be passed.

```vue
// injector.component.ts

<script setup lang="ts">
  import { ref } from 'vue';
  import { useVueDiod } from 'vue-diod';
  import { AbstractMeal } from '../modules';

  const { injectServiceInstance } = useVueDiod();

  // Set 'key' as 'ref' because we use it in the template.

  const key = ref(AbstractMeal);

  // Actually inject the service.
  // NB: We are not using fallback here: we are sure it exist. In production
  // mode, we should provide one.

  const injected = injectServiceInstance(AbstractMeal);
</script>
```

:::details \<template\>

```vue
<template>
  <div class="injector-container">
    <div class="injector-dependency-arrow">↵</div>
    <div style="width: 100%">
      <div class="injector-main-card">
        <h3 style="margin: 0 0 1rem 0">I'm the child component 👶</h3>
        <div class="injector-result-line">
          <span>I was dependent of an&nbsp;</span>
          <pre style="margin: 0">{{ key.name }}</pre>
          <span>&nbsp;🍖</span>
        </div>
        <div class="injector-result-line">
          <span
            >and finally received
            <span>
              <badge
                type="warning"
                text="injected"
                style="height: fit-content"
              />
            </span>
            &nbsp;a&nbsp;</span
          >
          <pre style="margin: 0">{{ injected?.constructor.name }}</pre>
        </div>
      </div>
      <div class="injector-meal-result">
        <!-- Main -->
        <div class="injector-meal-card">
          <div style="display: flex; justify-content: space-between">
            <h3 style="margin: 0 0 1rem 0">Main</h3>
            <badge
              type="info"
              :text="injected?.main"
              style="height: fit-content"
            />
          </div>
          <div class="injector-meal-icon">🍚</div>
        </div>

        <!-- Side -->
        <div class="injector-meal-card">
          <div
            style="flex-grow: 1; display: flex; justify-content: space-between"
          >
            <h3 style="margin: 0 0 1rem 0">Side</h3>
            <badge
              type="info"
              :text="injected?.side"
              style="height: fit-content"
            />
          </div>
          <div class="injector-meal-icon">🥕</div>
        </div>
      </div>
    </div>
  </div>
</template>
```

:::
::: details \<style\>

```html
<style scoped>
  .injector-container {
    display: flex;
    width: 100%;
  }

  .injector-container .injector-dependency-arrow {
    display: flex;
    align-items: center;
    width: 4rem;
    height: 4rem;
    font-size: 4rem;
    font-weight: 500;
    transform: rotate(90deg);
  }

  .injector-container .injector-main-card {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    align-items: center;
    border-radius: 0.5rem;
    border: 2px solid rgba(92, 156, 235, 1);
    background-color: rgba(92, 156, 235, 0.25);
    padding: 1rem 0;
    position: relative;
  }

  .injector-container .injector-result-line {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
  }

  .injector-meal-result {
    display: flex;
    width: 100%;
    margin-top: 0.5rem;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .injector-meal-result .injector-meal-card {
    flex-grow: 1;
    border-radius: 0.5rem;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
  }

  .injector-meal-card .injector-meal-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 6rem;
    height: 6rem;
    width: 100%;
  }
</style>
```

:::

## Result

<script setup>
import ProviderComponent from '../.vitepress/theme/components/provider.component.vue';
</script>

<div style="width: 100%; display: flex; justify-content: center; margin: 4rem 0;">
  <ProviderComponent />
</div>

::: info NOTA BENE
Minified versions of our abstract and concrete classes can be found, even
if their name change at compilation.
:::
