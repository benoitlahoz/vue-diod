import{l as h,m as _,g as v,e as b,s as C,o as m,c as p,a as e,u as n,t as r,_ as g,b as x,f as y}from"./app.17d724d6.js";let{injectFromContainer:u}=v(),s=h({id:"counter",state:()=>({count:0}),getters:{doubleCount:t=>()=>2*t.count},actions:{increment(){let t=u(_);this.count=t.increment(this.count)},decrement(){let t=u(_);this.count=t.decrement(this.count)}}}),P={class:"container"},$={class:"counter"},j=b({__name:"pinia.component",setup(t){let i=s(),{count:c}=C(s()),{doubleCount:f}=s(),l=i.increment,d=i.decrement;return(w,a)=>(m(),p("div",P,[e("div",$,[e("button",{onClick:a[0]||(a[0]=(...o)=>n(d)&&n(d)(...o))},"Decrement"),e("div",null,r(n(c)),1),e("button",{onClick:a[1]||(a[1]=(...o)=>n(l)&&n(l)(...o))},"Increment")]),e("div",null,[e("div",null,r(n(f)()),1)])]))}});let k=g(j,[["__scopeId","data-v-86853008"]]),D={id:"frontmatter-title",tabindex:"-1"},I=e("a",{class:"header-anchor",href:"#frontmatter-title","aria-hidden":"true"},"#",-1),O={style:{width:"100%",display:"flex","justify-content":"center",margin:"4rem 0"}},J=JSON.parse('{"title":"Pinia foo","description":"","frontmatter":{"title":"Pinia foo"},"headers":[],"relativePath":"examples/pinia/pinia-foo.md"}'),S={name:"examples/pinia/pinia-foo.md"},N=Object.assign(S,{setup:t=>(i,c)=>(m(),p("div",null,[e("h1",D,[x(r(i.$frontmatter.title)+" ",1),I]),e("div",O,[y(k)])]))});export{J as __pageData,N as default};
