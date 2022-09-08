import{f as _,J as U,L as z,M as L,o as s,c as n,a as t,t as y,u as i,F as m,e as f,m as V,N as R,v as p,b as v,w as M,T as F,O,X as q,G as E,I as G,A as C,s as H,K as J,_ as K}from"./index.3cf213f0.js";import{_ as P}from"./PlayListItem.04e154c9.js";import{_ as X}from"./MvCover.ce2e951d.js";import{_ as Q}from"./Cover.25c46fc4.js";import{_ as W}from"./TrackCover.723077cc.js";import"./format.3c5dc5cf.js";const Y={class:"flex items-center justify-center rounded-md overflow-hidden relative w-12 flex-shrink-0"},Z={class:"w-12 h-12",loading:"lazy"},ee={class:"flex flex-col justify-center flex-1"},te={class:"flex font-bold text-lg lineClamp1"},se={class:"lineClamp1 hover:underline cursor-pointer"},ne={key:0,class:"text-skin-tertiary lineClamp1"},oe={class:"text-sm text-skin-tertiary lineClamp1"},le={key:0},ae={class:"hover:underline cursor-pointer"},re={key:0,class:"flex items-center justify-center font-bold"},ie={__name:"RecordItem",props:{song:{type:Object,default:()=>{}},count:{type:Number,default:0}},setup(c){const g=_(!1);return(a,u)=>{var d;const x=U("lazy");return z((s(),n("div",{class:"flex space-x-6 items-center hover:bg-opacity-10 hover:bg-skin-tertiary transition-all rounded-lg p-2 my-2",onMouseenter:u[0]||(u[0]=k=>g.value=!0),onMouseleave:u[1]||(u[1]=k=>g.value=!1)},[t("div",Y,[z(t("img",Z,null,512),[[x,`${(d=c.song.al)==null?void 0:d.picUrl.replace(/^http:/,"https://")}?param=48y48`]])]),t("div",ee,[t("div",te,[t("span",se,y(c.song.name),1),c.song.alia[0]?(s(),n("span",ne," ("+y(c.song.alia[0])+") ",1)):i("",!0)]),t("div",oe,[(s(!0),n(m,null,f(c.song.ar,(k,o)=>(s(),n("span",{key:o},[o!==0?(s(),n("span",le," / ")):i("",!0),t("span",ae,y(k.name),1)]))),128))])]),c.count?(s(),n("div",re,y(c.count),1)):i("",!0)],544)),[[L,c.song.name]])}}},ce={class:"relative"},ue={key:0,class:"absolute left-0 top-full z-10 mt-1 w-full origin-top-right rounded-md bg-white shadow-lg border border-solid"},de={class:"py-1"},pe=["onClick"],me={__name:"DropDown",props:{row:{type:Array,default:()=>[]},toggleShow:{type:Boolean,default:!1},type:{type:Number,default:1}},emits:["update:toggleShow","update:type"],setup(c,{emit:g}){const a=c,u=d=>{g("update:toggleShow",!1),g("update:type",d.type)},x=V(()=>a.row.filter(d=>d.type===a.type)[0]);return(d,k)=>(s(),n("div",ce,[R(d.$slots,"button",{active:p(x)}),v(F,{name:"tagSelector",mode:"in-out"},{default:M(()=>[c.toggleShow?(s(),n("div",ue,[t("div",de,[(s(!0),n(m,null,f(c.row,(o,b)=>(s(),n("div",{key:b,class:"font-bold text-base text-skin-tertiary py-1 px-2 hover:bg-skin-tertiary hover:bg-opacity-20",onClick:j=>u(o)},y(o.name),9,pe))),128))])])):i("",!0)]),_:1})]))}},ye={key:0},ve={class:"flex items-center space-x-4 my-8"},fe=["src"],ge={class:"text-5xl font-bold flex-wrap"},_e={class:"flex space-x-6 lg:space-x-0 lg:flex-wrap lg:h-full lg:flex-col lg:space-y-8"},ke=["textContent"],he={class:"flex justify-between"},xe={class:"flex-grow flex-shrink-0 space-y-1"},we=t("div",{class:"text-2xl font-bold text-skin-primary"},"\u6211\u559C\u6B22\u7684\u97F3\u4E50",-1),be={class:"text-skin-primary text-sm"},$e={class:"w-2/3 h-56 lg:w-full flex flex-wrap items-center"},Ce={class:"mt-16 space-y-8 min-h-screen"},Se={class:"flex justify-between items-center h-9"},Me={class:"flex space-x-8 font-bold items-center text-skin-tertiary flex-shrink-0 select-none"},je=["onClick"],De={class:"flex items-center justify-center space-x-1 p-2"},ze={key:1,class:"p-2"},Ae={class:"text-xs text-skin-tertiary lineClamp1 mt-1"},Ne={class:"text-sm text-skin-tertiary flex items-center space-x-2 mb-4 ml-2"},Fe={__name:"My",setup(c){const g=O(),a=q(),u=_(!1),x=_(`\u4F60\u6210\u957F\u7684\u7ECF\u8FC7
\u4F60\u8BF4\u4F60\u4E5F\u5728\u7F8E\u56FD\u7559\u5B66
\u4F4F\u5728\u6D1B\u6749\u77F6`),d=_(1),k=E([{type:1,child:[{type:1,name:"\u521B\u5EFA\u7684\u6B4C\u5355"},{type:2,name:"\u6240\u6709\u6B4C\u5355"},{type:3,name:"\u6536\u85CF\u7684\u6B4C\u5355"}]},{type:2,name:"\u4E13\u8F91"},{type:3,name:"\u827A\u4EBA"},{type:4,name:"MV"},{type:5,name:"\u4E91\u76D8"},{type:6,name:"\u542C\u6B4C\u6392\u884C"}]),o=_(1),b=_(),j=$=>{o.value=$,document.querySelector("#main").scrollTo({top:b.value.offsetHeight+80,behavior:"smooth"}),u.value=!1},w=_(1);return G(()=>{a.getMyData()}),($,r)=>{const D=K,A=W,N=me,S=Q,B=X,I=P,T=ie;return p(a).tracksCount?(s(),n("div",ye,[t("div",{ref_key:"section1",ref:b},[t("div",ve,[t("img",{src:`${p(g).avatarUrl}?param=54y54`,class:"rounded-full"},null,8,fe),t("h3",ge,y(p(g).nickname)+"\u7684\u97F3\u4E50\u5E93",1)]),t("div",_e,[t("div",{class:"h-56 flex justify-between flex-col flex-shrink-0 bg-skin-primary bg-opacity-20 w-1/3 rounded-lg p-4 lg:w-full cursor-pointer",onClick:r[1]||(r[1]=e=>$.$router.push("/likesongs"))},[t("div",{class:"text-skin-primary flex-shrink-0",textContent:y(x.value)},null,8,ke),t("div",he,[t("div",xe,[we,t("div",be," \u5171"+y(p(a).tracksCount)+"\u9996\u6B4C ",1)]),t("div",{class:"p-1.5 flex items-center justify-center bg-skin-primary rounded-full",onClick:r[0]||(r[0]=e=>$.$router.replace("/"))},[v(D,{name:"play",size:"44",class:"text-white"})])])]),t("div",$e,[(s(!0),n(m,null,f(p(a).showLikeSongs,(e,l)=>(s(),n("div",{key:l,class:"w-1/3 h-1/4"},[v(A,{item:e,"pic-url":e.al.picUrl.replace(/^http:/,"https://"),name:e.name,alia:e.alia,ar:e.ar},null,8,["item","pic-url","name","alia","ar"])]))),128))])])],512),t("div",Ce,[t("div",Se,[t("div",Me,[(s(!0),n(m,null,f(k,(e,l)=>(s(),n("div",{key:l,class:C(["my-tag transition-all",o.value===e.type?"bg-gray-100 text-skin-primary":""]),onClick:h=>j(e.type)},[e.type===1?(s(),H(N,{key:0,toggleShow:u.value,"onUpdate:toggleShow":r[3]||(r[3]=h=>u.value=h),type:d.value,"onUpdate:type":r[4]||(r[4]=h=>d.value=h),row:e.child},{button:M(({active:h})=>[t("div",De,[t("div",null,y(h.name),1),v(D,{name:"down",size:"20",onClick:r[2]||(r[2]=J(Be=>u.value=!u.value,["stop"]))})])]),_:2},1032,["toggleShow","type","row"])):i("",!0),e.type!==1?(s(),n("div",ze,y(e.name),1)):i("",!0)],10,je))),128))]),i("",!0)]),t("div",{class:C(o.value===5||o.value===6?"":"grid grid-cols-5 gap-10 lg:gap-x-5")},[o.value===1?(s(!0),n(m,{key:0},f(p(a).playlist(d.value),(e,l)=>(s(),n("div",{key:l},[v(S,{"row-list-item":e,"row-type":"mylist"},{subTilte:M(()=>[t("div",null,[t("span",Ae," by "+y(e.creator.nickname),1)])]),_:2},1032,["row-list-item"])]))),128)):i("",!0),o.value===2?(s(!0),n(m,{key:1},f(p(a).likeAlbum,(e,l)=>(s(),n("div",{key:l},[v(S,{"row-list-item":e,"row-type":"newAlbum"},null,8,["row-list-item"])]))),128)):i("",!0),o.value===3?(s(!0),n(m,{key:2},f(p(a).likeArtist,(e,l)=>(s(),n("div",{key:l},[v(S,{"row-list-item":e,"row-type":"recomArtist"},null,8,["row-list-item"])]))),128)):i("",!0),o.value===4?(s(!0),n(m,{key:3},f(p(a).likeMV,(e,l)=>(s(),n("div",{key:l},[v(B,{item:e,"show-title":!0,name:e.title,"sub-text":e.creator[0].userName,"img-url":e.coverUrl},null,8,["item","name","sub-text","img-url"])]))),128)):i("",!0),o.value===5?(s(!0),n(m,{key:4},f(p(a).likeCloud,(e,l)=>(s(),n("div",{key:l},[v(I,{song:e.simpleSong},null,8,["song"])]))),128)):i("",!0),o.value===6?(s(),n(m,{key:5},[t("div",Ne,[t("div",{class:C(["my-tag p-2",w.value===1?"bg-gray-100 text-skin-primary":""]),onClick:r[5]||(r[5]=e=>w.value=1)}," \u6700\u8FD1\u4E00\u5468 ",2),t("div",{class:C(["my-tag p-2",w.value===0?"bg-gray-100 text-skin-primary":""]),onClick:r[6]||(r[6]=e=>w.value=0)}," \u6240\u6709\u65F6\u95F4 ",2)]),(s(!0),n(m,null,f(p(a).likeRecord(w.value),(e,l)=>(s(),n("div",{key:l},[v(T,{song:e.song,count:e.playCount},null,8,["song","count"])]))),128))],64)):i("",!0)],2)])])):i("",!0)}}};export{Fe as default};
