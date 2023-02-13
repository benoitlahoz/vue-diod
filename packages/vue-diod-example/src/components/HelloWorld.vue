<template>
  <div class="header">
    <div class="title">Vue Diod</div>
    <div class="subtitle">Dependency injection in Vue.js</div>
  </div>

  <div class="card">
    <div style="display: flex; align-items: center; justify-content: center">
      <button
        type="button"
        @click="count = decrement(count)"
      >
        -
      </button>
      <div style="width: 200px; margin: 0 0.5rem; text-align: center">
        count is
        <span style="font-weight: bold">{{ count }}</span>
      </div>
      <button
        type="button"
        @click="count = increment(count)"
      >
        +
      </button>
    </div>
  </div>
</template>

<style scoped>
  .read-the-docs {
    color: #888;
  }
</style>
<script setup lang="ts">
  import type { InjectionKey } from 'vue';
  import { ref, inject, watch } from 'vue';
  import { useVueDiod } from 'vue-diod';
  import { AbstractCounter, AbstractLogger } from '../modules';

  // Current count value.
  const count = ref(0);

  // Imports VueDiod helper.
  const diod = useVueDiod();

  // Inject counter with fallback, by the abstract class
  // it implements, without helper.
  const CounterKey = AbstractCounter as unknown;
  const counter = inject<() => AbstractCounter>(
    CounterKey as InjectionKey<AbstractCounter>,
    () => {
      return {
        increment: (value: number) => value + 5,
        decrement: (value: number) => value - 5,
      };
    }
  )();

  // Use VueDiod helper to get typesafe injection key.
  const logger = inject<() => AbstractLogger>(
    diod.injectionKeyForClass(AbstractLogger),

    // Fallback to console.

    () => {
      return {
        log: console.log,
        info: console.log,
        warn: console.warn,
        error: console.error,
      };
    }
  )();

  const increment = counter.increment;
  const decrement = counter.decrement;

  watch(
    () => count.value,
    () => {
      // Use injected logger.

      logger.log('In Vue: Count value is %d', count.value);
    }
  );
</script>
