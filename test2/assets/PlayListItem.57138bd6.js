import{X as e,f as s,J as a,L as n,M as l,o as t,c as i,a as r,t as o,u as c,F as d,e as p,v as m,s as u,_ as f}from"./index.e4314302.js";import{a as v}from"./format.3c5dc5cf.js";const y={class:"flex items-center justify-center rounded-md overflow-hidden relative w-12 flex-shrink-0"},g={class:"w-12 h-12",loading:"lazy"},x={class:"flex flex-col justify-center flex-1"},k={class:"flex font-bold text-lg lineClamp1"},h={class:"cursor-pointer hover:underline lineClamp1"},j={key:0,class:"text-skin-tertiary lineClamp1"},C={class:"text-sm text-skin-tertiary lineClamp1"},b={key:0},w={class:"hover:underline cursor-pointer"},z={class:"flex items-center flex-1"},_={class:"hover:underline cursor-pointer lineClamp1"},I={class:"flex justify-end items-center w-8"},M={class:"cursor-pointer"},L={class:"flex items-center justify-center select-none"},S={__name:"PlayListItem",props:{song:{type:Object,default:()=>{}}},setup(S){const F=e(),J=s(!1);return(e,s)=>{var O;const P=f,U=a("lazy");return S.song.al?n((t(),i("div",{key:0,class:"flex space-x-6 items-center hover:bg-opacity-10 hover:bg-skin-tertiary transition-all rounded-lg p-2 my-2",onMouseenter:s[0]||(s[0]=e=>J.value=!0),onMouseleave:s[1]||(s[1]=e=>J.value=!1)},[r("div",y,[n(r("img",g,null,512),[[U,`${null==(O=S.song.al)?void 0:O.picUrl.replace(/^http:/,"https://")}?param=48y48`]])]),r("div",x,[r("div",k,[r("span",h,o(S.song.name),1),S.song.alia[0]?(t(),i("span",j," ("+o(S.song.alia[0])+") ",1)):c("",!0)]),r("div",C,[(t(!0),i(d,null,p(S.song.ar,((e,s)=>(t(),i("span",{key:s},[0!==s?(t(),i("span",b," / ")):c("",!0),r("span",w,o(e.name),1)])))),128))])]),r("div",z,[r("span",_,o(S.song.al.name),1)]),r("div",I,[n(r("div",M,[m(F).likeSongIds(S.song.id)?(t(),u(P,{key:0,name:"like",size:"20",class:"text-skin-primary"})):(t(),u(P,{key:1,name:"dislike",size:"20",class:"text-skin-primary"}))],512),[[l,m(F).likeSongIds(S.song.id)||J.value]])]),r("div",L,o(m(v)(S.song.dt)),1)],544)),[[l,S.song.name]]):c("",!0)}}};export{S as _};
