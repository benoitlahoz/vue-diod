import { d as defineComponent, A as AbstractCounter, r as ref, o as openBlock, c as createElementBlock, a as createVNode, u as unref, V as VPButton, b as createBaseVNode, t as toDisplayString, e as useVueDiod, f as createTextVNode, g as createStaticVNode } from "./app.1154be72.js";
const _hoisted_1$1 = { style: { "display": "flex", "justify-content": "space-between", "align-items": "center", "width": "80%" } };
const _hoisted_2$1 = { style: { "font-weight": "700" } };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "custom-logger.component",
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
      AbstractCounter,
      fallback
    );
    const count = ref(0);
    const increment = counter.increment;
    const decrement = counter.decrement;
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$1, [
        createVNode(VPButton, {
          onClick: _cache[0] || (_cache[0] = ($event) => count.value = unref(decrement)(count.value)),
          text: "Decrement"
        }),
        createBaseVNode("div", _hoisted_2$1, toDisplayString(count.value), 1),
        createVNode(VPButton, {
          onClick: _cache[1] || (_cache[1] = ($event) => count.value = unref(increment)(count.value)),
          text: "Increment"
        })
      ]);
    };
  }
});
const _hoisted_1 = {
  id: "frontmatter-title",
  tabindex: "-1"
};
const _hoisted_2 = /* @__PURE__ */ createBaseVNode("a", {
  class: "header-anchor",
  href: "#frontmatter-title",
  "aria-hidden": "true"
}, "#", -1);
const _hoisted_3 = /* @__PURE__ */ createStaticVNode("", 7);
const _hoisted_10 = { style: { "width": "100%", "display": "flex", "justify-content": "center", "margin": "4rem 0" } };
const __pageData = JSON.parse('{"title":"Custom Logger","description":"","frontmatter":{"title":"Custom Logger"},"headers":[{"level":2,"title":"Abstractions","slug":"abstractions","link":"#abstractions","children":[]},{"level":2,"title":"Services","slug":"services","link":"#services","children":[]},{"level":2,"title":"Application","slug":"application","link":"#application","children":[]},{"level":2,"title":"Component","slug":"component","link":"#component","children":[]},{"level":2,"title":"Result","slug":"result","link":"#result","children":[]}],"relativePath":"examples/custom-logger.md"}');
const __default__ = { name: "examples/custom-logger.md" };
const _sfc_main = Object.assign(__default__, {
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [
        createBaseVNode("h1", _hoisted_1, [
          createTextVNode(toDisplayString(_ctx.$frontmatter.title) + " ", 1),
          _hoisted_2
        ]),
        _hoisted_3,
        createBaseVNode("div", _hoisted_10, [
          createVNode(_sfc_main$1)
        ])
      ]);
    };
  }
});
export {
  __pageData,
  _sfc_main as default
};
