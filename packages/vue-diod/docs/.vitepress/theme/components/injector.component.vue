<script setup lang="ts">
  import { ref } from 'vue';
  import { AbstractMeal } from '../modules';
  import { useVueDiod } from '../../../../src';

  const { injectServiceInstance, isProvided } = useVueDiod();

  const key = ref(AbstractMeal);
  const injected = injectServiceInstance(AbstractMeal);
</script>
<template>
  <div class="injector-container">
    <div class="injector-dependency-arrow">↵</div>
    <div style="width: 100%">
      <div class="injector-main-card">
        <h3 style="margin: 0 0 1rem 0">I'm the child component 👶</h3>
        <div class="injector-result-line">
          <span>I was dependent of an&nbsp;</span>
          <pre style="margin: 0">{{ key.name }}(AbstractMeal)</pre>
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
          <pre style="margin: 0"
            >{{ injected?.constructor.name }}(VegetarianMeal)</pre
          >
        </div>
      </div>
      <div class="injector-meal-result">
        <!-- Main -->

        <div class="injector-meal-card">
          <div style="display: flex; justify-content: space-between">
            <h3 style="margin: 0 0 1rem 0">Main</h3>
            <badge
              type="info"
              :text="injected?.main.name"
              style="height: fit-content"
            />
          </div>
          <div class="injector-meal-icon">{{ injected?.main.icon }}</div>
        </div>

        <!-- Side -->

        <div class="injector-meal-card">
          <div
            style="flex-grow: 1; display: flex; justify-content: space-between"
          >
            <h3 style="margin: 0 0 1rem 0">Side</h3>
            <badge
              type="info"
              :text="injected?.side.name"
              style="height: fit-content"
            />
          </div>
          <div class="injector-meal-icon">{{ injected?.side.icon }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
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
