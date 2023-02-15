<script setup lang="ts">
  import { getCurrentInstance } from 'vue';
  import { AbstractMeal, VegetarianMeal } from './modules';
  import Injector from './injector.component.vue';
  import { VueDiodBuilder } from '../../../../../src';

  // Creates a new builder.

  const builder = new VueDiodBuilder();

  // Get instance of 'this' component.

  const self = getCurrentInstance();

  // Bootstraps the builder, as in global plugin's configuration
  // but on the component's instance.

  builder.bootstrap(self, {
    injectables: [
      {
        register: AbstractMeal,
        use: VegetarianMeal,
      },
    ],
  });
</script>
<template>
  <div class="provider-container">
    <div class="provider-card">
      <h3>I'm the parent component 🧑</h3>
      <div class="provider-content">
        <span>I promised an&nbsp;</span>
        <pre>AbstractMeal({{ AbstractMeal.name }})</pre>
        <span>&nbsp;and provided a&nbsp;</span>
        <pre>VegetarianMeal({{ VegetarianMeal.name }})</pre>
      </div>
      <h4 style="margin-top: 1rem">to my child 💪 component below</h4>
    </div>
    <injector class="provider-child" />
  </div>
</template>
<style scoped>
  .provider-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .provider-container .provider-card {
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

  .provider-container .provider-content {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
  }

  .provider-container h3 {
    margin: 0 0 1rem 0;
  }

  .provider-container pre {
    margin: 0;
  }

  .provider-container .provider-child {
    margin: 1rem 0;
  }
</style>
