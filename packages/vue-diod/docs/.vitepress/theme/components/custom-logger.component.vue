<script setup lang="ts">
  import VPButton from 'vitepress/dist/client/theme-default/components/VPButton.vue';
  import type { Ref } from 'vue';
  import { ref } from 'vue';
  import { useVueDiod } from '../../../../src';
  import { AbstractCounter } from '../modules';

  // Use the injection helper.

  const { injectServiceInstance } = useVueDiod();

  const fallback = () => {
    return {
      increment(value: number) {
        console.warn('Function increment was called from fallback.');
        return value++;
      },
      decrement(value: number) {
        console.warn('Function decrement was called from fallback.');
        return value--;
      },
    };
  };

  const counter = injectServiceInstance<AbstractCounter | any>(
    AbstractCounter,
    fallback
  );

  const count: Ref<number> = ref(0);

  const increment = counter.increment.bind(counter);
  const decrement = counter.decrement.bind(counter);
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
    <v-p-button
      @click="count = decrement(count)"
      text="Decrement"
    />
    <div style="font-weight: 700">{{ count }}</div>
    <v-p-button
      @click="count = increment(count)"
      text="Increment"
    />
  </div>
</template>
