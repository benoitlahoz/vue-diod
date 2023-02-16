import{_ as o,o as p,c as r,a as s,b as n,t as c,f as a,d as t,i}from"./app.210f4970.js";let rs=JSON.parse('{"title":"Configuration","description":"","frontmatter":{"title":"Configuration"},"headers":[{"level":2,"title":"Plugin","slug":"plugin","link":"#plugin","children":[]},{"level":2,"title":"Injectables","slug":"injectables","link":"#injectables","children":[]},{"level":2,"title":"VueDiodScope","slug":"vuediodscope","link":"#vuediodscope","children":[]},{"level":2,"title":"Types","slug":"types","link":"#types","children":[]}],"relativePath":"getting-started/configuration.md"}'),d={name:"getting-started/configuration.md"},y={id:"frontmatter-title",tabindex:"-1"},u=s("a",{class:"header-anchor",href:"#frontmatter-title","aria-hidden":"true"},"#",-1),b=t("",6),h={id:"dependencies",tabindex:"-1"},D=s("a",{class:"header-anchor",href:"#dependencies","aria-hidden":"true"},"#",-1),F=s("table",null,[s("thead",null,[s("tr",null,[s("th",null,"Type"),s("th",{style:{"text-align":"left"}},"Usage"),s("th",{style:{"text-align":"center"}},"Default")])]),s("tbody",null,[s("tr",null,[s("td",null,"Array<Abstract<unknown>>"),s("td",{style:{"text-align":"left"}},"Manually set dependencies for service (disables autowire)"),s("td",{style:{"text-align":"center"}},[s("code",null,"undefined")])])])],-1),f={id:"private",tabindex:"-1"},g=s("a",{class:"header-anchor",href:"#private","aria-hidden":"true"},"#",-1),C=t("",1),A={id:"register",tabindex:"-1"},_=s("a",{class:"header-anchor",href:"#register","aria-hidden":"true"},"#",-1),m=s("table",null,[s("thead",null,[s("tr",null,[s("th",null,"Type"),s("th",{style:{"text-align":"left"}},"Usage"),s("th",{style:{"text-align":"center"}},"Default")])]),s("tbody",null,[s("tr",null,[s("td",null,"Newable<unknown> | Abstract<unknown>"),s("td",{style:{"text-align":"left"}},"Register the abstract / concrete class as a dependency key"),s("td",{style:{"text-align":"center"}},[s("code",null,"undefined")])])])],-1),x={id:"registeranduse",tabindex:"-1"},T=s("a",{class:"header-anchor",href:"#registeranduse","aria-hidden":"true"},"#",-1),E=t("",1),v={id:"scope",tabindex:"-1"},w=s("a",{class:"header-anchor",href:"#scope","aria-hidden":"true"},"#",-1),B=t("",1),I={id:"tag",tabindex:"-1"},S=s("a",{class:"header-anchor",href:"#tag","aria-hidden":"true"},"#",-1),k=t("",1),V={id:"token",tabindex:"-1"},j=s("a",{class:"header-anchor",href:"#token","aria-hidden":"true"},"#",-1),P=t("",1),U={id:"use",tabindex:"-1"},N=s("a",{class:"header-anchor",href:"#use","aria-hidden":"true"},"#",-1),q=s("table",null,[s("thead",null,[s("tr",null,[s("th",null,"Type"),s("th",{style:{"text-align":"left"}},"Usage"),s("th",{style:{"text-align":"center"}},"Default")])]),s("tbody",null,[s("tr",null,[s("td",null,"Newable<unknown>"),s("td",{style:{"text-align":"left"}},"Use the concrete service class for registered class."),s("td",{style:{"text-align":"center"}},[s("code",null,"undefined")])])])],-1),R={id:"useinstance",tabindex:"-1"},O=s("a",{class:"header-anchor",href:"#useinstance","aria-hidden":"true"},"#",-1),M=s("table",null,[s("thead",null,[s("tr",null,[s("th",null,"Type"),s("th",{style:{"text-align":"left"}},"Usage"),s("th",{style:{"text-align":"center"}},"Default")])]),s("tbody",null,[s("tr",null,[s("td",null,"Instance<unknown>"),s("td",{style:{"text-align":"left"}},"Use an already instantiated object."),s("td",{style:{"text-align":"center"}},[s("code",null,"undefined")])])])],-1),W={id:"usefactory",tabindex:"-1"},z=s("a",{class:"header-anchor",href:"#usefactory","aria-hidden":"true"},"#",-1),J=s("table",null,[s("thead",null,[s("tr",null,[s("th",null,"Type"),s("th",{style:{"text-align":"left"}},"Usage"),s("th",{style:{"text-align":"center"}},"Default")])]),s("tbody",null,[s("tr",null,[s("td",null,"Factory<unknown>"),s("td",{style:{"text-align":"left"}},"Use a factory to create the object."),s("td",{style:{"text-align":"center"}},[s("code",null,"undefined")])])])],-1),$={id:"vue",tabindex:"-1"},G=s("a",{class:"header-anchor",href:"#vue","aria-hidden":"true"},"#",-1),H=t("",6),K=s("thead",null,[s("tr",null,[s("th",null,"Property"),s("th",{style:{"text-align":"center"}},"Value"),s("th",{style:{"text-align":"left"}},"Returns")])],-1),L=s("tr",null,[s("td",null,[s("strong",null,"Request")]),s("td",{style:{"text-align":"center"}},[s("code",null,"'vue-diod:request'")]),s("td",{style:{"text-align":"left"}},"A single instance within the same request.")],-1),Q=s("tr",null,[s("td",null,[s("strong",null,"Singleton")]),s("td",{style:{"text-align":"center"}},[s("code",null,"'vue-diod:singleton'")]),s("td",{style:{"text-align":"left"}},"A single instance.")],-1),X=s("strong",null,"Transient",-1),Y=s("td",{style:{"text-align":"center"}},[s("code",null,"'vue-diod:transient'")],-1),Z=s("td",{style:{"text-align":"left"}},"A new instance.",-1),ss=t("",2);function ns(l,es,as,ts,ls,os){let e=i("badge");return p(),r("div",null,[s("h1",y,[n(c(l.$frontmatter.title)+" ",1),u]),b,s("h4",h,[n("dependencies "),a(e,{type:"info",text:"optional"}),n(),D]),F,s("h4",f,[n("private "),a(e,{type:"info",text:"optional"}),n(),g]),C,s("h4",A,[n("register "),a(e,{type:"warning",text:"one of"}),n(),_]),m,s("h4",x,[n("registerAndUse "),a(e,{type:"warning",text:"one of"}),n(),T]),E,s("h4",v,[n("scope "),a(e,{type:"info",text:"optional"}),n(),w]),B,s("h4",I,[n("tag "),a(e,{type:"info",text:"optional"}),n(),S]),k,s("h4",V,[n("token "),a(e,{type:"info",text:"optional"}),n(),j]),P,s("h4",U,[n("use "),a(e,{type:"warning",text:"one of"}),n(),N]),q,s("h4",R,[n("useInstance "),a(e,{type:"warning",text:"one of"}),n(),O]),M,s("h4",W,[n("useFactory "),a(e,{type:"warning",text:"one of"}),n(),z]),J,s("h4",$,[n("vue "),a(e,{type:"info",text:"optional"}),n(),G]),H,s("table",null,[K,s("tbody",null,[L,Q,s("tr",null,[s("td",null,[X,n(),a(e,{type:"info",text:"default"})]),Y,Z])])]),ss])}let cs=o(d,[["render",ns]]);export{rs as __pageData,cs as default};
