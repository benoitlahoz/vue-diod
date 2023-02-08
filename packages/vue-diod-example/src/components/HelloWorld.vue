<script setup lang="ts">
  import type { InjectionKey } from 'vue';
  import { ref, inject, watch } from 'vue';

  // Dependency injection.
  import { AbstractCounter, AbstractLogger } from '../modules';

  defineProps<{ msg: string }>();

  // Current count value.

  const count = ref(0);

  // Inject logger and counter.

  const LoggerKey = AbstractLogger as unknown;
  const CounterKey = AbstractCounter as unknown;

  const logger = inject(LoggerKey as InjectionKey<AbstractLogger>);
  const counter = inject(CounterKey as InjectionKey<AbstractCounter>);

  // Assign the injected class's increment method to local increment
  // function or fallback.

  const increment = counter ? counter.increment : (value: number) => value;
  const log = logger ? logger.log : (...args: any[]) => console.log(...args);

  watch(
    () => count.value,
    () => {
      // Use injected logger.

      log('Logger in component: \tCount value is %d', count.value);
    }
  );
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button
      type="button"
      @click="count = increment(count)"
    >
      count is {{ count }}
    </button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a
      href="https://vuejs.org/guide/quick-start.html#local"
      target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a
      href="https://github.com/johnsoncodehk/volar"
      target="_blank"
      >Volar</a
    >
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
  .read-the-docs {
    color: #888;
  }
</style>
