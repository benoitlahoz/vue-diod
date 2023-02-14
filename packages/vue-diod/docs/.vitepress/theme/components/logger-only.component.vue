<script setup lang="ts">
  import VPButton from 'vitepress/dist/client/theme-default/components/VPButton.vue';
  import { useVueDiod } from '../../../../src';
  import { AbstractLogger } from '../modules';

  // Use the injection helper.

  const { injectServiceInstance } = useVueDiod();

  const logger = injectServiceInstance<AbstractLogger | any>(AbstractLogger);

  const log = logger.log.bind(logger);
  const info = logger.info.bind(logger);
  const warn = logger.warn.bind(logger);
  const error = logger.error.bind(logger);
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
      @click="log('Logger outputs a... log.')"
      theme="sponsor"
      text="Log"
    />
    <v-p-button
      @click="info('Logger outputs an information.')"
      theme="sponsor"
      text="Info"
    />
    <v-p-button
      @click="warn('Logger outputs a warning.')"
      theme="sponsor"
      text="Warn"
    />
    <v-p-button
      @click="error('Logger outputs an error.')"
      theme="sponsor"
      text="Error"
    />
  </div>
</template>
