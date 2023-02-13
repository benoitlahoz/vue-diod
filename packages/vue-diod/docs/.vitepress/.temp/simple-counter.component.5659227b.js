import { defineComponent, ref, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrInterpolate } from "vue/server-renderer";
import { V as VPButton } from "./logger.service.e4b35e66.js";
import "reflect-metadata";
import "diod";
import { u as useVueDiod } from "./use-vue-diod.c381f2ee.js";
import { A as AbstractSimpleCounter } from "./simple-counter.abstract.c8588019.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "simple-counter.component",
  __ssrInlineRender: true,
  setup(__props) {
    const { injectService } = useVueDiod();
    const fallback = () => {
      return {
        increment(value) {
          console.warn("Function increment was called from fallback.");
          return value++;
        },
        decrement(value) {
          console.warn("Function decrement was called from fallback.");
          return value--;
        }
      };
    };
    const counter = injectService(
      // Pass the abstract class as key.
      AbstractSimpleCounter,
      // Vue DIOD allows not to pass fallback, if you're sure the key exists.
      fallback
    );
    const count = ref(0);
    const increment = counter.increment;
    const decrement = counter.decrement;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ style: { "display": "flex", "justify-content": "space-between", "align-items": "center", "width": "80%" } }, _attrs))}>`);
      _push(ssrRenderComponent(VPButton, {
        onClick: ($event) => count.value = unref(decrement)(count.value),
        text: "Decrement"
      }, null, _parent));
      _push(`<div style="${ssrRenderStyle({ "font-weight": "700" })}">${ssrInterpolate(count.value)}</div>`);
      _push(ssrRenderComponent(VPButton, {
        onClick: ($event) => count.value = unref(increment)(count.value),
        text: "Increment"
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(".vitepress/theme/components/simple-counter.component.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
