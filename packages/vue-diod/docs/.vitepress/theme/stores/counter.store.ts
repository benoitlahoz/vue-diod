import { defineStore } from 'pinia';
import { useVueDiod } from '../../../../src';
import { AbstractSimpleCounter } from '../generic-modules';

const { injectFromContainer } = useVueDiod();

export const useCounterStore = defineStore({
  id: 'counter',
  state: () => ({
    count: 0,
  }),
  getters: {
    doubleCount: (state) => () => {
      return state.count * 2;
    },
  },
  actions: {
    increment() {
      // Inject the service directly from the VueDiod plugin container.

      const counter = injectFromContainer(AbstractSimpleCounter);
      this.count = counter!.increment(this.count);
    },
    decrement() {
      // Inject the service directly from the VueDiod plugin container.

      const counter = injectFromContainer(AbstractSimpleCounter);

      this.count = counter!.decrement(this.count);
    },
  },
});
