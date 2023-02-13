import { _ as _sfc_main$1 } from "./chunks/simple-counter.component.vue_vue_type_script_setup_true_lang.50c94995.js";
import { o as openBlock, c as createElementBlock, b as createBaseVNode, f as createTextVNode, t as toDisplayString, a as createVNode, g as createStaticVNode } from "./app.1154be72.js";
const _hoisted_1 = {
  id: "frontmatter-title",
  tabindex: "-1"
};
const _hoisted_2 = /* @__PURE__ */ createBaseVNode("a", {
  class: "header-anchor",
  href: "#frontmatter-title",
  "aria-hidden": "true"
}, "#", -1);
const _hoisted_3 = /* @__PURE__ */ createStaticVNode("", 16);
const _hoisted_19 = { style: { "width": "100%", "display": "flex", "justify-content": "center", "margin": "4rem 0" } };
const __pageData = JSON.parse('{"title":"Simple Counter","description":"","frontmatter":{"title":"Simple Counter"},"headers":[{"level":2,"title":"Abstraction","slug":"abstraction","link":"#abstraction","children":[]},{"level":2,"title":"Service","slug":"service","link":"#service","children":[]},{"level":2,"title":"Application","slug":"application","link":"#application","children":[]},{"level":2,"title":"Component","slug":"component","link":"#component","children":[]},{"level":2,"title":"Result","slug":"result","link":"#result","children":[]}],"relativePath":"examples/simple-counter.md"}');
const __default__ = { name: "examples/simple-counter.md" };
const _sfc_main = Object.assign(__default__, {
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [
        createBaseVNode("h1", _hoisted_1, [
          createTextVNode(toDisplayString(_ctx.$frontmatter.title) + " ", 1),
          _hoisted_2
        ]),
        _hoisted_3,
        createBaseVNode("div", _hoisted_19, [
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
