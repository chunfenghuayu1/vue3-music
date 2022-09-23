import{X as e,f as a,m as s,L as t,M as l,c as i,a as n,t as r,v as o,b as c,s as u,u as m,w as d,Q as p,Y as v,S as f,o as y,F as x,e as g,B as b,_ as k}from"./index.e4314302.js";import{E as h}from"./el-infinite-scroll.bca50499.js";import{_ as j}from"./Modal.9b6ee74a.js";import{_ as w}from"./PlayListItem.57138bd6.js";import{b as _}from"./format.3c5dc5cf.js";const C={class:"flex space-x-12 mt-8 my-16"},L={class:"flex items-center justify-center flex-shrink-0 relative"},$=["src"],z=["src"],I={class:"flex flex-col justify-center"},P={class:"font-bold text-5xl mb-4"},U={class:""},V={class:"lineClamp1 font-bold"},q=n("span",null,"歌单列表",-1),M=n("span",null," • ",-1),T=["href"],A={class:"lineClamp1 text-skin-tertiary text-sm"},B=n("span",null," • ",-1),D=["textContent"],E={class:"mt-4 flex items-center space-x-8"},F={class:"py-1.5 px-2.5 rounded-lg flex items-center justify-center space-x-1 bg-skin-primary bg-opacity-20 flex-shrink-0"},N=n("span",{class:"font-bold text-skin-primary"},"播放",-1),Q={key:0,class:"p-2 rounded-lg flex items-center justify-center bg-gray-400 bg-opacity-10 flex-shrink-0"},S={class:"p-0.5 rounded-lg flex items-center justify-center bg-gray-400 bg-opacity-10 flex-shrink-0"},X={"infinite-scroll-immediate":!1,"infinite-scroll-distance":"100","infinite-scroll-delay":"600"},Y={class:"text-sm text-skin-tertiary flex items-center justify-center mt-8 select-none"},G={key:0},H={class:"overflow-auto text-sm whitespace-pre-wrap"},J={__name:"PlayList",setup(J){const{proxy:K}=b(),O=f(),R=e(),W=a(!1),Z=()=>{W.value=!0},ee=a({}),ae=a([]),se=({id:e,limit:a,offset:s})=>{s<1&&K.$http.reqPlayListDetail({id:e}).then((({data:e})=>{ee.value=e.playlist})),K.$http.reqPlayLsitTrankAll({id:e,limit:a,offset:s}).then((({data:e})=>{ae.value=[...ae.value,...e.songs],ie.value=0===e.songs.length}))},te=a(0),le=a(25),ie=a(!1);se({id:O.params.id,limit:le.value,offset:le.value*te.value});const ne=()=>{ie.value||(te.value++,se({id:O.params.id,limit:le.value,offset:le.value*te.value}))},re=s((()=>!R.userList.playlist.some((e=>e.id===Number(O.params.id)))));return(e,a)=>{var s,f;const b=k,J=w,K=j,O=h;return t((y(),i("div",null,[n("div",C,[n("div",L,[n("img",{src:`${ee.value.coverImgUrl}?param=512y512`,class:"rounded-lg h-72 w-72"},null,8,$),n("img",{src:`${ee.value.coverImgUrl}?param=512y512`,class:"h-72 w-72 absolute top-3 -z-10 bg-cover blur-md opacity-60 rounded-lg"},null,8,z)]),n("div",I,[n("h3",P,r(ee.value.name),1),n("div",U,[n("div",V,[q,M,n("a",{target:"_blank",href:`https://music.163.com/#/user/home?id=${null==(s=ee.value.creator)?void 0:s.userId}`,class:"hover:underline"},r(null==(f=ee.value.creator)?void 0:f.nickname),9,T)]),n("div",A,[n("span",null,"最后更新于"+r(o(_)(ee.value.updateTime)),1),B,n("span",null,r(ee.value.trackCount)+"首歌",1)])]),n("div",{class:"my-4 lineClamp3 text-skin-tertiary text-sm cursor-pointer whitespace-pre-wrap",onClick:Z,textContent:r(ee.value.description)},null,8,D),n("div",E,[n("button",F,[c(b,{name:"play",size:"24",class:"text-skin-primary"}),N]),o(re)?(y(),i("button",Q,[(y(),u(b,{key:0,name:"dislike",size:"20",class:"text-skin-primary"}))])):m("",!0),n("button",S,[c(b,{name:"more",size:"32",class:"text-skin-primary"})])])])]),t((y(),i("div",X,[c(p,{tag:"div",name:"track-item"},{default:d((()=>[(y(!0),i(x,null,g(ae.value,((e,a)=>(y(),i("div",{key:a,class:"space-y-6"},[c(J,{song:e},null,8,["song"])])))),128))])),_:1})])),[[O,ne]]),n("div",Y,[ie.value?(y(),i("div",G,"没有更多数据了......")):m("",!0)]),(y(),u(v,{to:"#main"},[c(K,{modelValue:W.value,"onUpdate:modelValue":a[0]||(a[0]=e=>W.value=e),type:"歌单介绍"},{content:d((()=>[n("div",H,r(ee.value.description),1)])),_:1},8,["modelValue"])]))],512)),[[l,ee.value.name]])}}};export{J as default};
