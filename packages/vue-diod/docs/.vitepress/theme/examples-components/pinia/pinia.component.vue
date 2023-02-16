<script setup lang="ts">
  import VPButton from 'vitepress/dist/client/theme-default/components/VPButton.vue';
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
      <v-p-button
        @click="decrement()"
        text="Decrement"
      />
      <div style="font-weight: 700">{{ count }}</div>
      <v-p-button
        @click="increment()"
        text="Increment"
      />
    </div>
    <div class="container">
      <div
        style="
          display: flex;
          width: 100%;
          border-top: solid var(--vp-c-divider);
          margin-top: 48px;
        "
      >
        <h3>Pinia Getters</h3>
        <div style="flex-grow: 1"></div>
      </div>
      <table>
        <thead>
          <tr>
            <th style="min-width: 300px">Getter</th>
            <th style="text-align: center">Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>doubleCount</td>
            <td style="text-align: center">{{ doubleCount() }}</td>
          </tr>
        </tbody>
      </table>
      <div></div>
    </div>
  </div>
</template>
<style scoped>
  .container {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
  }

  .container .counter {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 80%;
  }
</style>
