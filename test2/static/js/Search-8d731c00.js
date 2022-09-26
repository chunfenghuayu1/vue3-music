import{_ as t}from"./index-e3510e51.js";import{_ as e}from"./MvCover-4a96fe72.js";import{_ as s}from"./TrackCover-83ea4f69.js";import{t as l,o as a,a as i,b as r,x as n,q as o,a1 as m,r as c,X as p,c as u,N as d,g as y,$ as g,f as v,w,e as x,y as f,F as k,I as h,V as b}from"./vendor-7d305bdc.js";import{_}from"./Cover-645304f8.js";import"./__commonjsHelpers__-d99f3c2d.js";import"./format-219ee090.js";const j={class:"flex justify-between items-end mb-5"},q={class:"text-2xl font-bold"},$={__name:"SearchItem",props:{title:{type:String,required:!0}},setup:t=>(e,s)=>(l("router-link"),a(),i("div",null,[r("div",j,[r("h3",q,n(t.title),1),o("",!0)]),m(e.$slots,"content")]))},C={class:"space-y-8"},S={class:"my-8 flex space-x-8 items-center font-bold text-5xl"},A={class:"flex justify-between space-x-40"},E={class:"grid grid-cols-3 gap-x-10 lg:gap-x-5"},I={class:"grid grid-cols-3 gap-x-10 lg:gap-x-5"},N={key:0},z={class:"h-56 lg:w-full flex flex-wrap items-center"},D={key:1},F={class:"grid grid-cols-5 gap-10 lg:gap-x-5"},H={key:2},M={class:"grid grid-cols-6 gap-10 lg:gap-x-5"},O={class:"flex justify-center items-center absolute left-0 bottom-2 pl-1.5 py-0.5"},P={class:"italic text-white text-sm lg:text-xs flex-shrink-0 font-semibold text-opacity-90"},T={__name:"Search",setup(l){const{proxy:m}=b(),j=f(),q=c([{type:100,limit:3,kw:"artists"},{type:10,limit:3,kw:"albums"},{type:1,limit:16,kw:"songs"},{type:1004,limit:5,kw:"mvs"},{type:1e3,limit:12,kw:"playlists"}]),T=c(!1),U=p({artists:[],albums:[],songs:[],mvs:[],playlists:[]}),V=u((()=>q.value.map((t=>m.$http.reqSearch({keywords:j.query.kw,type:t.type,limit:t.limit}))))),X=()=>{j.query.kw&&Promise.all(V.value).then((t=>{q.value.forEach(((e,s)=>{t[s].data.result[e.kw]&&("songs"!==e.kw?U[e.kw]=t[s].data.result[e.kw]:B(t[s].data.result[e.kw],e.kw))}))})).catch((t=>{m.$notify({title:"Error",message:t.response.data.message,type:"error"})})).finally((()=>{T.value=!0}))},B=(t,e)=>{const s=t.map((t=>t.id)).join(",");m.$http.reqSongDetail({ids:s}).then((({data:t})=>{U[e]=t.songs}))},G=p({...U});return d((()=>j.query.kw),(()=>{T.value=!1,Object.assign(U,G),X()})),X(),(l,m)=>{const c=_,p=$,u=s,d=e,f=t;return y((a(),i("div",C,[r("div",S,[r("h3",null,n(l.$t.nav.search),1),r("p",null,n(`"${l.$route.query.kw}"`),1)]),r("div",A,[U.artists.length>0?(a(),v(p,{key:0,class:"flex-1",title:"艺人"},{content:w((()=>[r("div",E,[(a(!0),i(k,null,h(U.artists,((t,e)=>(a(),i("div",{key:e},[x(c,{"row-list-item":t,"row-type":"recomArtist"},null,8,["row-list-item"])])))),128))])])),_:1})):o("",!0),U.albums.length>0?(a(),v(p,{key:1,class:"flex-1",title:"专辑"},{content:w((()=>[r("div",I,[(a(!0),i(k,null,h(U.albums,((t,e)=>(a(),i("div",{key:e},[x(c,{"row-list-item":t,"row-type":"newAlbum"},null,8,["row-list-item"])])))),128))])])),_:1})):o("",!0)]),U.songs.length>0?(a(),i("div",N,[x(p,{title:"歌曲"},{content:w((()=>[r("div",z,[(a(!0),i(k,null,h(U.songs,((t,e)=>(a(),i("div",{key:e,class:"w-1/4 h-1/4"},[x(u,{item:t,"pic-url":t.al.picUrl,name:t.name,alia:t.alia,ar:t.ar},null,8,["item","pic-url","name","alia","ar"])])))),128))])])),_:1})])):o("",!0),U.mvs.length>0?(a(),i("div",D,[x(p,{title:"视频"},{content:w((()=>[r("div",F,[(a(!0),i(k,null,h(U.mvs,((t,e)=>(a(),i("div",{key:e},[x(d,{item:t,"show-title":!0,name:t.name,"sub-text":t.artists[0].userName,"img-url":t.cover},null,8,["item","name","sub-text","img-url"])])))),128))])])),_:1})])):o("",!0),U.playlists.length>0?(a(),i("div",H,[x(p,{title:"歌单"},{content:w((()=>[r("div",M,[(a(!0),i(k,null,h(U.playlists,((t,e)=>(a(),i("div",{key:e},[x(c,{"row-list-item":t},{playCount:w((({playCount:t})=>[r("div",O,[x(f,{name:"play",size:"18",class:"opacity-90 text-white"}),r("span",P,n(t),1)])])),_:2},1032,["row-list-item"])])))),128))])])),_:1})])):o("",!0)],512)),[[g,T.value]])}}};export{T as default};
