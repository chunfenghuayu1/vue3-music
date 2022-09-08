import{r as I,o as t,c as s,a as r,t as y,u as p,N as L,f as x,G as b,m as E,i as V,L as A,M as F,s as S,w as _,b as u,S as M,F as d,e as h,B as U,_ as z}from"./index.3cf213f0.js";import{_ as G}from"./MvCover.ce2e951d.js";import{_ as O}from"./TrackCover.723077cc.js";import{_ as P}from"./Cover.25c46fc4.js";import"./format.3c5dc5cf.js";const R={class:"flex justify-between items-end mb-5"},T={class:"text-2xl font-bold"},H={__name:"SearchItem",props:{title:{type:String,required:!0}},setup(w){return(m,g)=>(I("router-link"),t(),s("div",null,[r("div",R,[r("h3",T,y(w.title),1),p("",!0)]),L(m.$slots,"content")]))}},J={class:"space-y-8"},K={class:"my-8 flex space-x-8 items-center font-bold text-5xl"},Q={class:"flex justify-between space-x-40"},W={class:"grid grid-cols-3 gap-x-10 lg:gap-x-5"},X={class:"grid grid-cols-3 gap-x-10 lg:gap-x-5"},Y={key:0},Z={class:"h-56 lg:w-full flex flex-wrap items-center"},tt={key:1},et={class:"grid grid-cols-5 gap-10 lg:gap-x-5"},st={key:2},at={class:"grid grid-cols-6 gap-10 lg:gap-x-5"},ot={class:"flex justify-center items-center absolute left-0 bottom-2 pl-1.5 py-0.5"},rt={class:"italic text-white text-sm lg:text-xs flex-shrink-0 font-semibold text-opacity-90"},_t={__name:"Search",setup(w){const{proxy:m}=U(),g=M(),f=x([{type:100,limit:3,kw:"artists"},{type:10,limit:3,kw:"albums"},{type:1,limit:16,kw:"songs"},{type:1014,limit:5,kw:"videos"},{type:1e3,limit:12,kw:"playlists"}]),v=x(!1),a=b({artists:[],albums:[],songs:[],videos:[],playlists:[]}),$=E(()=>f.value.map(o=>m.$http.reqSearch({keywords:g.query.kw,type:o.type,limit:o.limit}))),k=()=>{!g.query.kw||Promise.all($.value).then(o=>{f.value.forEach((l,n)=>{if(!!o[n].data.result[l.kw]){if(l.kw==="songs"){C(o[n].data.result[l.kw],l.kw);return}a[l.kw]=o[n].data.result[l.kw]}})}).catch(o=>{m.$notify({title:"Error",message:o.response.data.message,type:"error"})}).finally(()=>{v.value=!0})},C=(o,l)=>{const n=o.map(i=>i.id).join(",");m.$http.reqSongDetail({ids:n}).then(({data:i})=>{a[l]=i.songs})},q=b({...a});return V(()=>g.query.kw,()=>{v.value=!1,Object.assign(a,q),k()}),k(),(o,l)=>{const n=P,i=H,D=O,j=G,B=z;return A((t(),s("div",J,[r("div",K,[r("h3",null,y(o.$t.nav.search),1),r("p",null,y(`"${o.$route.query.kw}"`),1)]),r("div",Q,[a.artists.length>0?(t(),S(i,{key:0,class:"flex-1",title:"\u827A\u4EBA"},{content:_(()=>[r("div",W,[(t(!0),s(d,null,h(a.artists,(e,c)=>(t(),s("div",{key:c},[u(n,{"row-list-item":e,"row-type":"recomArtist"},null,8,["row-list-item"])]))),128))])]),_:1})):p("",!0),a.albums.length>0?(t(),S(i,{key:1,class:"flex-1",title:"\u4E13\u8F91"},{content:_(()=>[r("div",X,[(t(!0),s(d,null,h(a.albums,(e,c)=>(t(),s("div",{key:c},[u(n,{"row-list-item":e,"row-type":"newAlbum"},null,8,["row-list-item"])]))),128))])]),_:1})):p("",!0)]),a.songs.length>0?(t(),s("div",Y,[u(i,{title:"\u6B4C\u66F2"},{content:_(()=>[r("div",Z,[(t(!0),s(d,null,h(a.songs,(e,c)=>(t(),s("div",{key:c,class:"w-1/4 h-1/4"},[u(D,{item:e,"pic-url":e.al.picUrl,name:e.name,alia:e.alia,ar:e.ar},null,8,["item","pic-url","name","alia","ar"])]))),128))])]),_:1})])):p("",!0),a.videos.length>0?(t(),s("div",tt,[u(i,{title:"\u89C6\u9891"},{content:_(()=>[r("div",et,[(t(!0),s(d,null,h(a.videos,(e,c)=>(t(),s("div",{key:c},[u(j,{item:e,"show-title":!0,name:e.title,"sub-text":e.creator[0].userName,"img-url":e.coverUrl},null,8,["item","name","sub-text","img-url"])]))),128))])]),_:1})])):p("",!0),a.playlists.length>0?(t(),s("div",st,[u(i,{title:"\u6B4C\u5355"},{content:_(()=>[r("div",at,[(t(!0),s(d,null,h(a.playlists,(e,c)=>(t(),s("div",{key:c},[u(n,{"row-list-item":e},{playCount:_(({playCount:N})=>[r("div",ot,[u(B,{name:"play",size:"18",class:"opacity-90 text-white"}),r("span",rt,y(N),1)])]),_:2},1032,["row-list-item"])]))),128))])]),_:1})])):p("",!0)],512)),[[F,v.value]])}}};export{_t as default};
