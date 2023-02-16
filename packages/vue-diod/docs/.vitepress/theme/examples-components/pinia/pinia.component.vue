<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { useCounterStore } from '../../stores/counter.store';

  const store = useCounterStore();
  const { count } = storeToRefs(useCounterStore());
  const { doubleCount } = useCounterStore();

  const increment = store.increment;
  const decrement = store.decrement;
</script>
<template>
  <div class="container">
    <div class="counter">
      <button @click="decrement">Decrement</button>
      <div>{{ count }}</div>
      <button @click="increment">Increment</button>
    </div>
    <div>
      <div>{{ doubleCount() }}</div>
    </div>
  </div>
</template>
<style scoped>
  .container {
    display: flex;
    flex-direction: column;
  }

  .container .counter {
    display: flex;
  }
</style>
