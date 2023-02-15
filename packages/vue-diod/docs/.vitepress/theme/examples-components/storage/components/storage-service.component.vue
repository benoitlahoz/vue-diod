<script setup lang="ts">
  import type { Ref } from 'vue';
  import { ref, watch } from 'vue';
  import VPButton from 'vitepress/dist/client/theme-default/components/VPButton.vue';
  import { useVueDiod } from '../../../../../../src';
  import { LocalStorageUseCase, FileSaveUseCase } from '../modules/services';

  const { injectServiceInstance } = useVueDiod();
  const localStorage = injectServiceInstance(LocalStorageUseCase);
  const fileSaver = injectServiceInstance(FileSaveUseCase);

  /**
   * Key input.
   */
  const keyInputRef = ref(null);
  const key: Ref<string> = ref('');
  const validateKey = () => {
    if (keyInputRef.value) {
      const keyElement: HTMLInputElement = keyInputRef.value;
      key.value = keyElement.value.replace(/[^a-z0-9]/gi, '').trim();
    }
  };

  /**
   * Value input.
   */
  const valueInputRef = ref(null);
  const value: Ref<string> = ref('');
  const validateValue = () => {
    if (valueInputRef.value) {
      const valueElement: HTMLInputElement = valueInputRef.value;
      value.value = valueElement.value
        .replace(/[^a-z 0-9]/gi, '')
        .replace(/ +(?= )/g, '');

      //Triggers change immediately
      valueElement.value = value.value;
    }
  };

  /**
   * Button state.
   */
  const disabled = ref(true);
  watch([key, value], () => {
    disabled.value = key.value.length === 0 || value.value.length === 0;
  });

  /**
   * Store.
   * The 'content' value is set by tranforming the localStorage implementation
   * from an object to an array of arrays that contains
   *  - [0]:  The key (string)
   *  - [1]:  The value (string | number)
   */
  const content: Ref<Array<[string, string | number]>> = ref([]);
  watch(
    () => localStorage,
    () => {
      if (localStorage)
        content.value = Object.entries(localStorage.content.value);
    },
    { immediate: true, deep: true }
  );
  const store = () => {
    if (!disabled.value) {
      key.value = key.value.trim();
      value.value = value.value.trim();

      localStorage?.set(key.value, value.value);
      // We could also write...
      // localStorage?.set(Symbol(key.value), value.value);

      resetInputs();
    }
  };
  const get = (storageKey: string) => {
    const result: Record<string, any> | undefined =
      localStorage!.get(storageKey);

    alert(
      `Local storage service returned\n\n${JSON.stringify(result, null, 2)}`
    );
  };
  const remove = (storageKey: string) => {
    localStorage?.remove(storageKey);
  };
  const save = () => {
    // LocalStorage service handles itself the case FileSaver is undefined.
    localStorage?.save(fileSaver);
  };

  /**
   * Helpers.
   */

  const resetInputs = () => {
    if (keyInputRef.value && valueInputRef.value) {
      // Reset and blur.

      const keyElement: HTMLInputElement = keyInputRef.value;
      const valueElement: HTMLInputElement = valueInputRef.value;

      key.value = '';
      value.value = '';

      keyElement.value = key.value;
      valueElement.value = value.value;

      keyElement.blur();
      valueElement.blur();
    }
  };
</script>
<template>
  <div class="container">
    <div>
      <span style="font-weight: bold">Prefix: </span>
      <span>{{ localStorage?.prefix }}</span>
    </div>
    <div class="form">
      <div>
        <input
          ref="keyInputRef"
          type="text"
          placeholder="Enter the key"
          class="item"
          @input="validateKey"
          @keyup.enter="store"
        />
        <input
          ref="valueInputRef"
          type="text"
          placeholder="Enter the value"
          class="item"
          @input="validateValue"
          @keyup.enter="store"
        />
        <v-p-button
          text="Store"
          :disabled="key.length == 0 || value.length == 0"
          class="item"
          :style="{
            backgroundColor: disabled ? 'grey' : '',
            borderColor: disabled ? 'darkgrey' : '',
          }"
          @mouseup="store"
        />
      </div>
    </div>
    <div
      style="
        align-self: center;
        width: 100%;
        border-top: 1px solid var(--vp-c-divider);
        margin-top: 24px;
      "
    >
      <table>
        <thead>
          <th>Key</th>
          <th>Value</th>
        </thead>
        <tbody>
          <template v-if="content.length > 0">
            <tr v-for="entry in content">
              <td style="font-weight: 600">
                <div
                  style="
                    display: flex;
                    align-items: center;
                    width: 100%;
                    flex-wrap: wrap;
                  "
                >
                  <div>
                    {{ entry[0] }}
                  </div>
                  <div style="margin-left: auto">
                    <v-p-button
                      text="Get"
                      theme="alt"
                      @mouseup="get(entry[0])"
                    />
                  </div>
                </div>
              </td>
              <td>
                <div
                  style="
                    display: flex;
                    align-items: center;
                    flex-grow: 1;
                    width: 100%;
                    flex-wrap: wrap;
                  "
                >
                  <div>{{ entry[1] }}</div>
                  <div style="margin-left: auto">
                    <v-p-button
                      text="Remove"
                      theme="sponsor"
                      @mouseup="remove(entry[0])"
                    />
                  </div>
                </div>
              </td>
            </tr>
          </template>
          <template v-else>
            <tr style="width: 100%">
              <td
                colspan="2"
                style="text-align: center"
              >
                Nothing stored yet
              </td>
            </tr></template
          >
        </tbody>
      </table>
    </div>
    <div>
      <v-p-button
        text="Save to File"
        @mouseup="save"
      />
    </div>
  </div>
</template>
<style scoped>
  .container {
    display: flex;
    flex-direction: column;
  }

  .form {
    display: flex;
  }

  .form .item {
    margin-top: 24px;
  }

  input {
    border: 1px solid var(--vp-c-text-1);
    border-radius: 0.5rem;
    color: var(--vp-c-text-1);
    padding: 0.2rem 0.2rem 0.2rem 1rem;
    margin-right: 1rem;
  }

  table {
    display: table;
    width: 100%;
    min-width: 100%;
    table-layout: fixed;
    overflow-wrap: break-word;
  }
</style>
