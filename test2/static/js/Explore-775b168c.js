import{c as e,o as a,f as t,w as s,a as l,F as i,I as r,b as o,x as c,i as n,j as u,q as v,T as p,u as m,a1 as d,a2 as y,r as g,a3 as f,P as x,a4 as h,e as w,g as k,y as _,V as b}from"./vendor-7d305bdc.js";import"./el-infinite-scroll-00108f1c.js";import{_ as q}from"./Cover-645304f8.js";import{u as T,l as j,_ as M}from"./index-e3510e51.js";import"./__commonjsHelpers__-d99f3c2d.js";import"./format-219ee090.js";const C={key:0,class:"space-y-8 p-8 bg-gray-300 bg-opacity-30 rounded-lg text-gray-800 text-opacity-80 origin-top"},$={class:"text-2xl font-bold flex-shrink-0 h-10 flex items-center"},L={class:"flex flex-wrap"},A=["onClick"],P={__name:"TagSelector",props:{showMore:{type:Boolean,required:!0},activeTags:{type:Array,required:!0}},setup(m){const d=T(),y=e((()=>j.explore.categories)),g=e=>j.explore.tags.filter((a=>a.category===1*e));return(e,f)=>(a(),t(p,{name:"tagSelector",mode:"in-out"},{default:s((()=>[m.showMore?(a(),l("div",C,[(a(!0),l(i,null,r(u(y),((e,t)=>(a(),l("div",{key:t,class:"flex space-x-8"},[o("h3",$,c(e),1),o("div",L,[(a(!0),l(i,null,r(g(t),((e,t)=>(a(),l("div",{key:t,class:"flex min-w-24 items-center justify-center"},[o("span",{class:n(["h-10 py-1 px-2.5 flex items-center justify-center rounded-md hover:bg-skin-primary hover:bg-opacity-30 hover:text-skin-primary cursor-pointer",m.activeTags.includes(e.name)?"text-skin-primary":""]),onClick:a=>u(d).storeTags(e)},c(e.name),11,A)])))),128))])])))),128))])):v("",!0)])),_:1}))}},S=["onClick"],B={__name:"ExploreTag",props:{activeTags:{type:Array,required:!0},category:{type:String,required:!0},showMore:{type:Boolean,required:!0}},emits:["update:showMore"],setup(e,{emit:o}){const u=m();return(v,p)=>(a(),t(y,{name:"tagList",class:"flex flex-wrap mb-4 relative",tag:"div"},{default:s((()=>[(a(!0),l(i,null,r(e.activeTags,(t=>(a(),l("div",{key:t,class:n(["selector-tag transition-all",e.category!==t||e.showMore?"":"activeTag"]),onClick:e=>(e=>{u.push({path:"/explore",query:{cat:e}}),o("update:showMore",!1)})(t)},c(t),11,S)))),128)),d(v.$slots,"more")])),_:3}))}},E={key:0},H={class:"font-bold text-6xl my-8"},z={class:"mt-12 grid gap-10 grid-cols-6 lg:gap-x-5","infinite-scroll-immediate":!1,"infinite-scroll-distance":"300","infinite-scroll-delay":"500"},F={class:"absolute right-0 top-2 flex justify-center items-center pr-3 pt-0.5"},I={class:"italic text-white text-sm lg:text-xs flex-shrink-0 font-semibold text-opacity-90"},R={__name:"Explore",setup(t){const p=T(),{proxy:m}=b(),d=_(),y=g(!1),j=e((()=>{const{query:e}=d;return(null==e?void 0:e.cat)||"全部"})),C=g(24),$=g(0),L=g(!0),A=g(null),S=()=>{R.value=[],$.value=0,L.value=!0,A.value=null},R=g([]),U=({limit:e,cat:a,offset:t,before:s})=>{"排行榜"!==a?"精品歌单"!==a?"推荐歌单"!==a?m.$http.reqPlayList({limit:e,cat:a,offset:t}).then((e=>{R.value=[...R.value,...e.data.playlists],L.value=e.data.more})):m.$http.reqAlbumListList({limit:100}).then((e=>{R.value=[...R.value,...e.data.result]})):m.$http.reqHighqualityPlaylist({limit:24,cat:"全部",before:s}).then((e=>{R.value=[...R.value,...e.data.playlists],L.value=e.data.more,A.value=e.data.lasttime})):m.$http.reqRankList().then((e=>{R.value=e.data.list}))},V=()=>{"排行榜"!==j.value&&"推荐歌单"!==j.value&&L.value&&($.value++,U({limit:C.value,cat:j.value,offset:$.value*C.value,before:A.value}))};f((e=>{S(),U({limit:C.value,cat:e.query.cat})}));const D=g(!1);return x((()=>{D.value=!0,S(),U({limit:C.value,cat:j.value,offset:$.value*C.value})})),(e,t)=>{const m=B,d=P,g=M,f=q,x=h;return D.value?(a(),l("div",E,[o("h3",H,c(e.$t.explore.title),1),w(m,{showMore:y.value,"onUpdate:showMore":t[1]||(t[1]=e=>y.value=e),"active-tags":u(p).settings.activeTags,category:u(j)},{more:s((()=>[o("div",{class:n(["selector-tag",y.value?"activeTag":""]),onClick:t[0]||(t[0]=e=>y.value=!y.value)}," ••• ",2)])),_:1},8,["showMore","active-tags","category"]),w(d,{"show-more":y.value,"active-tags":u(p).settings.activeTags},null,8,["show-more","active-tags"]),k((a(),l("div",z,[(a(!0),l(i,null,r(R.value,((e,t)=>(a(),l("div",{key:t},[w(f,{"row-list-item":e},{playCount:s((({playCount:e})=>[o("div",F,[w(g,{name:"play",size:"18",class:"opacity-90 text-white"}),o("span",I,c(e),1)])])),_:2},1032,["row-list-item"])])))),128))])),[[x,V]])])):v("",!0)}}};export{R as default};
