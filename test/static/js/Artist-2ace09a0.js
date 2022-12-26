import{_ as e}from"./Modal-0d32c652.js";import{_ as t}from"./TrackCover-4800cdfc.js";import{_ as l}from"./MvCover-f1471faf.js";import{_ as s}from"./Cover-c9cf5b69.js";import{_ as a}from"./index-3064f07a.js";import{r as i,j as r,w as m,A as n,B as c,c as u,a as o,C as v,z as d,t as x,u as p,F as f,G as y,a0 as b,v as g,af as h,V as k,M as w,ac as j,o as z,k as A}from"./common-e50ab5ff.js";import{b as C,c as _}from"./format-219ee090.js";const T={class:"flex space-x-12 mt-8 my-16"},$={class:"flex items-center justify-center flex-shrink-0 relative"},V={class:"rounded-full h-72 w-72"},q={class:"h-72 w-72 absolute top-3 -z-10 bg-cover blur-md opacity-60 rounded-full"},M={class:"flex flex-col justify-center"},S={class:"font-bold text-5xl mb-4 lineClamp2"},D={class:"flex justify-start space-x-4"},U={class:"flex items-center text-skin-tertiary text-sm space-x-1"},E={class:"flex items-center text-skin-tertiary text-sm space-x-1"},P={class:"flex items-center text-skin-tertiary text-sm space-x-1"},B=["textContent"],F={class:"mt-4 flex items-center space-x-8"},G={class:"py-1.5 px-2.5 rounded-lg flex items-center justify-center space-x-1 bg-skin-primary bg-opacity-20 flex-shrink-0"},I=o("span",{class:"font-bold text-skin-primary"},"播放",-1),L={class:"p-2 rounded-lg flex items-center justify-center bg-gray-400 bg-opacity-10 flex-shrink-0"},H={class:"p-0.5 rounded-lg flex items-center justify-center bg-gray-400 bg-opacity-10 flex-shrink-0"},J={class:"space-y-8"},K={key:0},N=o("h3",{class:"font-bold text-2xl mb-4"},"最新发布",-1),O={class:"flex h-40"},Q={class:"flex flex-1 items-center space-x-4"},R={class:"w-40 flex-shrink-0"},W={class:"font-bold text-lg mb-2"},X={class:"text-sm text-gray-400"},Y={class:"flex items-center text-sm text-gray-400 space-x-2"},Z=o("span",null,"•",-1),ee={class:"flex items-center space-x-1"},te={key:0,class:"flex-1 flex space-x-4"},le={class:"flex-shrink-0"},se={class:"flex flex-col justify-center"},ae={class:"font-bold text-lg mb-2"},ie={class:"flex items-center text-sm text-gray-400 space-x-2"},re=o("div",{class:"flex items-center text-sm text-gray-400 space-x-2"}," 最新mv ",-1),me={key:1},ne=o("h3",{class:"font-bold text-2xl mb-4"},"热门歌曲",-1),ce={class:"w-full flex flex-wrap items-center"},ue={key:2},oe=o("h3",{class:"font-bold text-2xl mb-4"},"专辑",-1),ve={class:"grid grid-cols-5 gap-8 lg:gap-x-5"},de={key:3},xe=o("h3",{class:"font-bold text-2xl mb-4"},"EP和单曲",-1),pe={class:"grid grid-cols-5 gap-10 lg:gap-x-5"},fe={class:"text-xs text-gray-400 italic"},ye={key:4},be=o("h3",{class:"font-bold text-2xl mb-4"},"MVs",-1),ge={class:"grid grid-cols-5 gap-10 lg:gap-x-5"},he={key:5},ke=o("h3",{class:"font-bold text-2xl mb-4"},"相似歌手",-1),we={class:"grid gap-10 grid-cols-6 lg:gap-x-5"},je={class:"overflow-auto text-sm whitespace-pre-wrap"},ze={__name:"Artist",setup(ze){const{proxy:Ae}=A(),Ce=k(),_e=w(),Te=i(!1),$e=()=>{Te.value=!0},Ve=i({}),qe=i([]),Me=i([]),Se=i([]),De=i([]),Ue=i([]),Ee=r((()=>{var e,t;return(null==(e=Se.value[0])?void 0:e.publishTime)>(null==(t=Me.value[0])?void 0:t.publishTime)?{album:Se.value[0],mv:De.value[0]}:{album:Me.value[0],mv:De.value[0]}}));return(()=>{const e=Ce.params.id;Ae.$http.reqArtistDetail({id:e}).then((({data:e})=>{var t;e.data.artist.cover=(null==(t=e.data.user)?void 0:t.avatarUrl.replace(/^http:/,"https://"))||e.data.artist.cover.replace(/^http:/,"https://"),Ve.value=e.data.artist})),Ae.$http.reqAritstTop({id:e}).then((({data:e})=>{qe.value=e.songs.slice(0,12)})),Ae.$http.reqArtistAlbum({id:e,limit:50}).then((({data:e})=>{Me.value=e.hotAlbums.filter((e=>"专辑"===e.type)),Se.value=e.hotAlbums.filter((e=>"EP"===e.type||"Single"===e.type))})),Ae.$http.reqArtistMV({id:e}).then((({data:e})=>{De.value=e.mvs})),Ae.$http.reqArtistSimi({id:e}).then((({data:e})=>{Ue.value=e.artists.slice(0,12)}))})(),m(Ce,((e,t)=>{t.name===e.name&&_e.go(0)})),(i,r)=>{const m=a,k=s,w=l,A=t,ze=e,Ae=j("lazy");return n((z(),u("div",null,[o("div",T,[o("div",$,[n(o("img",V,null,512),[[Ae,`${Ve.value.cover}?param=512y512`]]),n(o("img",q,null,512),[[Ae,`${Ve.value.cover}?param=512y512`]])]),o("div",M,[o("h3",S,v(Ve.value.name),1),o("div",D,[o("div",U,[d(m,{name:"music",size:"18",class:"text-gray-400"}),o("span",null,v(Ve.value.musicSize)+"首",1)]),o("div",E,[d(m,{name:"album",size:"18",class:"text-gray-400"}),o("span",null,v(Ve.value.albumSize)+"张",1)]),o("div",P,[d(m,{name:"mv",size:"18",class:"text-gray-400"}),o("span",null,v(Ve.value.mvSize)+"部",1)])]),o("div",{class:"my-4 lineClamp3 text-skin-tertiary text-sm cursor-pointer whitespace-pre-wrap",onClick:$e,textContent:v(Ve.value.briefDesc)},null,8,B),o("div",F,[o("button",G,[d(m,{name:"play",size:"24",class:"text-skin-primary"}),I]),o("button",L,[(z(),x(m,{key:0,name:"dislike",size:"20",class:"text-skin-primary"}))]),o("button",H,[d(m,{name:"more",size:"32",class:"text-skin-primary"})])])])]),o("div",J,[p(Ee).album?(z(),u("div",K,[N,o("div",O,[o("div",Q,[o("div",R,[d(k,{"row-list-item":p(Ee).album,"row-type":"newAlbum","show-title":!1},null,8,["row-list-item"])]),o("div",null,[o("div",W,v(p(Ee).album.name),1),o("div",X,v(p(C)(p(Ee).album.publishTime)),1),o("div",Y,[o("div",null,v(p(Ee).album.type),1),Z,o("div",ee,[d(m,{name:"music",size:"16"}),o("div",null,v(p(Ee).album.size)+"首",1)])])])]),p(Ee).mv?(z(),u("div",te,[o("div",le,[d(w,{item:p(Ee).mv,"img-url":p(Ee).mv.imgurl,"show-title":!1},null,8,["item","img-url"])]),o("div",se,[o("div",ae,v(p(Ee).mv.name),1),o("div",ie,v(p(_)(p(Ee).mv.publishTime)),1),re])])):f("",!0)])])):f("",!0),qe.value.length>0?(z(),u("div",me,[ne,o("div",ce,[(z(!0),u(y,null,b(qe.value,((e,t)=>(z(),u("div",{key:t,class:"w-1/4 h-1/3 py-1"},[d(A,{item:e,"pic-url":e.al.picUrl,name:e.name,alia:e.alia,ar:e.ar},null,8,["item","pic-url","name","alia","ar"])])))),128))])])):f("",!0),Me.value.length>0?(z(),u("div",ue,[oe,o("div",ve,[(z(!0),u(y,null,b(Me.value,((e,t)=>(z(),u("div",{key:t},[d(k,{"row-list-item":e,"row-type":"newAlbum"},null,8,["row-list-item"])])))),128))])])):f("",!0),Se.value.length>0?(z(),u("div",de,[xe,o("div",pe,[(z(!0),u(y,null,b(Se.value,((e,t)=>(z(),u("div",{key:t},[d(k,{"row-list-item":e,"row-type":"newAlbum"},{subTilte:g((({rowListItem:e})=>[o("div",fe,v(e.type),1)])),_:2},1032,["row-list-item"])])))),128))])])):f("",!0),De.value.length>0?(z(),u("div",ye,[be,o("div",ge,[(z(!0),u(y,null,b(De.value,((e,t)=>(z(),u("div",{key:t},[d(w,{item:e,"img-url":e.imgurl,name:e.name,"sub-text":e.publishTime,"show-title":!0,"show-artist":!1},null,8,["item","img-url","name","sub-text"])])))),128))])])):f("",!0),Ue.value.length>0?(z(),u("div",he,[ke,o("div",we,[(z(!0),u(y,null,b(Ue.value,((e,t)=>(z(),u("div",{key:t},[d(k,{"row-list-item":e,"row-type":"recomArtist"},null,8,["row-list-item"])])))),128))])])):f("",!0)]),(z(),x(h,{to:"#main"},[d(ze,{modelValue:Te.value,"onUpdate:modelValue":r[0]||(r[0]=e=>Te.value=e),type:"专辑介绍"},{content:g((()=>[o("div",je,v(Ve.value.briefDesc),1)])),_:1},8,["modelValue"])]))],512)),[[c,Ve.value.cover]])}}};export{ze as default};
