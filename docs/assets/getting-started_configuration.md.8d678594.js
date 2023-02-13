import { _ as _export_sfc, o as openBlock, c as createElementBlock, b as createBaseVNode, f as createTextVNode, t as toDisplayString, a as createVNode, g as createStaticVNode, i as resolveComponent } from "./app.1154be72.js";
const __pageData = JSON.parse('{"title":"Configuration","description":"","frontmatter":{"title":"Configuration"},"headers":[{"level":2,"title":"Plugin","slug":"plugin","link":"#plugin","children":[]},{"level":2,"title":"Injectables","slug":"injectables","link":"#injectables","children":[]},{"level":2,"title":"Scope","slug":"scope-1","link":"#scope-1","children":[]},{"level":2,"title":"Types","slug":"types","link":"#types","children":[]}],"relativePath":"getting-started/configuration.md"}');
const _sfc_main = { name: "getting-started/configuration.md" };
const _hoisted_1 = {
  id: "frontmatter-title",
  tabindex: "-1"
};
const _hoisted_2 = /* @__PURE__ */ createBaseVNode("a", {
  class: "header-anchor",
  href: "#frontmatter-title",
  "aria-hidden": "true"
}, "#", -1);
const _hoisted_3 = /* @__PURE__ */ createStaticVNode('<h2 id="plugin" tabindex="-1">Plugin <a class="header-anchor" href="#plugin" aria-hidden="true">#</a></h2><p>When we want to use Vue DIOD globally with Vue&#39;s <code>use</code>, we have to pass it a configuration object with the following properties.</p><table><thead><tr><th>Property</th><th style="text-align:center;">Type</th><th style="text-align:left;">Usage</th><th style="text-align:center;">Required</th><th style="text-align:right;">Default</th></tr></thead><tbody><tr><td><strong>injectables</strong></td><td style="text-align:center;">Array&lt;VueDiodInjectable&gt;</td><td style="text-align:left;"><a href="./configuration#injectables">See below</a></td><td style="text-align:center;">true</td><td style="text-align:right;"><code>undefined</code></td></tr><tr><td><strong>autowire</strong></td><td style="text-align:center;">boolean</td><td style="text-align:left;">Toggle <em>autowire</em></td><td style="text-align:center;">false</td><td style="text-align:right;"><code>true</code></td></tr><tr><td><strong>tagPrefix</strong></td><td style="text-align:center;">string</td><td style="text-align:left;">The prefix used to get tagged dependencies</td><td style="text-align:center;">false</td><td style="text-align:right;"><code>&#39;tag&#39;</code></td></tr><tr><td><strong>vue</strong></td><td style="text-align:center;">boolean</td><td style="text-align:left;">Inject classes in Vue.js via the <code>provide</code> method.</td><td style="text-align:center;">false</td><td style="text-align:right;"><code>true</code></td></tr></tbody></table><div class="info custom-block"><p class="custom-block-title">DIOD</p><p>The <code>vue</code> plugin option is provided as a helper. In the case we pass it <code>false</code> we could simply use <strong>DIOD</strong>.</p></div><h2 id="injectables" tabindex="-1">Injectables <a class="header-anchor" href="#injectables" aria-hidden="true">#</a></h2><p>The <code>injectables</code> property is an <code>Array</code> of <code>VueDiodInjectable</code> objects.</p>', 6);
const _hoisted_9 = {
  id: "dependencies",
  tabindex: "-1"
};
const _hoisted_10 = /* @__PURE__ */ createBaseVNode("a", {
  class: "header-anchor",
  href: "#dependencies",
  "aria-hidden": "true"
}, "#", -1);
const _hoisted_11 = /* @__PURE__ */ createBaseVNode("table", null, [
  /* @__PURE__ */ createBaseVNode("thead", null, [
    /* @__PURE__ */ createBaseVNode("tr", null, [
      /* @__PURE__ */ createBaseVNode("th", null, "Type"),
      /* @__PURE__ */ createBaseVNode("th", { style: { "text-align": "left" } }, "Usage"),
      /* @__PURE__ */ createBaseVNode("th", { style: { "text-align": "center" } }, "Default")
    ])
  ]),
  /* @__PURE__ */ createBaseVNode("tbody", null, [
    /* @__PURE__ */ createBaseVNode("tr", null, [
      /* @__PURE__ */ createBaseVNode("td", null, "Array<Abstract<unknown>>"),
      /* @__PURE__ */ createBaseVNode("td", { style: { "text-align": "left" } }, "Manually set dependencies for service (disables autowire)"),
      /* @__PURE__ */ createBaseVNode("td", { style: { "text-align": "center" } }, [
        /* @__PURE__ */ createBaseVNode("code", null, "undefined")
      ])
    ])
  ])
], -1);
const _hoisted_12 = {
  id: "private",
  tabindex: "-1"
};
const _hoisted_13 = /* @__PURE__ */ createBaseVNode("a", {
  class: "header-anchor",
  href: "#private",
  "aria-hidden": "true"
}, "#", -1);
const _hoisted_14 = /* @__PURE__ */ createStaticVNode('<table><thead><tr><th>Type</th><th style="text-align:left;">Usage</th><th style="text-align:center;">Default</th></tr></thead><tbody><tr><td>boolean</td><td style="text-align:left;">Set the service as private, so user <strong>can&#39;t</strong> get it directly from the container.</td><td style="text-align:center;"><code>undefined</code></td></tr></tbody></table>', 1);
const _hoisted_15 = {
  id: "register",
  tabindex: "-1"
};
const _hoisted_16 = /* @__PURE__ */ createBaseVNode("a", {
  class: "header-anchor",
  href: "#register",
  "aria-hidden": "true"
}, "#", -1);
const _hoisted_17 = /* @__PURE__ */ createBaseVNode("table", null, [
  /* @__PURE__ */ createBaseVNode("thead", null, [
    /* @__PURE__ */ createBaseVNode("tr", null, [
      /* @__PURE__ */ createBaseVNode("th", null, "Type"),
      /* @__PURE__ */ createBaseVNode("th", { style: { "text-align": "left" } }, "Usage"),
      /* @__PURE__ */ createBaseVNode("th", { style: { "text-align": "center" } }, "Default")
    ])
  ]),
  /* @__PURE__ */ createBaseVNode("tbody", null, [
    /* @__PURE__ */ createBaseVNode("tr", null, [
      /* @__PURE__ */ createBaseVNode("td", null, "Newable<unknown> | Abstract<unknown>"),
      /* @__PURE__ */ createBaseVNode("td", { style: { "text-align": "left" } }, "Register the abstract / concrete class as a dependency key"),
      /* @__PURE__ */ createBaseVNode("td", { style: { "text-align": "center" } }, [
        /* @__PURE__ */ createBaseVNode("code", null, "undefined")
      ])
    ])
  ])
], -1);
const _hoisted_18 = {
  id: "scope",
  tabindex: "-1"
};
const _hoisted_19 = /* @__PURE__ */ createBaseVNode("a", {
  class: "header-anchor",
  href: "#scope",
  "aria-hidden": "true"
}, "#", -1);
const _hoisted_20 = /* @__PURE__ */ createStaticVNode('<table><thead><tr><th>Type</th><th style="text-align:left;">Usage</th><th>Default</th></tr></thead><tbody><tr><td>VuozDiodScope</td><td style="text-align:left;">Set the scope for the dependency (<a href="./configuration#scope-1">See below</a>)</td><td><code>VueDiodScope.Transient</code></td></tr></tbody></table>', 1);
const _hoisted_21 = {
  id: "tag",
  tabindex: "-1"
};
const _hoisted_22 = /* @__PURE__ */ createBaseVNode("a", {
  class: "header-anchor",
  href: "#tag",
  "aria-hidden": "true"
}, "#", -1);
const _hoisted_23 = /* @__PURE__ */ createStaticVNode('<table><thead><tr><th>Type</th><th style="text-align:left;">Usage</th><th>Default</th></tr></thead><tbody><tr><td>string</td><td style="text-align:left;">Tag the service, it can then be found via its tag with other services tagged with the same string. In components, tagged services can be injected with the <a href="./configuration#plugin"><code>tagPrefix</code></a> (e.g. <code>inject(&#39;tag:myTag&#39;)</code>).</td><td><code>undefined</code></td></tr></tbody></table>', 1);
const _hoisted_24 = {
  id: "token",
  tabindex: "-1"
};
const _hoisted_25 = /* @__PURE__ */ createBaseVNode("a", {
  class: "header-anchor",
  href: "#token",
  "aria-hidden": "true"
}, "#", -1);
const _hoisted_26 = /* @__PURE__ */ createStaticVNode('<table><thead><tr><th>Type</th><th style="text-align:left;">Usage</th><th>Default</th></tr></thead><tbody><tr><td>boolean | string | symbol</td><td style="text-align:left;">A token to find dependency in Vue&#39;s <code>inject</code>. If set to <code>true</code> the token will be set to the registered class name (e.g. <code>&#39;AbstractClass&#39;</code>).</td><td><code>undefined</code></td></tr></tbody></table>', 1);
const _hoisted_27 = {
  id: "use",
  tabindex: "-1"
};
const _hoisted_28 = /* @__PURE__ */ createBaseVNode("a", {
  class: "header-anchor",
  href: "#use",
  "aria-hidden": "true"
}, "#", -1);
const _hoisted_29 = /* @__PURE__ */ createBaseVNode("table", null, [
  /* @__PURE__ */ createBaseVNode("thead", null, [
    /* @__PURE__ */ createBaseVNode("tr", null, [
      /* @__PURE__ */ createBaseVNode("th", null, "Type"),
      /* @__PURE__ */ createBaseVNode("th", { style: { "text-align": "left" } }, "Usage"),
      /* @__PURE__ */ createBaseVNode("th", { style: { "text-align": "center" } }, "Default")
    ])
  ]),
  /* @__PURE__ */ createBaseVNode("tbody", null, [
    /* @__PURE__ */ createBaseVNode("tr", null, [
      /* @__PURE__ */ createBaseVNode("td", null, "Newable<unknown>"),
      /* @__PURE__ */ createBaseVNode("td", { style: { "text-align": "left" } }, "Use the concrete service class for registered class."),
      /* @__PURE__ */ createBaseVNode("td", { style: { "text-align": "center" } }, [
        /* @__PURE__ */ createBaseVNode("code", null, "undefined")
      ])
    ])
  ])
], -1);
const _hoisted_30 = {
  id: "useinstance",
  tabindex: "-1"
};
const _hoisted_31 = /* @__PURE__ */ createBaseVNode("a", {
  class: "header-anchor",
  href: "#useinstance",
  "aria-hidden": "true"
}, "#", -1);
const _hoisted_32 = /* @__PURE__ */ createBaseVNode("table", null, [
  /* @__PURE__ */ createBaseVNode("thead", null, [
    /* @__PURE__ */ createBaseVNode("tr", null, [
      /* @__PURE__ */ createBaseVNode("th", null, "Type"),
      /* @__PURE__ */ createBaseVNode("th", { style: { "text-align": "left" } }, "Usage"),
      /* @__PURE__ */ createBaseVNode("th", { style: { "text-align": "center" } }, "Default")
    ])
  ]),
  /* @__PURE__ */ createBaseVNode("tbody", null, [
    /* @__PURE__ */ createBaseVNode("tr", null, [
      /* @__PURE__ */ createBaseVNode("td", null, "Instance<unknown>"),
      /* @__PURE__ */ createBaseVNode("td", { style: { "text-align": "left" } }, "Use an already instantiated object."),
      /* @__PURE__ */ createBaseVNode("td", { style: { "text-align": "center" } }, [
        /* @__PURE__ */ createBaseVNode("code", null, "undefined")
      ])
    ])
  ])
], -1);
const _hoisted_33 = {
  id: "usefactory",
  tabindex: "-1"
};
const _hoisted_34 = /* @__PURE__ */ createBaseVNode("a", {
  class: "header-anchor",
  href: "#usefactory",
  "aria-hidden": "true"
}, "#", -1);
const _hoisted_35 = /* @__PURE__ */ createBaseVNode("table", null, [
  /* @__PURE__ */ createBaseVNode("thead", null, [
    /* @__PURE__ */ createBaseVNode("tr", null, [
      /* @__PURE__ */ createBaseVNode("th", null, "Type"),
      /* @__PURE__ */ createBaseVNode("th", { style: { "text-align": "left" } }, "Usage"),
      /* @__PURE__ */ createBaseVNode("th", { style: { "text-align": "center" } }, "Default")
    ])
  ]),
  /* @__PURE__ */ createBaseVNode("tbody", null, [
    /* @__PURE__ */ createBaseVNode("tr", null, [
      /* @__PURE__ */ createBaseVNode("td", null, "Factory<unknown>"),
      /* @__PURE__ */ createBaseVNode("td", { style: { "text-align": "left" } }, "Use a factory to create the object."),
      /* @__PURE__ */ createBaseVNode("td", { style: { "text-align": "center" } }, [
        /* @__PURE__ */ createBaseVNode("code", null, "undefined")
      ])
    ])
  ])
], -1);
const _hoisted_36 = {
  id: "vue",
  tabindex: "-1"
};
const _hoisted_37 = /* @__PURE__ */ createBaseVNode("a", {
  class: "header-anchor",
  href: "#vue",
  "aria-hidden": "true"
}, "#", -1);
const _hoisted_38 = /* @__PURE__ */ createStaticVNode('<table><thead><tr><th>Type</th><th style="text-align:left;">Usage</th><th style="text-align:center;">Default</th></tr></thead><tbody><tr><td>boolean</td><td style="text-align:left;">Inject the dependencies with Vue.js <code>provide</code>.</td><td style="text-align:center;"><code>true</code></td></tr></tbody></table><div class="warning custom-block"><p class="custom-block-title">ONE OF</p><p><code>use</code>, <code>useInstance</code>and <code>useFactory</code>are mutually exclusive. Their presence is checked in this order:</p><ul><li><code>use</code></li><li><code>useFactory</code></li><li><code>useInstance</code></li></ul></div><h2 id="scope-1" tabindex="-1">Scope <a class="header-anchor" href="#scope-1" aria-hidden="true">#</a></h2><p>From <strong>DIOD</strong> documentation:</p><blockquote><p>Instance scope determines how an instance is shared between requests for the same service. When a request is made for a service, DIOD can return a new instance (transient) which is the default behaviour, a single instance (singleton) or a single instance within the same request (request).</p></blockquote><blockquote><p>This applies to instances returned from an explicit container.get(/* */) call as well as instances created internally by the container to satisfy the dependencies of another service.</p></blockquote>', 6);
const _hoisted_44 = /* @__PURE__ */ createBaseVNode("thead", null, [
  /* @__PURE__ */ createBaseVNode("tr", null, [
    /* @__PURE__ */ createBaseVNode("th", null, "Property"),
    /* @__PURE__ */ createBaseVNode("th", { style: { "text-align": "center" } }, "Value"),
    /* @__PURE__ */ createBaseVNode("th", { style: { "text-align": "left" } }, "Returns")
  ])
], -1);
const _hoisted_45 = /* @__PURE__ */ createBaseVNode("tr", null, [
  /* @__PURE__ */ createBaseVNode("td", null, [
    /* @__PURE__ */ createBaseVNode("strong", null, "Request")
  ]),
  /* @__PURE__ */ createBaseVNode("td", { style: { "text-align": "center" } }, [
    /* @__PURE__ */ createBaseVNode("code", null, "'vue-diod:request'")
  ]),
  /* @__PURE__ */ createBaseVNode("td", { style: { "text-align": "left" } }, "A single instance within the same request.")
], -1);
const _hoisted_46 = /* @__PURE__ */ createBaseVNode("tr", null, [
  /* @__PURE__ */ createBaseVNode("td", null, [
    /* @__PURE__ */ createBaseVNode("strong", null, "Singleton")
  ]),
  /* @__PURE__ */ createBaseVNode("td", { style: { "text-align": "center" } }, [
    /* @__PURE__ */ createBaseVNode("code", null, "'vue-diod:singleton'")
  ]),
  /* @__PURE__ */ createBaseVNode("td", { style: { "text-align": "left" } }, "A single instance.")
], -1);
const _hoisted_47 = /* @__PURE__ */ createBaseVNode("strong", null, "Transient", -1);
const _hoisted_48 = /* @__PURE__ */ createBaseVNode("td", { style: { "text-align": "center" } }, [
  /* @__PURE__ */ createBaseVNode("code", null, "'vue-diod:transient'")
], -1);
const _hoisted_49 = /* @__PURE__ */ createBaseVNode("td", { style: { "text-align": "left" } }, "A new instance.", -1);
const _hoisted_50 = /* @__PURE__ */ createStaticVNode('<h2 id="types" tabindex="-1">Types <a class="header-anchor" href="#types" aria-hidden="true">#</a></h2><div class="language-typescript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">type</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">Newable</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">Abstract</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">Instance</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">Factory</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">diod</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#676E95;font-style:italic;">/**</span></span>\n<span class="line"><span style="color:#676E95;font-style:italic;"> * The plugin options.</span></span>\n<span class="line"><span style="color:#676E95;font-style:italic;"> */</span></span>\n<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">VueDiodConfiguration</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">autowire</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">boolean</span><span style="color:#89DDFF;">;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">injectables</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Array</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">VueDiodInjectable</span><span style="color:#89DDFF;">&gt;;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">tagPrefix</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">vue</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">boolean</span><span style="color:#89DDFF;">;</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#676E95;font-style:italic;">/**</span></span>\n<span class="line"><span style="color:#676E95;font-style:italic;"> * Scope of the instance returned by DIOD container.</span></span>\n<span class="line"><span style="color:#676E95;font-style:italic;"> * </span><span style="color:#89DDFF;font-style:italic;">@</span><span style="color:#C792EA;font-style:italic;">see</span><span style="color:#676E95;font-style:italic;"> </span><span style="color:#A6ACCD;font-style:italic;">https://github.com/artberri/diod/blob/main/docs/scope.md</span></span>\n<span class="line"><span style="color:#676E95;font-style:italic;"> */</span></span>\n<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">enum</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">VueDiodScope</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  Request </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">vue-diod:request</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#A6ACCD;">  Singleton </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">vue-diod:singleton</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#A6ACCD;">  Transient </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">vue-diod:transient</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#676E95;font-style:italic;">/**</span></span>\n<span class="line"><span style="color:#676E95;font-style:italic;"> * The definition of a couple abstraction / service to be</span></span>\n<span class="line"><span style="color:#676E95;font-style:italic;"> * injected through DIOD.</span></span>\n<span class="line"><span style="color:#676E95;font-style:italic;"> */</span></span>\n<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">VueDiodInjectable</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;">/**</span></span>\n<span class="line"><span style="color:#676E95;font-style:italic;">   * Disable autowiring by passing dependencies.</span></span>\n<span class="line"><span style="color:#676E95;font-style:italic;">   * </span><span style="color:#89DDFF;font-style:italic;">@</span><span style="color:#C792EA;font-style:italic;">see</span><span style="color:#676E95;font-style:italic;"> </span><span style="color:#A6ACCD;font-style:italic;">https://github.com/artberri/diod/blob/main/docs/disable-autowire.md</span></span>\n<span class="line"><span style="color:#676E95;font-style:italic;">   */</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">dependencies</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Array</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">Abstract</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">unknown</span><span style="color:#89DDFF;">&gt;&gt;;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;">/**</span></span>\n<span class="line"><span style="color:#676E95;font-style:italic;">   * Mark the dependency as private: It will not be callable by the container,</span></span>\n<span class="line"><span style="color:#676E95;font-style:italic;">   * thus not injected in Vue via &#39;provide&#39; method, but will serve only as</span></span>\n<span class="line"><span style="color:#676E95;font-style:italic;">   * dependency for other injected classes.</span></span>\n<span class="line"><span style="color:#676E95;font-style:italic;">   */</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">private</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">boolean</span><span style="color:#89DDFF;">;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;">/**</span></span>\n<span class="line"><span style="color:#676E95;font-style:italic;">   * The abstraction or concrete implementation</span></span>\n<span class="line"><span style="color:#676E95;font-style:italic;">   * to pass to Diod to register a service.</span></span>\n<span class="line"><span style="color:#676E95;font-style:italic;">   */</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">register</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Newable</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">unknown</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Abstract</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">unknown</span><span style="color:#89DDFF;">&gt;;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;">/**</span></span>\n<span class="line"><span style="color:#676E95;font-style:italic;">   * Scope of the dependency.</span></span>\n<span class="line"><span style="color:#676E95;font-style:italic;">   */</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">scope</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">VueDiodScope</span><span style="color:#89DDFF;">;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;">/**</span></span>\n<span class="line"><span style="color:#676E95;font-style:italic;">   * Tag for the dependency.</span></span>\n<span class="line"><span style="color:#676E95;font-style:italic;">   * </span><span style="color:#89DDFF;font-style:italic;">@</span><span style="color:#C792EA;font-style:italic;">see</span><span style="color:#676E95;font-style:italic;"> </span><span style="color:#A6ACCD;font-style:italic;">https://github.com/artberri/diod/blob/main/docs/tagging.md</span></span>\n<span class="line"><span style="color:#676E95;font-style:italic;">   */</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">tag</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;">/**</span></span>\n<span class="line"><span style="color:#676E95;font-style:italic;">   * Use a token to find dependency.</span></span>\n<span class="line"><span style="color:#676E95;font-style:italic;">   * In case token property is a boolean, token will be set to the</span></span>\n<span class="line"><span style="color:#676E95;font-style:italic;">   * abstract class name.</span></span>\n<span class="line"><span style="color:#676E95;font-style:italic;">   */</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">token</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">boolean</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">symbol</span><span style="color:#89DDFF;">;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;">/**</span></span>\n<span class="line"><span style="color:#676E95;font-style:italic;">   * The service implementation to use.</span></span>\n<span class="line"><span style="color:#676E95;font-style:italic;">   */</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">use</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Newable</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">unknown</span><span style="color:#89DDFF;">&gt;;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;">/**</span></span>\n<span class="line"><span style="color:#676E95;font-style:italic;">   * The instance to use as dependency.</span></span>\n<span class="line"><span style="color:#676E95;font-style:italic;">   * </span><span style="color:#89DDFF;font-style:italic;">@</span><span style="color:#C792EA;font-style:italic;">see</span><span style="color:#676E95;font-style:italic;"> </span><span style="color:#A6ACCD;font-style:italic;">https://github.com/artberri/diod/blob/main/docs/instances.md</span></span>\n<span class="line"><span style="color:#676E95;font-style:italic;">   */</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">useInstance</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Instance</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">unknown</span><span style="color:#89DDFF;">&gt;;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;">/**</span></span>\n<span class="line"><span style="color:#676E95;font-style:italic;">   * The factory function to build instance.</span></span>\n<span class="line"><span style="color:#676E95;font-style:italic;">   * </span><span style="color:#89DDFF;font-style:italic;">@</span><span style="color:#C792EA;font-style:italic;">see</span><span style="color:#676E95;font-style:italic;"> </span><span style="color:#A6ACCD;font-style:italic;">https://github.com/artberri/diod/blob/main/docs/factories.md</span></span>\n<span class="line"><span style="color:#676E95;font-style:italic;">   */</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">useFactory</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Factory</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">unknown</span><span style="color:#89DDFF;">&gt;;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;">/**</span></span>\n<span class="line"><span style="color:#676E95;font-style:italic;">   * Inject dependencies in Vue with &#39;provide&#39;.</span></span>\n<span class="line"><span style="color:#676E95;font-style:italic;">   */</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">vue</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">boolean</span><span style="color:#89DDFF;">;</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br></div></div>', 2);
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_badge = resolveComponent("badge");
  return openBlock(), createElementBlock("div", null, [
    createBaseVNode("h1", _hoisted_1, [
      createTextVNode(toDisplayString(_ctx.$frontmatter.title) + " ", 1),
      _hoisted_2
    ]),
    _hoisted_3,
    createBaseVNode("h4", _hoisted_9, [
      createTextVNode("dependencies "),
      createVNode(_component_badge, {
        type: "info",
        text: "optional"
      }),
      createTextVNode(),
      _hoisted_10
    ]),
    _hoisted_11,
    createBaseVNode("h4", _hoisted_12, [
      createTextVNode("private "),
      createVNode(_component_badge, {
        type: "info",
        text: "optional"
      }),
      createTextVNode(),
      _hoisted_13
    ]),
    _hoisted_14,
    createBaseVNode("h4", _hoisted_15, [
      createTextVNode("register "),
      createVNode(_component_badge, {
        type: "danger",
        text: "required"
      }),
      createTextVNode(),
      _hoisted_16
    ]),
    _hoisted_17,
    createBaseVNode("h4", _hoisted_18, [
      createTextVNode("scope "),
      createVNode(_component_badge, {
        type: "info",
        text: "optional"
      }),
      createTextVNode(),
      _hoisted_19
    ]),
    _hoisted_20,
    createBaseVNode("h4", _hoisted_21, [
      createTextVNode("tag "),
      createVNode(_component_badge, {
        type: "info",
        text: "optional"
      }),
      createTextVNode(),
      _hoisted_22
    ]),
    _hoisted_23,
    createBaseVNode("h4", _hoisted_24, [
      createTextVNode("token "),
      createVNode(_component_badge, {
        type: "info",
        text: "optional"
      }),
      createTextVNode(),
      _hoisted_25
    ]),
    _hoisted_26,
    createBaseVNode("h4", _hoisted_27, [
      createTextVNode("use "),
      createVNode(_component_badge, {
        type: "warning",
        text: "one of"
      }),
      createTextVNode(),
      _hoisted_28
    ]),
    _hoisted_29,
    createBaseVNode("h4", _hoisted_30, [
      createTextVNode("useInstance "),
      createVNode(_component_badge, {
        type: "warning",
        text: "one of"
      }),
      createTextVNode(),
      _hoisted_31
    ]),
    _hoisted_32,
    createBaseVNode("h4", _hoisted_33, [
      createTextVNode("useFactory "),
      createVNode(_component_badge, {
        type: "warning",
        text: "one of"
      }),
      createTextVNode(),
      _hoisted_34
    ]),
    _hoisted_35,
    createBaseVNode("h4", _hoisted_36, [
      createTextVNode("vue "),
      createVNode(_component_badge, {
        type: "info",
        text: "optional"
      }),
      createTextVNode(),
      _hoisted_37
    ]),
    _hoisted_38,
    createBaseVNode("table", null, [
      _hoisted_44,
      createBaseVNode("tbody", null, [
        _hoisted_45,
        _hoisted_46,
        createBaseVNode("tr", null, [
          createBaseVNode("td", null, [
            _hoisted_47,
            createTextVNode(),
            createVNode(_component_badge, {
              type: "info",
              text: "default"
            })
          ]),
          _hoisted_48,
          _hoisted_49
        ])
      ])
    ]),
    _hoisted_50
  ]);
}
const configuration = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  __pageData,
  configuration as default
};
