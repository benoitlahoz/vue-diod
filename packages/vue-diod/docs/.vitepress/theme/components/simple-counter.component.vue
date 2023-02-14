<script setup lang="ts">
  import VPButton from 'vitepress/dist/client/theme-default/components/VPButton.vue';
  import type { Ref /* , InjectionKey */ } from 'vue';
  import { ref /* , inject */ } from 'vue';
  import { useVueDiod } from '../../../../src';
  import { AbstractSimpleCounter } from '../modules';

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

  const counter = injectServiceInstance<AbstractSimpleCounter | any>(
    // Pass the abstract class as key.

    AbstractSimpleCounter,

    // Vue DIOD allows not to pass fallback, if you're sure the key exists.

    fallback
  );

  /*

  // NB: Things could also be done like this.

  const Key = AbstractSimpleCounter as unknown;

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
  )(); // Note the injection returns a function.
  */

  const count: Ref<number> = ref(0);

  // Our component's methods.

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
