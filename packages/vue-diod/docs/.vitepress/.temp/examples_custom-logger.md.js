import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrInterpolate } from "vue/server-renderer";
import { defineComponent, ref, mergeProps, unref, useSSRContext } from "vue";
import { V as VPButton } from "./logger.service.e4b35e66.js";
import "reflect-metadata";
import "diod";
import { u as useVueDiod } from "./use-vue-diod.c381f2ee.js";
import "./plugin-vue_export-helper.cc2b3d55.js";
class AbstractCounter {
}
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "custom-logger.component",
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
      AbstractCounter,
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
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(".vitepress/theme/components/custom-logger.component.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __pageData = JSON.parse('{"title":"Custom Logger","description":"","frontmatter":{"title":"Custom Logger"},"headers":[{"level":2,"title":"Abstractions","slug":"abstractions","link":"#abstractions","children":[]},{"level":2,"title":"Services","slug":"services","link":"#services","children":[]},{"level":2,"title":"Application","slug":"application","link":"#application","children":[]},{"level":2,"title":"Component","slug":"component","link":"#component","children":[]},{"level":2,"title":"Result","slug":"result","link":"#result","children":[]}],"relativePath":"examples/custom-logger.md"}');
const __default__ = { name: "examples/custom-logger.md" };
const _sfc_main = Object.assign(__default__, {
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="frontmatter-title" tabindex="-1">${ssrInterpolate(_ctx.$frontmatter.title)} <a class="header-anchor" href="#frontmatter-title" aria-hidden="true">#</a></h1><p>Here we create the same counter as in the <a href="./simple-counter">Simple Counter</a> example, but our <code>AbstractCounter</code> now takes an <code>AbstractLogger</code> as constructor dependency.</p><h2 id="abstractions" tabindex="-1">Abstractions <a class="header-anchor" href="#abstractions" aria-hidden="true">#</a></h2><h2 id="services" tabindex="-1">Services <a class="header-anchor" href="#services" aria-hidden="true">#</a></h2><h2 id="application" tabindex="-1">Application <a class="header-anchor" href="#application" aria-hidden="true">#</a></h2><div class="language-typescript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#676E95", "font-style": "italic" })}">// main.ts</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#676E95", "font-style": "italic" })}">// Import once in the application: Sooner the better.</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#89DDFF", "font-style": "italic" })}">import</span><span style="${ssrRenderStyle({ "color": "#A6ACCD" })}"> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&#39;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}">reflect-metadata</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&#39;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">;</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#89DDFF", "font-style": "italic" })}">import</span><span style="${ssrRenderStyle({ "color": "#A6ACCD" })}"> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">{</span><span style="${ssrRenderStyle({ "color": "#F07178" })}"> </span><span style="${ssrRenderStyle({ "color": "#A6ACCD" })}">createApp</span><span style="${ssrRenderStyle({ "color": "#F07178" })}"> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">}</span><span style="${ssrRenderStyle({ "color": "#A6ACCD" })}"> </span><span style="${ssrRenderStyle({ "color": "#89DDFF", "font-style": "italic" })}">from</span><span style="${ssrRenderStyle({ "color": "#A6ACCD" })}"> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&#39;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}">vue</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&#39;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#89DDFF", "font-style": "italic" })}">import</span><span style="${ssrRenderStyle({ "color": "#A6ACCD" })}"> VueDiod </span><span style="${ssrRenderStyle({ "color": "#89DDFF", "font-style": "italic" })}">from</span><span style="${ssrRenderStyle({ "color": "#A6ACCD" })}"> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&#39;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}">vue-diod</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&#39;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">;</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#89DDFF", "font-style": "italic" })}">import</span><span style="${ssrRenderStyle({ "color": "#A6ACCD" })}"> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">{</span><span style="${ssrRenderStyle({ "color": "#F07178" })}"> </span><span style="${ssrRenderStyle({ "color": "#A6ACCD" })}">AbstractCounter</span><span style="${ssrRenderStyle({ "color": "#F07178" })}"> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">}</span><span style="${ssrRenderStyle({ "color": "#A6ACCD" })}"> </span><span style="${ssrRenderStyle({ "color": "#89DDFF", "font-style": "italic" })}">from</span><span style="${ssrRenderStyle({ "color": "#A6ACCD" })}"> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&#39;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}">./counter.abstract</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&#39;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#89DDFF", "font-style": "italic" })}">import</span><span style="${ssrRenderStyle({ "color": "#A6ACCD" })}"> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">{</span><span style="${ssrRenderStyle({ "color": "#F07178" })}"> </span><span style="${ssrRenderStyle({ "color": "#A6ACCD" })}">CounterByOne</span><span style="${ssrRenderStyle({ "color": "#F07178" })}"> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">}</span><span style="${ssrRenderStyle({ "color": "#A6ACCD" })}"> </span><span style="${ssrRenderStyle({ "color": "#89DDFF", "font-style": "italic" })}">from</span><span style="${ssrRenderStyle({ "color": "#A6ACCD" })}"> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&#39;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}">./counter-by-one.service</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&#39;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">;</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#89DDFF", "font-style": "italic" })}">import</span><span style="${ssrRenderStyle({ "color": "#A6ACCD" })}"> App </span><span style="${ssrRenderStyle({ "color": "#89DDFF", "font-style": "italic" })}">from</span><span style="${ssrRenderStyle({ "color": "#A6ACCD" })}"> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&#39;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}">./App.vue</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&#39;</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">;</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#C792EA" })}">const</span><span style="${ssrRenderStyle({ "color": "#A6ACCD" })}"> app </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">=</span><span style="${ssrRenderStyle({ "color": "#A6ACCD" })}"> </span><span style="${ssrRenderStyle({ "color": "#82AAFF" })}">createApp</span><span style="${ssrRenderStyle({ "color": "#A6ACCD" })}">(App)</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#A6ACCD" })}">app</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">.</span><span style="${ssrRenderStyle({ "color": "#82AAFF" })}">use</span><span style="${ssrRenderStyle({ "color": "#A6ACCD" })}">(VueDiod</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">,</span><span style="${ssrRenderStyle({ "color": "#A6ACCD" })}"> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">{</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#A6ACCD" })}">  </span><span style="${ssrRenderStyle({ "color": "#F07178" })}">injectables</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">:</span><span style="${ssrRenderStyle({ "color": "#A6ACCD" })}"> [</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#A6ACCD" })}">    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">{</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">      </span><span style="${ssrRenderStyle({ "color": "#676E95", "font-style": "italic" })}">// Registers our abstract class as &#39;key&#39; for...</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#A6ACCD" })}">      </span><span style="${ssrRenderStyle({ "color": "#F07178" })}">register</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">:</span><span style="${ssrRenderStyle({ "color": "#A6ACCD" })}"> AbstractCounter</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">,</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">      </span><span style="${ssrRenderStyle({ "color": "#676E95", "font-style": "italic" })}">// ... our implementation.</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#A6ACCD" })}">      </span><span style="${ssrRenderStyle({ "color": "#F07178" })}">use</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">:</span><span style="${ssrRenderStyle({ "color": "#A6ACCD" })}"> CounterByOne</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#A6ACCD" })}">    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">},</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#A6ACCD" })}">  ]</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">}</span><span style="${ssrRenderStyle({ "color": "#A6ACCD" })}">)</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">;</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#A6ACCD" })}">app</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">.</span><span style="${ssrRenderStyle({ "color": "#82AAFF" })}">mount</span><span style="${ssrRenderStyle({ "color": "#A6ACCD" })}">(</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&#39;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}">#app</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&#39;</span><span style="${ssrRenderStyle({ "color": "#A6ACCD" })}">)</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br></div></div><h2 id="component" tabindex="-1">Component <a class="header-anchor" href="#component" aria-hidden="true">#</a></h2><h2 id="result" tabindex="-1">Result <a class="header-anchor" href="#result" aria-hidden="true">#</a></h2><div style="${ssrRenderStyle({ "width": "100%", "display": "flex", "justify-content": "center", "margin": "4rem 0" })}">`);
      _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("examples/custom-logger.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  __pageData,
  _sfc_main as default
};
