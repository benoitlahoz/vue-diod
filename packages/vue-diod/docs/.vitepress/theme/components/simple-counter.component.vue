<script setup lang="ts">
  import type { Ref, InjectionKey } from 'vue';
  import { ref, inject } from 'vue';
  import { AbstractSimpleCounter } from '../modules';

  const Key = AbstractSimpleCounter as unknown;

  // Here we could provide a fallback.
  const counter = inject<() => AbstractSimpleCounter>(
    Key as InjectionKey<AbstractSimpleCounter>,

    // Pass a fallback to avoid further checks.
    () => {
      return {
        increment(value: number) {
          return value++;
        },
        decrement(value: number) {
          return value--;
        },
      };
    }
  )();

  const increment = counter.increment;
  const decrement = counter.decrement;

  const count: Ref<number> = ref(0);
</script>
<template>
  <div
    style="
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 80%;
    "
  >
    <button
      @click="count = decrement(count)"
      class="button"
    >
      Decrement
    </button>
    <div style="font-weight: 700">{{ count }}</div>
    <button
      @click="count = increment(count)"
      class="button"
    >
      Increment
    </button>
  </div>
</template>
<style scoped>
  .button {
    display: inline-block;
    border: 1px solid transparent;
    text-align: center;
    font-weight: 600;
    white-space: nowrap;
    transition: color 0.25s, border-color 0.25s, background-color 0.25s;
    border-color: var(--vp-button-brand-border);
    color: var(--vp-button-brand-text);
    background-color: var(--vp-button-brand-bg);
    border-radius: 20px;
    padding: 0 20px;
    line-height: 38px;
    font-size: 14px;
  }

  .button:hover {
    border-color: var(--vp-button-brand-hover-border);
    color: var(--vp-button-brand-hover-text);
    background-color: var(--vp-button-brand-hover-bg);
  }
</style>
