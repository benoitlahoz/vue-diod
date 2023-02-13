import { inject } from "vue";
import { a as VueDiodHelper } from "./logger.service.e4b35e66.js";
const useVueDiod = () => {
  const injectService = (key, fallback) => {
    const injectedFn = inject(
      injectionKeyForClass(key),
      fallback ? fallback : () => void 0
    );
    return injectedFn();
  };
  const injectionKeyForClass = (registered) => {
    return registered;
  };
  const getDefaultContainer = () => {
    return VueDiodHelper.defaultBuilder.container;
  };
  return {
    injectionKeyForClass,
    injectService,
    getDefaultContainer
  };
};
export {
  useVueDiod as u
};
