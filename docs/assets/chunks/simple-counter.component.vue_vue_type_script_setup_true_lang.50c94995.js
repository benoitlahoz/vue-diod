import { d as defineComponent, h as AbstractSimpleCounter, r as ref, o as openBlock, c as createElementBlock, a as createVNode, u as unref, V as VPButton, b as createBaseVNode, t as toDisplayString, e as useVueDiod } from "../app.1154be72.js";
const _hoisted_1 = { style: { "display": "flex", "justify-content": "space-between", "align-items": "center", "width": "80%" } };
const _hoisted_2 = { style: { "font-weight": "700" } };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "simple-counter.component",
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
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createVNode(VPButton, {
          onClick: _cache[0] || (_cache[0] = ($event) => count.value = unref(decrement)(count.value)),
          text: "Decrement"
        }),
        createBaseVNode("div", _hoisted_2, toDisplayString(count.value), 1),
        createVNode(VPButton, {
          onClick: _cache[1] || (_cache[1] = ($event) => count.value = unref(increment)(count.value)),
          text: "Increment"
        })
      ]);
    };
  }
});
export {
  _sfc_main as _
};
