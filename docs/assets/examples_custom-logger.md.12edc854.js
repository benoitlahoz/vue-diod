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
const _hoisted_3 = /* @__PURE__ */ createStaticVNode('<p>Here we create the same counter as in the <a href="./simple-counter">Simple Counter</a> example, but our <code>AbstractCounter</code> now takes an <code>AbstractLogger</code> as constructor dependency.</p><h2 id="abstractions" tabindex="-1">Abstractions <a class="header-anchor" href="#abstractions" aria-hidden="true">#</a></h2><h2 id="services" tabindex="-1">Services <a class="header-anchor" href="#services" aria-hidden="true">#</a></h2><h2 id="application" tabindex="-1">Application <a class="header-anchor" href="#application" aria-hidden="true">#</a></h2><div class="language-typescript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#676E95;font-style:italic;">// main.ts</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#676E95;font-style:italic;">// Import once in the application: Sooner the better.</span></span>\n<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">reflect-metadata</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">createApp</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">vue</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>\n<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> VueDiod </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">vue-diod</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">AbstractCounter</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./counter.abstract</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>\n<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">CounterByOne</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./counter-by-one.service</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> App </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./App.vue</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> app </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">createApp</span><span style="color:#A6ACCD;">(App)</span><span style="color:#89DDFF;">;</span></span>\n<span class="line"><span style="color:#A6ACCD;">app</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">use</span><span style="color:#A6ACCD;">(VueDiod</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">injectables</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> [</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#89DDFF;">      </span><span style="color:#676E95;font-style:italic;">// Registers our abstract class as &#39;key&#39; for...</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">register</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> AbstractCounter</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#89DDFF;">      </span><span style="color:#676E95;font-style:italic;">// ... our implementation.</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">use</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> CounterByOne</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">},</span></span>\n<span class="line"><span style="color:#A6ACCD;">  ]</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#A6ACCD;">app</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">mount</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">#app</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>\n<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br></div></div><h2 id="component" tabindex="-1">Component <a class="header-anchor" href="#component" aria-hidden="true">#</a></h2><h2 id="result" tabindex="-1">Result <a class="header-anchor" href="#result" aria-hidden="true">#</a></h2>', 7);
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
