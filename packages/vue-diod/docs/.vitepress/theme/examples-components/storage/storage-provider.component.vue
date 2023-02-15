<script setup lang="ts">
  import { getCurrentInstance } from 'vue';
  import {
    VueDiodBuilder,
    VueDiodInjectable,
    VueDiodScope,
  } from '../../../../../src';
  import {
    // Abstractions.

    LocalStorageUseCase,
    FileSaveUseCase,

    // Implementations.
    LocalStorage,
    FileSaver,
  } from './modules/services';
  import StorageService from './components/storage-service.component.vue';

  const self = getCurrentInstance();
  const builder = new VueDiodBuilder();

  const STORAGE_PREFIX: string = 'vue-diod-example';

  const injectables: Array<VueDiodInjectable> = [
    {
      register: LocalStorageUseCase,
      useFactory: () => {
        // Here we use a factory to set our prefix in the constructor.

        return new LocalStorage(STORAGE_PREFIX);
      },
      scope: VueDiodScope.Singleton,
    },
    { register: FileSaveUseCase, use: FileSaver },
  ];

  builder.bootstrap(self, { injectables });
</script>
<template>
  <storage-service />
</template>
