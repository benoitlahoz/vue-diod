import{_ as a,o as e,c as l,a as s,b as p,t as o,d as t}from"./app.ba1d7daa.js";let m=JSON.parse('{"title":"VueDiodBuilder","description":"","frontmatter":{"title":"VueDiodBuilder"},"headers":[{"level":2,"title":"Bootstrap from Plugin","slug":"bootstrap-from-plugin","link":"#bootstrap-from-plugin","children":[{"level":3,"title":"provide","slug":"provide","link":"#provide","children":[]}]},{"level":2,"title":"Create in Component","slug":"create-in-component","link":"#create-in-component","children":[]}],"relativePath":"composable-and-builder/builder.md"}'),r={name:"composable-and-builder/builder.md"},c={id:"frontmatter-title",tabindex:"-1"},i=s("a",{class:"header-anchor",href:"#frontmatter-title","aria-hidden":"true"},"#",-1),d=t(`<p><code>VueDiodBuilder</code> is the central object in Vue DIOD. Basically, it is a wrapper around DIOD&#39;s builder, but it&#39;s also the place where registered dependencies are bound to Vue.js <code>provide/inject</code> methods.</p><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>Check the <a href="./../getting-started/configuration">configuration</a> section to read how to configure the plugin for Vue injection of your dependencies.</p></div><h2 id="bootstrap-from-plugin" tabindex="-1">Bootstrap from Plugin <a class="header-anchor" href="#bootstrap-from-plugin" aria-hidden="true">#</a></h2><p>When bootstrapping our application with <code>app.use(VueDiod, { ... })</code> Vue DIOD&#39;s plugin creates a new builder and cache it in a private helper for further use.</p><p>This instance of VueDiodBuilder creates a dependencies container thanks to DIOD, and setup app provided keys on top of the registered classes.</p><div class="language-typescript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#676E95;font-style:italic;">// VueDiodBuilder provides a function that call DIOD&#39;s container &#39;get&#39;.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">app</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">provide</span><span style="color:#A6ACCD;">(Key </span><span style="color:#89DDFF;font-style:italic;">as</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">InjectionKey</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">Abstract</span><span style="color:#89DDFF;">&lt;typeof</span><span style="color:#A6ACCD;"> Key</span><span style="color:#89DDFF;">&gt;&gt;,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">_container</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">get</span><span style="color:#A6ACCD;">(service</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">register)</span></span>
<span class="line"><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h3 id="provide" tabindex="-1">provide <a class="header-anchor" href="#provide" aria-hidden="true">#</a></h3><p>The <code>VueDiodBuilder</code> handles all DIOD&#39;s functionalities (scopes, tags, ...) and offers ways to call them from Vue components with Vue&#39;s <code>inject</code> method.</p><p>These bindings sometimes require conventions. An example is the <code>tag</code> option of our configuration object.</p><p>Tagged services must be prefixed to be found when calling Vue&#39;s <code>inject</code> method. The default prefix is... <code>tag</code>, that make possible to call tagged services <em>via</em><code>ìnject(&#39;tag:my.super.tag&#39;)</code>. Vue DIOD allows to customize the prefix with <code>tagPrefix</code> global option in builder&#39;s configuration.</p><p>At another level: It has to be noted that VueDiodBuilder&#39;s <code>provide</code> bindings don&#39;t return the instance itself but, instead, return a function to get it. By this way, we can rely on DIOD&#39;s scopes features to get what we configured: singleton, transient or per-request instance of our dependency.</p><h2 id="create-in-component" tabindex="-1">Create in Component <a class="header-anchor" href="#create-in-component" aria-hidden="true">#</a></h2><p>New <code>VueDiodBuilder</code> instances can be created at component level or in custom composables.</p><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>See <a href="./../examples/parent-child">Parent → Child</a> for an example.</p></div><p>The way to bootstrap the container is the same as at global level, but we have to pass the current instance of the component we&#39;re creating the builder in.</p><div class="language-typescript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">getCurrentInstance</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">vue</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// Creates a new builder.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> builder </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">VueDiodBuilder</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// Get instance of &#39;this&#39; component.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> self </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">getCurrentInstance</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// Bootstraps the builder we just created,</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// as in global plugin&#39;s configuration</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// but on the component&#39;s instance.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">builder</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">bootstrap</span><span style="color:#A6ACCD;">(self</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">injectables</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> [</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">register</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> AbstractCounter</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// This is what the children are waiting for.</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">use</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> Counter</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// This is what they will receive actually.</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">  ]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><p>Here, we&#39;re using the Vue&#39;s method <code>getCurrentInstance</code> to call <code>provide</code> on it.</p><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p><code>getCurrentInstance</code> seems to be a &#39;private&#39; method in Vue. It is possible that we&#39;ll have to replace it in a next release to get the actual instance.</p></div><p>To handle this Vue DIOD relies on a kind of <strong>ugly hack</strong>, by <strong>munging</strong> the Vue&#39;s <code>ComponentInternalInstance</code> to add a <code>provide</code> function that add entries to its <code>provides</code> (note the &#39;s&#39;) object.</p><div class="language-typescript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">component</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">provide</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> (</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#A6ACCD;font-style:italic;">key</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">InjectionKey</span><span style="color:#89DDFF;">&lt;()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">unknown</span><span style="color:#89DDFF;">&gt;,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#82AAFF;">value</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">unknown</span></span>
<span class="line"><span style="color:#A6ACCD;">) </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">component</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">provides</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">...</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">component</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">provides</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">||</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{}</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">    [</span><span style="color:#A6ACCD;">key</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;font-style:italic;">as</span><span style="color:#F07178;"> </span><span style="color:#FFCB6B;">any</span><span style="color:#F07178;">]</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">value</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">};</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>But, once this is done, any child component can check if a dependency is provided by using <code>isProvided</code> method of <code>useVueDiod</code> composable with the registered identifier (abstract class) as key.</p><div class="language-typescript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> exists </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">isProvided</span><span style="color:#A6ACCD;">(AbstractCounter)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div>`,22);function y(n,D,u,F,C,b){return e(),l("div",null,[s("h1",c,[p(o(n.$frontmatter.title)+" ",1),i]),d])}let h=a(r,[["render",y]]);export{m as __pageData,h as default};