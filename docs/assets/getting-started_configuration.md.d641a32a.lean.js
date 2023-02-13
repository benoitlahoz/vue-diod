import{_ as o,o as p,c,a as s,b as n,t as r,f as a,d as t,g as i}from"./app.a206e789.js";const ls=JSON.parse('{"title":"Configuration","description":"","frontmatter":{"title":"Configuration"},"headers":[{"level":2,"title":"Plugin","slug":"plugin","link":"#plugin","children":[]},{"level":2,"title":"Injectables","slug":"injectables","link":"#injectables","children":[]},{"level":2,"title":"Scope","slug":"scope-1","link":"#scope-1","children":[]},{"level":2,"title":"Types","slug":"types","link":"#types","children":[]}],"relativePath":"getting-started/configuration.md"}'),y={name:"getting-started/configuration.md"},d={id:"frontmatter-title",tabindex:"-1"},u=s("a",{class:"header-anchor",href:"#frontmatter-title","aria-hidden":"true"},"#",-1),b=t("",6),h={id:"dependencies",tabindex:"-1"},D=s("a",{class:"header-anchor",href:"#dependencies","aria-hidden":"true"},"#",-1),F=s("table",null,[s("thead",null,[s("tr",null,[s("th",null,"Type"),s("th",{style:{"text-align":"left"}},"Usage"),s("th",{style:{"text-align":"center"}},"Default")])]),s("tbody",null,[s("tr",null,[s("td",null,"Array<Abstract<unknown>>"),s("td",{style:{"text-align":"left"}},"Manually set dependencies for service (disables autowire)"),s("td",{style:{"text-align":"center"}},[s("code",null,"undefined")])])])],-1),f={id:"private",tabindex:"-1"},g=s("a",{class:"header-anchor",href:"#private","aria-hidden":"true"},"#",-1),C=t("",1),A={id:"register",tabindex:"-1"},_=s("a",{class:"header-anchor",href:"#register","aria-hidden":"true"},"#",-1),m=s("table",null,[s("thead",null,[s("tr",null,[s("th",null,"Type"),s("th",{style:{"text-align":"left"}},"Usage"),s("th",{style:{"text-align":"center"}},"Default")])]),s("tbody",null,[s("tr",null,[s("td",null,"Newable<unknown> | Abstract<unknown>"),s("td",{style:{"text-align":"left"}},"Register the abstract / concrete class as a dependency key"),s("td",{style:{"text-align":"center"}},[s("code",null,"undefined")])])])],-1),x={id:"scope",tabindex:"-1"},E=s("a",{class:"header-anchor",href:"#scope","aria-hidden":"true"},"#",-1),T=t("",1),B={id:"tag",tabindex:"-1"},v=s("a",{class:"header-anchor",href:"#tag","aria-hidden":"true"},"#",-1),w=t("",1),I={id:"token",tabindex:"-1"},k=s("a",{class:"header-anchor",href:"#token","aria-hidden":"true"},"#",-1),S=t("",1),V={id:"use",tabindex:"-1"},j=s("a",{class:"header-anchor",href:"#use","aria-hidden":"true"},"#",-1),P=s("table",null,[s("thead",null,[s("tr",null,[s("th",null,"Type"),s("th",{style:{"text-align":"left"}},"Usage"),s("th",{style:{"text-align":"center"}},"Default")])]),s("tbody",null,[s("tr",null,[s("td",null,"Newable<unknown>"),s("td",{style:{"text-align":"left"}},"Use the concrete service class for registered class."),s("td",{style:{"text-align":"center"}},[s("code",null,"undefined")])])])],-1),N={id:"useinstance",tabindex:"-1"},q=s("a",{class:"header-anchor",href:"#useinstance","aria-hidden":"true"},"#",-1),U=s("table",null,[s("thead",null,[s("tr",null,[s("th",null,"Type"),s("th",{style:{"text-align":"left"}},"Usage"),s("th",{style:{"text-align":"center"}},"Default")])]),s("tbody",null,[s("tr",null,[s("td",null,"Instance<unknown>"),s("td",{style:{"text-align":"left"}},"Use an already instantiated object."),s("td",{style:{"text-align":"center"}},[s("code",null,"undefined")])])])],-1),R={id:"usefactory",tabindex:"-1"},O=s("a",{class:"header-anchor",href:"#usefactory","aria-hidden":"true"},"#",-1),$=s("table",null,[s("thead",null,[s("tr",null,[s("th",null,"Type"),s("th",{style:{"text-align":"left"}},"Usage"),s("th",{style:{"text-align":"center"}},"Default")])]),s("tbody",null,[s("tr",null,[s("td",null,"Factory<unknown>"),s("td",{style:{"text-align":"left"}},"Use a factory to create the object."),s("td",{style:{"text-align":"center"}},[s("code",null,"undefined")])])])],-1),M={id:"vue",tabindex:"-1"},W=s("a",{class:"header-anchor",href:"#vue","aria-hidden":"true"},"#",-1),z=t("",6),J=s("thead",null,[s("tr",null,[s("th",null,"Property"),s("th",{style:{"text-align":"center"}},"Value"),s("th",{style:{"text-align":"left"}},"Returns")])],-1),G=s("tr",null,[s("td",null,[s("strong",null,"Request")]),s("td",{style:{"text-align":"center"}},[s("code",null,"'vue-diod:request'")]),s("td",{style:{"text-align":"left"}},"A single instance within the same request.")],-1),H=s("tr",null,[s("td",null,[s("strong",null,"Singleton")]),s("td",{style:{"text-align":"center"}},[s("code",null,"'vue-diod:singleton'")]),s("td",{style:{"text-align":"left"}},"A single instance.")],-1),K=s("strong",null,"Transient",-1),L=s("td",{style:{"text-align":"center"}},[s("code",null,"'vue-diod:transient'")],-1),Q=s("td",{style:{"text-align":"left"}},"A new instance.",-1),X=t("",2);function Y(l,Z,ss,ns,es,as){const e=i("badge");return p(),c("div",null,[s("h1",d,[n(r(l.$frontmatter.title)+" ",1),u]),b,s("h4",h,[n("dependencies "),a(e,{type:"info",text:"optional"}),n(),D]),F,s("h4",f,[n("private "),a(e,{type:"info",text:"optional"}),n(),g]),C,s("h4",A,[n("register "),a(e,{type:"danger",text:"required"}),n(),_]),m,s("h4",x,[n("scope "),a(e,{type:"info",text:"optional"}),n(),E]),T,s("h4",B,[n("tag "),a(e,{type:"info",text:"optional"}),n(),v]),w,s("h4",I,[n("token "),a(e,{type:"info",text:"optional"}),n(),k]),S,s("h4",V,[n("use "),a(e,{type:"warning",text:"one of"}),n(),j]),P,s("h4",N,[n("useInstance "),a(e,{type:"warning",text:"one of"}),n(),q]),U,s("h4",R,[n("useFactory "),a(e,{type:"warning",text:"one of"}),n(),O]),$,s("h4",M,[n("vue "),a(e,{type:"info",text:"optional"}),n(),W]),z,s("table",null,[J,s("tbody",null,[G,H,s("tr",null,[s("td",null,[K,n(),a(e,{type:"info",text:"default"})]),L,Q])])]),X])}const os=o(y,[["render",Y]]);export{ls as __pageData,os as default};